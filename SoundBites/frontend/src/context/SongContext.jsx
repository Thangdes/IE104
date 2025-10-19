import React, { createContext, useContext, useState, useRef, useEffect } from "react";

const SongContext = createContext();

export function SongProvider({ children }) {
    const [currentSong, setCurrentSong] = useState(null);
    const [queue, setQueue] = useState([]); // array of songs
    const [currentQueueIndex, setCurrentQueueIndex] = useState(-1); // index in queue

    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [repeatMode, setRepeatMode] = useState(0);

    // attach audio event listeners once
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const onTime = () => {
            setCurrentTime(audio.currentTime || 0);
            setDuration(audio.duration || 0);
            setProgress(((audio.currentTime / audio.duration) * 100) || 0);
        };

        const onLoaded = () => {
            setDuration(audio.duration || 0);
            // If isPlaying is true, play the audio (ensures switching songs works)
            if (isPlaying) {
                audio.play().catch(() => {});
            }
        };
        const onEnded = () => {
            if (repeatMode === 2) {
                // repeat one
                audio.currentTime = 0;
                audio.play().catch(() => {});
            } else if (queue.length > 0 && currentQueueIndex < queue.length - 1) {
                // play next in queue
                playNext();
            } else if (repeatMode === 1 && queue.length > 0) {
                // repeat all: loop to start
                setCurrentQueueIndex(0);
                setCurrentSong(queue[0]);
                setIsPlaying(true);
            } else {
                setIsPlaying(false);
            }
        };

        audio.addEventListener("timeupdate", onTime);
        audio.addEventListener("loadedmetadata", onLoaded);
        audio.addEventListener("ended", onEnded);

        return () => {
            audio.removeEventListener("timeupdate", onTime);
            audio.removeEventListener("loadedmetadata", onLoaded);
            audio.removeEventListener("ended", onEnded);
        };
        // eslint-disable-next-line
    }, [isPlaying, repeatMode, queue, currentQueueIndex]);

    // sync volume/mute
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.volume = volume;
        audio.muted = isMuted;
    }, [volume, isMuted]);

    // when currentSong changes, load it into audio element
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        if (currentSong?.file_url) {
            // Always pause before changing src
            audio.pause();
            audio.src = currentSong.file_url;
            audio.load();
            // Set isPlaying true, but actual play will be triggered in loadedmetadata
            setIsPlaying(true);
        } else {
            audio.pause();
            audio.src = "";
            setIsPlaying(false);
            setCurrentTime(0);
            setProgress(0);
        }
    }, [currentSong]);

    // when queue or currentQueueIndex changes, update currentSong
    useEffect(() => {
        if (queue.length > 0 && currentQueueIndex >= 0 && currentQueueIndex < queue.length) {
            setCurrentSong(queue[currentQueueIndex]);
        }
    }, [queue, currentQueueIndex]);

    // play/pause side effect
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        if (isPlaying) {
            audio.play().catch(() => { });
        } else {
            audio.pause();
        }
    }, [isPlaying]);

    const togglePlayPause = () => {
        if (!currentSong?.file_url) return;
        setIsPlaying((p) => !p);
    };

    const seekTo = (seconds) => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.currentTime = seconds;
    };

    // Set a new queue and start playing from index (default 0)
    const playQueue = (songs, startIndex = 0) => {
        setQueue(songs);
        setCurrentQueueIndex(startIndex);
        if (songs && songs.length > 0 && startIndex >= 0 && startIndex < songs.length) {
            setCurrentSong(songs[startIndex]);
        }
        setIsPlaying(true);
    };

    // Play next song in queue
    const playNext = () => {
        if (queue.length === 0) return;
        let nextIdx = currentQueueIndex + 1;
        if (nextIdx >= queue.length) {
            nextIdx = 0; // loop to start
        }
        setCurrentQueueIndex(nextIdx);
        setIsPlaying(true);
    };

    // Play previous song in queue
    const playPrev = () => {
        if (queue.length === 0) return;
        let prevIdx = currentQueueIndex - 1;
        if (prevIdx < 0) {
            prevIdx = queue.length - 1; // loop to end
        }
        setCurrentQueueIndex(prevIdx);
        setIsPlaying(true);
    };

    const value = {
        currentSong,
        setCurrentSong,
        audioRef,
        isPlaying,
        setIsPlaying,
        togglePlayPause,
        currentTime,
        duration,
        progress,
        seekTo,
        volume,
        setVolume,
        isMuted,
        setIsMuted,
        repeatMode,
        setRepeatMode,
        // queue features
        queue,
        currentQueueIndex,
        playQueue,
        playNext,
        playPrev,
        setQueue,
        setCurrentQueueIndex,
    };

    return (
        <SongContext.Provider value={value}>
            {children}
            {/* hidden audio element used by app */}
            <audio ref={audioRef} style={{ display: "none" }} />
        </SongContext.Provider>
    );
}

export function useSong() {
    return useContext(SongContext);
}
