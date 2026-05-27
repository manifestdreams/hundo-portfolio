import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useProgress } from '@react-three/drei';
import Experience, { PROJECTS } from './components/Experience';

// Custom Loading Screen
function CustomLoader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let t = 0;
  
    const interval = setInterval(() => {
      t += 2;
      setProgress(t);
  
      if (t >= 100) {
        clearInterval(interval);
      }
    }, 30);
  
    return () => clearInterval(interval);
  }, []);
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => setShow(false), 800);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  if (!show) return null;

  return (
    <div className="loading-screen" style={{ opacity: progress === 100 ? 0 : 1, transition: 'opacity 0.6s ease' }}>
      <div className="loading-logo">
        HUNDO<span>:</span>SYS
      </div>
      <div className="loading-bar-container">
        <div className="loading-bar" style={{ width: `${progress}%`, animation: 'none' }}></div>
      </div>
      <div className="loading-text">
        SYSTEM LOADING {Math.round(progress)}%
      </div>
    </div>
  );
}

// Simulated Camcorder Timer
function HUDTimeTracker() {
  const [time, setTime] = useState('00:00:00');

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const diff = Date.now() - start;
      const hours = String(Math.floor(diff / 3600000)).padStart(2, '0');
      const minutes = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
      const seconds = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
      setTime(`${hours}:${minutes}:${seconds}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <span>{time}</span>;
}

// Project Details Modal & Simulated Audio Player
function ProjectModal({ project, onClose }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(35); // mock start progress

  // Simulate audio progress increment when playing
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Handle clicking on progress bar
  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    setProgress(Math.round((clickX / width) * 100));
  };

  return (
    <div className="project-modal-backdrop" onClick={onClose}>
      <div className="project-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>[ ESC // CLOSE ]</button>
        
        <div className="modal-header">
          <span className="section-label">[ DRV_PACKAGE // {project.id.toUpperCase()} ]</span>
          <h2 className="modal-title">{project.title}</h2>
          <div className="modal-meta-row">
            <span>FORMAT: {project.category}</span>
            <span>|</span>
            <span>YEAR: {project.year}</span>
            <span>|</span>
            <span>LENGTH: {project.length}</span>
          </div>
          <p className="brutalist-para" style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
            {project.description}
          </p>
        </div>

        {/* Audio Player Mockup */}
        <div className="audio-player-mockup">
          <div className="player-controls">
            <button className="play-pause-btn" onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? (
                // Pause Icon
                <svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
              ) : (
                // Play Icon
                <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              )}
            </button>
            <div className="player-track-info">
              <span className="player-track-name">{project.tracklist[0]}</span>
              <span className="player-track-artist">HUNDO // PRIMARY SOUND SOURCE</span>
            </div>
          </div>

          {/* Waveform graphic */}
          <div className="waveform-canvas-mock">
            {Array.from({ length: 24 }).map((_, idx) => {
              // Generate mock heights
              const baseHeight = Math.sin(idx * 0.3) * 12 + 15;
              const bounceHeight = isPlaying ? `calc(${baseHeight}px * (0.3 + ${Math.random() * 0.8}))` : `${baseHeight * 0.3}px`;
              const animDuration = isPlaying ? `${0.4 + Math.random() * 0.4}s` : 'none';
              
              return (
                <div
                  key={idx}
                  className={`waveform-bar ${isPlaying ? 'active' : ''}`}
                  style={{
                    height: bounceHeight,
                    animation: isPlaying ? 'bounce-bar 0.4s ease-in-out infinite alternate' : 'none',
                    animationDelay: isPlaying ? `${idx * 0.03}s` : 'none',
                    transition: 'height 0.2s ease'
                  }}
                ></div>
              );
            })}
          </div>

          {/* Progress Slider */}
          <div className="player-progress-bar" onClick={handleProgressClick}>
            <div className="player-progress-fill" style={{ width: `${progress}%` }}></div>
          </div>

          <div className="player-time-row">
            <span>{String(Math.floor((progress / 100) * 5)).padStart(2, '0')}:{String(Math.floor(((progress / 100) * 300) % 60)).padStart(2, '0')}</span>
            <span>{project.length}</span>
          </div>
        </div>

        {/* System Details / Tracklist */}
        <span className="section-label" style={{ fontSize: '10px', marginTop: '20px', display: 'block' }}>[ DRIVE_CONTENTS ]</span>
        <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {project.tracklist.map((track, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '6px' }}>
              <span style={{ color: 'var(--accent-cyan)' }}>TRK_{String(i+1).padStart(2, '0')}</span>
              <span style={{ color: '#fff', fontWeight: 700 }}>{track}</span>
              <span style={{ color: 'var(--text-muted)' }}>0{Math.floor(Math.random() * 4) + 2}:{Math.floor(Math.random() * 45) + 10}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Waveform Keyframe styles injection */}
      <style>{`
        @keyframes bounce-bar {
          0% { transform: scaleY(0.2); }
          100% { transform: scaleY(1.3); }
        }
      `}</style>
    </div>
  );
}

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);

  // Helper to open project details when string ID or project object is passed
  const handleSelectProject = (projInput) => {
    if (typeof projInput === 'string') {
      const found = PROJECTS.find((p) => p.id === projInput);
      if (found) setSelectedProject(found);
    } else if (projInput && projInput.id) {
      setSelectedProject(projInput);
    }
  };

  return (
    <>
      {/* 1. Loader screen */}
      <CustomLoader />

      {/* 2. Three.js canvas layer */}
      <div className="webgl-canvas">
        <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
          <Experience onSelectProject={handleSelectProject} />
        </Canvas>
      </div>

      {/* 3. Static VHS Camcorder HUD Layer */}
      <div className="hud-overlay">
        
        {/* HUD Top bar */}
        <div className="hud-top">
          <div className="hud-rec-container">
            <div className="hud-dot"></div>
            <span>REC</span>
          </div>
          <div className="hud-battery">
            <span>85%</span>
            <div className="hud-battery-icon">
              <div className="hud-battery-fill"></div>
            </div>
          </div>
        </div>

        {/* HUD Bottom bar */}
        <div className="hud-bottom">
          <div className="hud-left-bottom">
            <div className="hud-logo-mini">
              {/* Abstract minimalist line art kitten mascot */}
              <svg viewBox="0 0 24 24" className="hud-logo-kitten-mascot" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21.5c-1.35 0-2.5-.42-3.46-1.25L3 15.5l1.5-10.5 4.5 4.5h6l4.5-4.5 1.5 10.5-5.54 4.75c-.96.83-2.11 1.25-3.46 1.25z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="9" cy="14" r="0.75" fill="currentColor"/>
                <circle cx="15" cy="14" r="0.75" fill="currentColor"/>
                <path d="M12 16.5l-0.75-0.75h1.5l-0.75 0.75z" fill="currentColor"/>
              </svg>
              <span>HUNDO</span>
            </div>
            <span>TAPE_PLAY_02:26</span>
          </div>
          <div className="hud-right-bottom">
            <span>SP: SLOW_SPEED</span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span>TC:</span>
              <HUDTimeTracker />
            </div>
          </div>
        </div>

      </div>

      {/* 4. VHS CRT Screen Filter Overlay Layer */}
      <div className="vhs-overlay-container">
        <div className="scanlines"></div>
        <div className="vhs-grain"></div>
        <div className="crt-vignette"></div>
        <div className="vhs-glitch-line"></div>
      </div>

      {/* 5. Detail Modal */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </>
  );
}
