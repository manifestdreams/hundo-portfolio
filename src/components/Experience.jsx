import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { ScrollControls, Scroll, useScroll } from '@react-three/drei';
import { EffectComposer, Bloom, Noise } from '@react-three/postprocessing';
import * as THREE from 'three';

import LandingScene from './scenes/LandingScene';
import AboutScene from './scenes/AboutScene';
import MusicScene, { PROJECTS } from './scenes/MusicScene';
import InstallationScene from './scenes/InstallationScene';
import ContactScene from './scenes/ContactScene';

// Camera controller that tracks the scroll progress
function ScrollCameraManager() {
  const scroll = useScroll();
  const { camera } = useThree();
  const lastTargetLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state) => {
    const offset = scroll.offset; // 0.0 to 1.0 lerped scroll offset

    // Base Y is computed by sliding camera down 32 units total across 5 viewports
    const targetY = -offset * 32;

    // Define Z position to slightly push back and pull in dynamically
    // Creates a breathing camera dolly-zoom depth effect during transitions
    const targetZ = 5.8 + Math.sin(offset * Math.PI) * 1.2;

    // Mouse parallax offsets
    const mouseX = state.pointer.x * 0.6;
    const mouseY = state.pointer.y * 0.4;

    // Lerp camera position for cinematic smoothness
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouseX, 0.08);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY + mouseY, 0.08);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.08);

    // Calculate camera target vector
    const lookAtTarget = new THREE.Vector3(0, targetY, 0);
    // Add small mouse lag factor to lookAt for organic feel
    lookAtTarget.x += mouseX * 0.3;
    lookAtTarget.y += mouseY * 0.3;

    lastTargetLookAt.current.lerp(lookAtTarget, 0.08);
    camera.lookAt(lastTargetLookAt.current);
  });

  return null;
}

