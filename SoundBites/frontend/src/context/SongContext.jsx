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
    const [isShuffle, setIsShuffle] = useState(false);
    const [originalQueue, setOriginalQueue] = useState([]); // Lưu queue gốc khi shuffle

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
            } else if (queue.length > 0) {
                if (isShuffle) {
                    // Shuffle mode: chọn bài ngẫu nhiên
                    const randomIndex = Math.floor(Math.random() * queue.length);
                    setCurrentQueueIndex(randomIndex);
                    setIsPlaying(true);
                } else if (currentQueueIndex < queue.length - 1) {
                    // Normal mode: play next in queue
                    const nextIdx = currentQueueIndex + 1;
                    setCurrentQueueIndex(nextIdx);
                    setIsPlaying(true);
                } else if (repeatMode === 1) {
                    // repeat all: loop to start
                    setCurrentQueueIndex(0);
                    setCurrentSong(queue[0]);
                    setIsPlaying(true);
                } else {
                    setIsPlaying(false);
                }
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
    }, [isPlaying, repeatMode, queue, currentQueueIndex, isShuffle]);

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

    // Shuffle array function (Fisher-Yates algorithm)
    const shuffleArray = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    // Set a new queue and start playing from index (default 0)
    const playQueue = (songs, startIndex = 0, shuffle = false) => {
        if (!songs || songs.length === 0) return;
        
        // Lưu queue gốc
        setOriginalQueue(songs);
        
        let finalQueue = songs;
        let finalIndex = startIndex;
        
        // Nếu shuffle được bật hoặc được yêu cầu
        if (shuffle || isShuffle) {
            finalQueue = shuffleArray(songs);
            // Tìm vị trí của bài hát được chọn trong queue đã shuffle
            const selectedSong = songs[startIndex];
            finalIndex = finalQueue.findIndex(s => s.song_id === selectedSong.song_id);
            if (finalIndex === -1) finalIndex = 0;
        }
        
        setQueue(finalQueue);
        setCurrentQueueIndex(finalIndex);
        if (finalIndex >= 0 && finalIndex < finalQueue.length) {
            setCurrentSong(finalQueue[finalIndex]);
        }
        setIsPlaying(true);
    };

    // Play next song in queue
    const playNext = () => {
        if (queue.length === 0) return;
        
        if (isShuffle) {
            // Nếu shuffle mode, chọn bài ngẫu nhiên từ queue
            const randomIndex = Math.floor(Math.random() * queue.length);
            setCurrentQueueIndex(randomIndex);
        } else {
            // Normal mode: play next
            let nextIdx = currentQueueIndex + 1;
            if (nextIdx >= queue.length) {
                nextIdx = 0; // loop to start
            }
            setCurrentQueueIndex(nextIdx);
        }
        setIsPlaying(true);
    };

    // Play previous song in queue
    const playPrev = () => {
        if (queue.length === 0) return;
        
        if (isShuffle) {
            // Nếu shuffle mode, chọn bài ngẫu nhiên từ queue
            const randomIndex = Math.floor(Math.random() * queue.length);
            setCurrentQueueIndex(randomIndex);
        } else {
            // Normal mode: play previous
            let prevIdx = currentQueueIndex - 1;
            if (prevIdx < 0) {
                prevIdx = queue.length - 1; // loop to end
            }
            setCurrentQueueIndex(prevIdx);
        }
        setIsPlaying(true);
    };

    // Toggle shuffle mode
    const toggleShuffle = () => {
        const newShuffleState = !isShuffle;
        setIsShuffle(newShuffleState);
        
        // Nếu đang bật shuffle và có queue, shuffle lại queue
        if (newShuffleState && queue.length > 0) {
            const shuffled = shuffleArray(originalQueue.length > 0 ? originalQueue : queue);
            const currentSongId = currentSong?.song_id;
            const newIndex = shuffled.findIndex(s => s.song_id === currentSongId);
            if (newIndex >= 0) {
                setQueue(shuffled);
                setCurrentQueueIndex(newIndex);
            } else {
                setQueue(shuffled);
                setCurrentQueueIndex(0);
            }
        } else if (!newShuffleState && originalQueue.length > 0) {
            // Nếu tắt shuffle, khôi phục queue gốc
            const currentSongId = currentSong?.song_id;
            const newIndex = originalQueue.findIndex(s => s.song_id === currentSongId);
            if (newIndex >= 0) {
                setQueue(originalQueue);
                setCurrentQueueIndex(newIndex);
            } else {
                setQueue(originalQueue);
                setCurrentQueueIndex(0);
            }
        }
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
        // shuffle features
        isShuffle,
        toggleShuffle,
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
