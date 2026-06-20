import { useEffect, useRef, useState } from 'react';

export default function AmbientMusic() {
  const audioRef = useRef(null);
  const buttonRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Initialize the audio instance once
  useEffect(() => {
    const audio = new Audio('/ambient.mp3');
    audio.loop = true;
    audio.volume = 0.12; // Subtle, non-intrusive volume level
    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Manage user interaction listeners to bypass autoplay restrictions
  useEffect(() => {
    if (hasInteracted) return;

    const handleInteraction = (e) => {
      // Don't auto-start if the user clicked the toggle button directly
      if (buttonRef.current && buttonRef.current.contains(e.target)) {
        return;
      }

      if (audioRef.current) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            setHasInteracted(true);
          })
          .catch((err) => {
            console.log('Autoplay prevented. Waiting for explicit user interaction:', err);
          });
      }
    };

    document.addEventListener('click', handleInteraction);
    document.addEventListener('touchstart', handleInteraction);
    document.addEventListener('keydown', handleInteraction);

    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
    };
  }, [hasInteracted]);

  const togglePlayback = () => {
    if (!audioRef.current) return;

    // Stop listening for automatic interactions since the user has interacted manually
    setHasInteracted(true);

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.error('Audio playback failed:', err);
        });
    }
  };

  return (
    <button
      ref={buttonRef}
      onClick={togglePlayback}
      className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-hairline bg-glass shadow-glass backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
      style={{ bottom: 'calc(1.5rem + env(safe-area-inset-bottom))' }}
      aria-label={isPlaying ? 'Mute background music' : 'Unmute background music'}
      title={isPlaying ? 'Mute Music' : 'Play Music'}
    >
      {isPlaying ? (
        // Soundwave animation
        <div className="flex items-end gap-[3px] h-3.5" aria-hidden="true">
          <div className="w-[3px] bg-sunset-gold rounded-full animate-soundwave-1" />
          <div className="w-[3px] bg-sunset-gold rounded-full animate-soundwave-2" />
          <div className="w-[3px] bg-sunset-gold rounded-full animate-soundwave-3" />
          <div className="w-[3px] bg-sunset-gold rounded-full animate-soundwave-4" />
        </div>
      ) : (
        // Muted speaker icon
        <svg
          className="h-5 w-5 text-cream/60 transition-colors group-hover:text-cream"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H9Z"
          />
        </svg>
      )}
    </button>
  );
}