export default function Experience({ onSelectProject }) {
  return (
    <>
      {/* 3D Global Environment Config */}
      <color attach="background" args={['#050508']} />
      
      {/* Gritty late night studio fog */}
      <fogExp2 attach="fog" color="#050508" density={0.045} />

      {/* Scroll controls wrapping the interactive universe */}
      {/* 5 pages total corresponding to our 5 scenes */}
      <ScrollControls pages={5} damping={0.25} distance={1.2}>
        
        {/* Camera manager tracks scroll offset within this context */}
        <ScrollCameraManager />

        {/* 3D Objects Layer */}
        <Scroll>
          <LandingScene />
          <AboutScene />
          <MusicScene onSelectProject={onSelectProject} />
          <InstallationScene />
          <ContactScene />
        </Scroll>

        {/* HTML Content Overlay Layer synced with scroll */}
        <Scroll html style={{ width: '100%' }}>
          <div className="scroll-container">
            
            {/* 1. LANDING */}
            <section className="scroll-section landing-section">
              <div className="landing-scroll-hint">
                <span>SCROLL DOWN</span>
              </div>
            </section>

            {/* 2. ABOUT */}
            <section className="scroll-section about-section">
              <div className="brutalist-card">
                <div className="brutalist-corner-accent"></div>
                <span className="section-label">[ SYS_INFO // BRAND_STATEMENT ]</span>
                <h1 className="brutalist-title">THE <span>FREQ</span> OF THE DARK</h1>
                <p className="brutalist-para">
                  Hundo operates in the shadows between raw hardware distortion and pristine digital atmosphere. We build audio monoliths that decay over time, designed for immersive night environments and modular underground sessions.
                </p>
                <p className="brutalist-para brutalist-para-highlight">
                  "No presets. No compromises. Only late-night voltage."
                </p>
              </div>
            </section>

            {/* 3. MUSIC */}
            <section className="scroll-section music-section">
              <div className="music-content-box">
                <div className="music-card">
                  <div className="brutalist-corner-accent"></div>
                  <span className="section-label">[ SYS_RELEASES // MUSIC_LOG ]</span>
                  <h1 className="brutalist-title">RECENT <span>DRIVES</span></h1>
                  <p className="brutalist-para" style={{ marginBottom: '20px' }}>
                    Select an interactive object in space (Cassette, Monolith, Speaker) to stream or inspect the archival data packages.
                  </p>
                  
                  <div className="track-list">
                    <div className="track-item" onClick={() => onSelectProject('cassette')}>
                      <div className="track-item-left">
                        <span className="track-num">01.</span>
                        <span className="track-title">DECADE FREQS (BEAT TAPE)</span>
                        <span className="track-tag">Type I</span>
                      </div>
                      <span className="track-arrow">→</span>
                    </div>

                    <div className="track-item" onClick={() => onSelectProject('slab')}>
                      <div className="track-item-left">
                        <span className="track-num">02.</span>
                        <span className="track-title">CHROME MONOLITH (EP)</span>
                        <span className="track-tag">FLAC</span>
                      </div>
                      <span className="track-arrow">→</span>
                    </div>

                    <div className="track-item" onClick={() => onSelectProject('speaker')}>
                      <div className="track-item-left">
                        <span className="track-num">03.</span>
                        <span className="track-title">VOID BOUNCE (SINGLE)</span>
                        <span className="track-tag">WAV</span>
                      </div>
                      <span className="track-arrow">→</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 4. CREATIVE INSTALLATION */}
            <section className="scroll-section installation-section">
              <div className="installation-content">
                <span className="section-label">[ GRAPHICS // AUDIO_MATRICES ]</span>
                <h1 className="brutalist-title" style={{ fontSize: 'clamp(28px, 4vw, 42px)' }}>
                  AESTHETIC <span>SYS</span> INSTALL
                </h1>
                <p className="brutalist-para" style={{ fontSize: '14px', maxWidth: '600px', margin: '0 auto 15px auto' }}>
                  A simulated real-time digital projection where geometric structures bob, morph, and scale based on synthetic noise waveforms. Walk through the modular frequencies of Hundo's code nodes.
                </p>
                <div style={{ fontFamily: 'var(--font-hud)', fontSize: '9px', color: 'var(--accent-cyan)' }}>
                  RENDER ENGINE: WebGL2 / THREE.JS / POSTPROCESSING STATUS: ACTIVE
                </div>
              </div>
            </section>

            {/* 5. CONTACT / EXIT */}
            <section className="scroll-section contact-section">
              <div className="contact-card">
                <div className="brutalist-corner-accent"></div>
                <span className="section-label">[ SYS_TERMINAL // CONTACT ]</span>
                <h1 className="brutalist-title">EXIT <span>SYS</span></h1>
                <p className="brutalist-para">
                  Open booking gates. Send encrypted transmissions or view active networks.
                </p>

                <div className="contact-links">
                  <a href="mailto:booking@hundo-worldwide.com" className="contact-btn primary">
                    TRANSMIT: BOOKING@HUNDO-WORLDWIDE.COM
                  </a>
                  
                  <div className="social-grid">
                    <a href="https://soundcloud.com" target="_blank" rel="noreferrer" className="social-link">
                      SOUNDCLOUD
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-link">
                      INSTAGRAM
                    </a>
                    <a href="https://bandcamp.com" target="_blank" rel="noreferrer" className="social-link">
                      BANDCAMP
                    </a>
                  </div>
                </div>

                <div className="contact-footer">
                  © 2026 HUNDO WORLDWIDE ALL FREQUENCIES RESERVED.
                </div>
              </div>
            </section>

          </div>
        </Scroll>

      </ScrollControls>

      {/* 3D Post Processing Composer */}
      {/* Bloom gives neon lines/emissive textures their glowing visual halo */}
      <EffectComposer>
        <Bloom 
          luminanceThreshold={0.12} 
          luminanceSmoothing={0.7} 
          intensity={1.2} 
        />
        <Noise 
          opacity={0.06} // film grain in WebGL canvas
        />
      </EffectComposer>
    </>
  );
}
export { PROJECTS };
