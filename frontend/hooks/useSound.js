import { useCallback, useEffect, useState } from 'react';

/**
 * Custom hook to play short audio effects.
 * @param {string} url - Path to the audio file (e.g., '/sounds/pop.mp3')
 * @returns {Function} play function
 */
export default function useSound(url) {
    const [audio, setAudio] = useState(null);

    useEffect(() => {
        // Only load audio on cliient side
        const sound = new Audio(url);
        sound.load();
        setAudio(sound);
    }, [url]);

    const play = useCallback(() => {
        if (audio) {
            audio.currentTime = 0; // Reset to start
            audio.play().catch(err => {
                // Ignore auto-play errors (users might not have interacted yet)
                console.warn("Audio play failed (user interaction needed likely):", err);
            });
        }
    }, [audio]);

    return play;
}
