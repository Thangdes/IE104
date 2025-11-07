import React, { useEffect, useRef, useState } from "react";
import { useSong } from "../context/SongContext";

// Parse timestamp từ format [mm:ss.xx] hoặc [mm:ss]
function parseTimestamp(timestamp) {
    const match = timestamp.match(/\[(\d{2}):(\d{2})(?:\.(\d{2}))?\]/);
    if (!match) return null;
    const minutes = parseInt(match[1], 10);
    const seconds = parseInt(match[2], 10);
    const milliseconds = match[3] ? parseInt(match[3], 10) : 0;
    return minutes * 60 + seconds + milliseconds / 100;
}

// Parse word với timestamp: [00:01.23]word hoặc word[00:01.23]
function parseWordWithTimestamp(wordText) {
    // Format 1: [00:01.23]word
    const match1 = wordText.match(/^(\[\d{2}:\d{2}(?:\.\d{2})?\])(.+)$/);
    if (match1) {
        return {
            time: parseTimestamp(match1[1]),
            text: match1[2],
            hasTimestamp: true
        };
    }
    
    // Format 2: word[00:01.23]
    const match2 = wordText.match(/^(.+)(\[\d{2}:\d{2}(?:\.\d{2})?\])$/);
    if (match2) {
        return {
            time: parseTimestamp(match2[2]),
            text: match2[1],
            hasTimestamp: true
        };
    }
    
    // Không có timestamp
    return {
        time: null,
        text: wordText,
        hasTimestamp: false
    };
}

// Parse lyrics thành array với timestamp cho từng từ
function parseLyrics(lyricsText) {
    if (!lyricsText) return [];
    
    const lines = lyricsText.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    const parsed = [];
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const words = line.split(/\s+/); // Tách theo khoảng trắng
        const lineWords = [];
        let lineTime = null;
        let hasAnyTimestamp = false;
        
        for (const word of words) {
            const parsedWord = parseWordWithTimestamp(word);
            lineWords.push(parsedWord);
            if (parsedWord.hasTimestamp) {
                hasAnyTimestamp = true;
                // Lấy timestamp đầu tiên của dòng làm timestamp của dòng
                if (lineTime === null) {
                    lineTime = parsedWord.time;
                }
            }
        }
        
        parsed.push({
            time: lineTime,
            words: lineWords,
            hasTimestamp: hasAnyTimestamp,
            originalText: line
        });
    }
    
    return parsed;
}

