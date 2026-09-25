import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import * as THREE from "three";

import CanvasLoader from "../Loader";
import CanvasErrorBoundary from "./CanvasErrorBoundary";
import { ScreenMotionGraphicEngine } from "./ScreenMotionGraphic";

const Computers = ({ isMobile, screenMode, onCycleMode }) => {
  const computer = useGLTF("/desktop_pc/scene.gltf");
  const engineRef = useRef(null);
  const screenMaterialRef = useRef(null);

  // Initialize engine once
  if (!engineRef.current) {
    engineRef.current = new ScreenMotionGraphicEngine();
    screenMaterialRef.current = new THREE.MeshBasicMaterial({
      map: engineRef.current.texture,
      toneMapped: false,
      side: THREE.DoubleSide,
    });
  }

  // Update mode when prop changes
  useEffect(() => {
    if (screenMode && engineRef.current) {
      engineRef.current.setMode(screenMode);
    }
  }, [screenMode]);

  // Apply animated canvas texture to screen mesh in 3D model
  useEffect(() => {
    if (!computer || !computer.scene || !screenMaterialRef.current) return;

    let matchCount = 0;
    computer.scene.traverse((child) => {
      if (child.isMesh) {
        const name = (child.name || "").toLowerCase();
        const matName = (child.material && child.material.name ? child.material.name : "").toLowerCase();

        // Match by mesh name or material name (MY SCREEN_MY SCREEN_0 / Material.074_30)
        if (name.includes("screen") || matName.includes("074_30") || matName.includes("screen")) {
          child.material = screenMaterialRef.current;
          child.castShadow = false;
          child.receiveShadow = false;
          matchCount++;
        }
      }
    });
  }, [computer]);

  // Continuously render motion graphics onto the canvas texture at 60fps
  useFrame((state) => {
    if (engineRef.current) {
      engineRef.current.update(state.clock.getElapsedTime());
    }
  });

  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor='black' />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />

      {/* Screen ambient glow illuminating desk and keyboard */}
      <pointLight
        position={isMobile ? [-0.8, -1.2, 1.0] : [0.0, -1.0, -0.6]}
        intensity={2.8}
        color='#915eff'
        distance={4.5}
      />
      <pointLight
        position={isMobile ? [-0.2, -1.5, 1.4] : [0.6, -1.3, -0.2]}
        intensity={1.8}
        color='#00cea8'
        distance={3.5}
      />

      <primitive
        object={computer.scene}
        scale={isMobile ? 0.52 : 0.65}
        position={isMobile ? [0, -4.5, -1.8] : [0.8, -3.9, -3.0]}
        rotation={[-0.01, -0.2, -0.1]}
        onClick={(e) => {
          e.stopPropagation();
          const next = engineRef.current ? engineRef.current.cycleMode() : "motion_hud";
          if (onCycleMode) onCycleMode(next);
        }}
        onPointerOver={() => {
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "auto";
        }}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [screenMode, setScreenMode] = useState("motion_hud");

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 640px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <CanvasErrorBoundary>
      <div className='relative w-full h-full'>
        <Canvas
          frameloop='always'
          shadows
          dpr={[1, 2]}
          camera={{ position: [20, 3, 5], fov: 25 }}
          gl={{ preserveDrawingBuffer: true }}
        >
          <Suspense fallback={<CanvasLoader />}>
            <OrbitControls
              enableZoom={false}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 2}
            />
            <Computers
              isMobile={isMobile}
              screenMode={screenMode}
              onCycleMode={(next) => setScreenMode(next)}
            />
          </Suspense>

          <Preload all />
        </Canvas>

        {/* Floating Screen Mode Controls positioned cleanly */}
        <div className='absolute bottom-20 xs:bottom-24 sm:bottom-20 right-1/2 translate-x-1/2 lg:right-16 lg:translate-x-0 z-20 flex items-center gap-1.5 sm:gap-2 bg-[#09031c]/90 backdrop-blur-xl border border-white/10 px-3.5 py-1.5 rounded-full shadow-2xl transition-all duration-300 hover:border-[#915EFF]/40'>
          <div className='flex items-center gap-1.5 pr-2 border-r border-white/15'>
            <span className='w-2 h-2 rounded-full bg-[#00cea8] animate-pulse' />
            <span className='text-[11px] sm:text-xs font-semibold text-white/90 hidden xs:inline tracking-wide'>
              3D Screen:
            </span>
          </div>
          <button
            type='button'
            onClick={() => setScreenMode("motion_hud")}
            className={`px-3 py-1 rounded-full text-[11px] sm:text-xs transition-all duration-200 cursor-pointer ${
              screenMode === "motion_hud"
                ? "bg-gradient-to-r from-[#915EFF] to-[#7038e8] text-white font-semibold shadow-md shadow-purple-500/30 scale-105"
                : "text-secondary hover:text-white"
            }`}
          >
            ⚡ Motion HUD
          </button>
          <button
            type='button'
            onClick={() => setScreenMode("showreel")}
            className={`px-3 py-1 rounded-full text-[11px] sm:text-xs transition-all duration-200 cursor-pointer ${
              screenMode === "showreel"
                ? "bg-gradient-to-r from-[#915EFF] to-[#7038e8] text-white font-semibold shadow-md shadow-purple-500/30 scale-105"
                : "text-secondary hover:text-white"
            }`}
          >
            🎬 Video Reel
          </button>
          <button
            type='button'
            onClick={() => setScreenMode("fusion")}
            className={`px-3 py-1 rounded-full text-[11px] sm:text-xs transition-all duration-200 cursor-pointer ${
              screenMode === "fusion"
                ? "bg-gradient-to-r from-[#915EFF] to-[#7038e8] text-white font-semibold shadow-md shadow-purple-500/30 scale-105"
                : "text-secondary hover:text-white"
            }`}
          >
            ✨ Fusion
          </button>
        </div>
      </div>
    </CanvasErrorBoundary>
  );
};

export default ComputersCanvas;
