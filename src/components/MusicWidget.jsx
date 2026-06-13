import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Play, Pause, Music } from "lucide-react";
import backgroundMusic from "../assets/audio/backgroundsong.mpeg";

export default function MusicWidget({ playRequested, onMusicStateChange }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [useSynth, setUseSynth] = useState(false);
  
  const audioRef = useRef(null);
  const audioContextRef = useRef(null);
  const synthIntervalRef = useRef(null);

  // Soft Indian Classical Mohanam Raga scale (Pentatonic: C, D, E, G, A)
  // Frequencies in Hz for a soft flute-like ambient synth
  const mohanamScale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99, 880.00];

  useEffect(() => {
    // Load local soft wedding instrumental
    const audio = new Audio(backgroundMusic);
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    // Detect if external audio loading fails, fallback to synth
    const handleError = () => {
      console.warn("External audio track failed to load. Falling back to ambient Web Audio synth.");
      setUseSynth(true);
    };

    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("error", handleError);
      audio.pause();
      stopSynth();
    };
  }, []);

  // Update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Handle play request from Welcome screen
  useEffect(() => {
    if (playRequested) {
      startPlayback();
    }
  }, [playRequested]);

  const startPlayback = () => {
    setIsPlaying(true);
    if (onMusicStateChange) onMusicStateChange(true);
    
    if (useSynth) {
      startSynth();
    } else {
      audioRef.current.play().catch((err) => {
        console.warn("Audio autoplay blocked or failed, using synth fallback:", err);
        setUseSynth(true);
        startSynth();
      });
    }
  };

  const stopPlayback = () => {
    setIsPlaying(false);
    if (onMusicStateChange) onMusicStateChange(false);
    
    if (useSynth) {
      stopSynth();
    } else {
      audioRef.current.pause();
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopPlayback();
    } else {
      startPlayback();
    }
  };

  // Web Audio Ambient Synthesizer
  const startSynth = () => {
    stopSynth(); // Clear any existing

    // Initialize AudioContext
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    
    const ctx = new AudioContextClass();
    audioContextRef.current = ctx;

    // Create a master volume control
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(volume * 0.15, ctx.currentTime); // keep it soft and ambient
    masterGain.connect(ctx.destination);

    // Create a simple delay node for premium ambient reverb
    const delay = ctx.createDelay(1.0);
    delay.delayTime.value = 0.6;
    const delayGain = ctx.createGain();
    delayGain.gain.value = 0.4;

    masterGain.connect(delay);
    delay.connect(delayGain);
    delayGain.connect(masterGain);

    // Play a note function
    const playNote = () => {
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // Pick a random note from the Mohanam scale
      const noteFreq = mohanamScale[Math.floor(Math.random() * mohanamScale.length)];
      
      const osc = ctx.createOscillator();
      const noteGain = ctx.createGain();

      // Soft flute-like triangle wave
      osc.type = "triangle";
      osc.frequency.setValueAtTime(noteFreq, ctx.currentTime);

      // Soft envelope (slow attack, long decay)
      const now = ctx.currentTime;
      noteGain.gain.setValueAtTime(0, now);
      noteGain.gain.linearRampToValueAtTime(0.6, now + 0.5); // Slow rise (flute breath)
      noteGain.gain.exponentialRampToValueAtTime(0.001, now + 3.0); // Soft decay

      // Lowpass filter to make it warmer
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(800, now);

      osc.connect(filter);
      filter.connect(noteGain);
      noteGain.connect(masterGain);

      osc.start(now);
      osc.stop(now + 3.5);
    };

    // Schedule note intervals
    playNote();
    synthIntervalRef.current = setInterval(() => {
      if (Math.random() > 0.3) { // add random rhythm
        playNote();
      }
    }, 1500);
  };

  const stopSynth = () => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
  };

  // Dynamic volume slider change
  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (audioContextRef.current && useSynth) {
      // Adjust ambient volume dynamically
      // Synth nodes are created per note, but we could hook up a master gain node.
      // Since it's dynamic, we just let next notes use new volume.
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full glass-panel px-4 py-2.5 shadow-lg border border-brand-gold/30 hover:border-brand-gold transition-all duration-300 group">
      {/* Animated Visualizer Bars */}
      {isPlaying && (
        <svg className="w-5 h-5 text-brand-maroon" viewBox="0 0 24 24" fill="currentColor">
          <rect className="visualizer-bar" x="2" y="2" width="3" height="20" rx="1.5" />
          <rect className="visualizer-bar" x="7" y="2" width="3" height="20" rx="1.5" />
          <rect className="visualizer-bar" x="12" y="2" width="3" height="20" rx="1.5" />
          <rect className="visualizer-bar" x="17" y="2" width="3" height="20" rx="1.5" />
          <rect className="visualizer-bar" x="22" y="2" width="3" height="20" rx="1.5" />
        </svg>
      )}

      {/* Control Button */}
      <button
        onClick={togglePlay}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-brand-maroon hover:bg-brand-maroon-dark text-brand-gold transition-colors duration-300 shadow-md cursor-pointer"
        aria-label={isPlaying ? "Mute Background Music" : "Play Background Music"}
      >
        {isPlaying ? (
          <Pause className="w-5 h-5" />
        ) : (
          <Play className="w-5 h-5 fill-current ml-0.5" />
        )}
      </button>

      {/* Volume slider (fades in on hover) */}
      <div className="flex items-center gap-2 w-0 overflow-hidden group-hover:w-24 transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100">
        <button 
          onClick={() => setVolume(volume === 0 ? 0.5 : 0)} 
          className="text-brand-maroon hover:text-brand-maroon-dark cursor-pointer"
        >
          {volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={handleVolumeChange}
          className="w-16 h-1 bg-brand-champagne rounded-lg appearance-none cursor-pointer accent-brand-maroon"
        />
      </div>

      <span className="text-xs font-serif text-brand-maroon font-semibold select-none hidden md:inline">
        {isPlaying ? "Instrumental Playing" : "Music Muted"}
      </span>
    </div>
  );
}