export default function Lyric() {
    const { currentSong, currentTime, duration, isPlaying, toggleLyricOverlay } = useSong();
    const lyricContainerRef = useRef(null);
    const [parsedLyrics, setParsedLyrics] = useState([]);
    const [activeLineIndex, setActiveLineIndex] = useState(-1);
    const [activeWordIndex, setActiveWordIndex] = useState({ lineIndex: -1, wordIndex: -1 });
    const [hasSynchronizedLyrics, setHasSynchronizedLyrics] = useState(false);

    // Parse lyrics khi currentSong thay đổi
    useEffect(() => {
        if (!currentSong?.lyrics) {
            setParsedLyrics([]);
            setActiveLineIndex(-1);
            setActiveWordIndex({ lineIndex: -1, wordIndex: -1 });
            setHasSynchronizedLyrics(false);
            return;
        }

        const parsed = parseLyrics(currentSong.lyrics);
        setParsedLyrics(parsed);
        
        // Kiểm tra xem có synchronized lyrics không
        const hasSync = parsed.some(line => line.hasTimestamp);
        setHasSynchronizedLyrics(hasSync);
        setActiveLineIndex(-1);
        setActiveWordIndex({ lineIndex: -1, wordIndex: -1 });
    }, [currentSong]);

    // Tự động cập nhật active line và word dựa trên currentTime
    useEffect(() => {
        if (parsedLyrics.length === 0) return;
        
        // Chỉ highlight khi bài hát đang phát
        if (!isPlaying) {
            // Nếu đang pause, giữ nguyên highlight hiện tại, không thay đổi
            return;
        }
        
        // Reset highlight nếu chưa bắt đầu phát
        if (currentTime <= 0) {
            if (activeLineIndex !== -1) {
                setActiveLineIndex(-1);
                setActiveWordIndex({ lineIndex: -1, wordIndex: -1 });
            }
            return;
        }

        let newActiveLineIndex = -1;
        let newActiveWordIndex = -1;

        if (hasSynchronizedLyrics) {
            // Có synchronized lyrics - chỉ highlight khi currentTime >= timestamp của dòng
            let bestLineIndex = -1;
            let bestLineTime = -1;
            
            for (let i = 0; i < parsedLyrics.length; i++) {
                if (parsedLyrics[i].hasTimestamp && parsedLyrics[i].time !== null) {
                    const lineTime = parsedLyrics[i].time;
                    // CHỈ highlight khi currentTime >= timestamp (ca sĩ đã hát đến đó)
                    // Không cho phép highlight sớm
                    if (currentTime >= lineTime) {
                        // Tìm dòng có timestamp <= currentTime và gần nhất (ca sĩ đang hát hoặc đã hát qua)
                        if (lineTime <= currentTime + 0.8) {
                            if (lineTime > bestLineTime) {
                                bestLineTime = lineTime;
                                bestLineIndex = i;
                            }
                        }
                    }
                }
            }
            
            newActiveLineIndex = bestLineIndex;
            
            // Nếu tìm thấy dòng active, tìm từ active trong dòng đó
            if (newActiveLineIndex >= 0) {
                const activeLine = parsedLyrics[newActiveLineIndex];
                let bestWordIndex = -1;
                let bestWordTime = -1;
                
                // Tìm từ có timestamp <= currentTime và gần nhất
                for (let j = 0; j < activeLine.words.length; j++) {
                    const word = activeLine.words[j];
                    if (word.hasTimestamp && word.time !== null) {
                        const wordTime = word.time;
                        // CHỈ highlight khi currentTime >= timestamp của từ
                        if (currentTime >= wordTime && wordTime <= currentTime + 0.5) {
                            if (wordTime > bestWordTime) {
                                bestWordTime = wordTime;
                                bestWordIndex = j;
                            }
                        }
                    }
                }
                
                // Nếu tìm thấy từ, dùng từ đó; nếu không, không highlight từ nào
                newActiveWordIndex = bestWordIndex;
            } else {
                // Nếu không tìm thấy dòng nào phù hợp, không highlight
                newActiveLineIndex = -1;
                newActiveWordIndex = -1;
            }
        } else {
            // Không có synchronized lyrics - KHÔNG highlight tự động
            // Vì không thể biết chính xác khi nào ca sĩ hát
            newActiveLineIndex = -1;
            newActiveWordIndex = -1;
        }
        
        if (newActiveLineIndex !== activeLineIndex) {
            setActiveLineIndex(newActiveLineIndex);
        }
        if (newActiveWordIndex !== activeWordIndex.wordIndex || newActiveLineIndex !== activeWordIndex.lineIndex) {
            setActiveWordIndex({ lineIndex: newActiveLineIndex, wordIndex: newActiveWordIndex });
        }
    }, [currentTime, duration, parsedLyrics, hasSynchronizedLyrics, isPlaying, activeLineIndex, activeWordIndex]);

    // Auto scroll đến dòng đang active
    useEffect(() => {
        if (activeLineIndex >= 0 && lyricContainerRef.current) {
            const activeElement = lyricContainerRef.current.children[activeLineIndex];
            if (activeElement) {
                activeElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        }
    }, [activeLineIndex]);

    if (!currentSong?.lyrics) {
        return (
            <div className="flex items-center justify-center h-full min-h-[400px]">
                <div className="text-center text-gray-400">
                    <i className="fa-solid fa-music text-4xl mb-4 opacity-50"></i>
                    <p className="text-lg">Chưa có lời bài hát</p>
                    <p className="text-sm mt-2">Lyrics not available</p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-full h-full flex flex-col">
            {/* Close button */}
            <button
                onClick={toggleLyricOverlay}
                className="absolute top-6 right-6 z-10 text-white hover:text-gray-300 text-2xl bg-black/30 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center"
                title="Đóng"
            >
                <i className="fa-solid fa-times"></i>
            </button>

            {/* Lyric content */}
            <div 
                ref={lyricContainerRef}
                className="lyric-container flex-1 overflow-y-auto px-12 py-20 space-y-8"
                style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#4a4a4a transparent'
                }}
            >
                {parsedLyrics.map((line, lineIndex) => {
                    const isLineActive = lineIndex === activeLineIndex;
                    const isLinePast = hasSynchronizedLyrics 
                        ? (lineIndex < activeLineIndex && parsedLyrics[lineIndex].hasTimestamp)
                        : lineIndex < activeLineIndex;
                    
                    return (
                        <div
                            key={lineIndex}
                            className={`lyric-line text-center transition-all duration-300 text-white`}
                            style={{
                                minHeight: '3rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexWrap: 'wrap',
                                gap: '0.5rem',
                                fontSize: isLineActive ? '2rem' : '1.5rem',
                                lineHeight: '1.8',
                                fontWeight: isLineActive ? '700' : isLinePast ? '600' : '500',
                                color: '#ffffff',
                                textShadow: isLineActive 
                                    ? '2px 2px 8px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.7)'
                                    : '1px 1px 4px rgba(0,0,0,0.8), 0 0 10px rgba(0,0,0,0.6)',
                                opacity: '1'
                            }}
                        >
                            {/* Icon sao bên trái dòng đang active */}
                            {isLineActive && (
                                <i className="fa-solid fa-star text-white text-2xl font-bold drop-shadow-lg"></i>
                            )}
                            
                            {line.words.map((word, wordIndex) => {
                                const isWordActive = isLineActive && 
                                    activeWordIndex.lineIndex === lineIndex && 
                                    activeWordIndex.wordIndex === wordIndex;
                                const isWordPast = isLineActive && 
                                    activeWordIndex.lineIndex === lineIndex && 
                                    wordIndex < activeWordIndex.wordIndex;
                                
                                return (
                                    <span
                                        key={wordIndex}
                                        className={`transition-all duration-200 text-white ${
                                            isWordActive
                                                ? 'font-bold scale-115'
                                                : ''
                                        }`}
                                        style={{
                                            display: 'inline-block',
                                            padding: '0 0.25rem',
                                            fontSize: isWordActive ? '2.25rem' : 'inherit',
                                            fontWeight: isWordActive ? '800' : isWordPast ? '600' : '500',
                                            color: '#ffffff',
                                            textShadow: isWordActive 
                                                ? '3px 3px 10px rgba(0,0,0,0.95), 0 0 25px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.6)'
                                                : '1px 1px 5px rgba(0,0,0,0.8), 0 0 12px rgba(0,0,0,0.6)',
                                            opacity: '1'
                                        }}
                                    >
                                        {word.text || '\u00A0'}
                                    </span>
                                );
                            })}
                            
                            {/* Icon sao bên phải dòng đang active */}
                            {isLineActive && (
                                <i className="fa-solid fa-star text-white text-2xl font-bold drop-shadow-lg"></i>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
