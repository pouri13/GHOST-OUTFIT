import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { CameraViewMode, ShadingMode, LightingPreset } from '../types';
import { 
  Camera, 
  RotateCw, 
  Layers, 
  Sun, 
  Eye, 
  Crosshair, 
  Sparkles,
  Maximize2,
  ZoomIn,
  RefreshCw,
  Box
} from 'lucide-react';

interface Viewport3DProps {
  currentView: CameraViewMode;
  onViewChange: (view: CameraViewMode) => void;
  shadingMode: ShadingMode;
  onShadingModeChange: (mode: ShadingMode) => void;
  lightingPreset: LightingPreset;
  onLightingPresetChange: (preset: LightingPreset) => void;
}

export const Viewport3D: React.FC<Viewport3DProps> = ({
  currentView,
  onViewChange,
  shadingMode,
  onShadingModeChange,
  lightingPreset,
  onLightingPresetChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const requestRef = useRef<number | null>(null);

  // Mesh refs for toggles and shading updates
  const componentsGroupRef = useRef<THREE.Group | null>(null);
  const partMeshesRef = useRef<Map<string, THREE.Mesh>>(new Map());

  // Interactive UI state
  const [isTurntable, setIsTurntable] = useState<boolean>(false);
  const [showWireframe, setShowWireframe] = useState<boolean>(false);
  const [visibleParts, setVisibleParts] = useState({
    hood: true,
    mask: true,
    goggles: true,
    headset: true,
    vest: true,
    pouches: true,
    bodyBase: true,
  });

  // Camera targets and positions map
  const cameraPresets: Record<CameraViewMode, { pos: [number, number, number]; target: [number, number, number]; fov: number }> = {
    'perspective': { pos: [0.8, 1.3, 2.2], target: [0, 0.9, 0], fov: 42 },
    'front': { pos: [0, 0.9, 2.6], target: [0, 0.9, 0], fov: 36 },
    'back': { pos: [0, 0.9, -2.6], target: [0, 0.9, 0], fov: 36 },
    'left': { pos: [-2.6, 0.9, 0], target: [0, 0.9, 0], fov: 36 },
    'right': { pos: [2.6, 0.9, 0], target: [0, 0.9, 0], fov: 36 },
    'mask-close': { pos: [0, 1.62, 0.75], target: [0, 1.58, 0], fov: 30 },
    'vest-close': { pos: [0, 1.15, 1.2], target: [0, 1.12, 0], fov: 32 },
    'boots-close': { pos: [0, 0.22, 0.9], target: [0, 0.15, 0], fov: 30 },
  };

  // Mouse interaction state
  const isDraggingRef = useRef<boolean>(false);
  const prevMousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const orbitRef = useRef<{ theta: number; phi: number; radius: number; target: THREE.Vector3 }>({
    theta: 0.3,
    phi: Math.PI / 2.2,
    radius: 2.5,
    target: new THREE.Vector3(0, 0.9, 0)
  });

  // Setup Three.js scene
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 560;

    // SCENE
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0b0d);
    sceneRef.current = scene;

    // FOG
    scene.fog = new THREE.FogExp2(0x0a0b0d, 0.08);

    // CAMERA
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.05, 50);
    camera.position.set(0.8, 1.3, 2.2);
    camera.lookAt(0, 0.9, 0);
    cameraRef.current = camera;

    // RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // PEDESTAL GRID & FLOOR
    const gridHelper = new THREE.GridHelper(4, 20, 0x2e3440, 0x181a20);
    gridHelper.position.y = 0.001;
    scene.add(gridHelper);

    // Subtle reflective circular pedestal
    const pedestalGeo = new THREE.CylinderGeometry(0.9, 0.95, 0.04, 48);
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0x121418,
      roughness: 0.6,
      metalness: 0.4
    });
    const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestal.position.y = -0.02;
    pedestal.receiveShadow = true;
    scene.add(pedestal);

    // LIGHTING SETUP
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    ambientLight.name = 'ambientLight';
    scene.add(ambientLight);

    const mainKeyLight = new THREE.DirectionalLight(0xeef2ff, 2.2);
    mainKeyLight.position.set(2, 3, 3);
    mainKeyLight.castShadow = true;
    mainKeyLight.shadow.mapSize.width = 1024;
    mainKeyLight.shadow.mapSize.height = 1024;
    mainKeyLight.shadow.bias = -0.0005;
    mainKeyLight.name = 'mainKeyLight';
    scene.add(mainKeyLight);

    const fillLight = new THREE.DirectionalLight(0x708090, 0.8);
    fillLight.position.set(-2.5, 1.5, 1.5);
    fillLight.name = 'fillLight';
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x4a90e2, 1.8);
    rimLight.position.set(0, 2.5, -3);
    rimLight.name = 'rimLight';
    scene.add(rimLight);

    // BUILD CHARACTER HIERARCHY
    const characterGroup = new THREE.Group();
    characterGroup.name = 'GhostOperator';
    scene.add(characterGroup);
    componentsGroupRef.current = characterGroup;

    // Procedural tactical materials
    const matTacticalFabric = new THREE.MeshStandardMaterial({
      color: 0x16171a,
      roughness: 0.82,
      metalness: 0.03
    });
    const matCordura = new THREE.MeshStandardMaterial({
      color: 0x1a1b1f,
      roughness: 0.88,
      metalness: 0.0
    });
    const matPolymerPlate = new THREE.MeshStandardMaterial({
      color: 0x222428,
      roughness: 0.35,
      metalness: 0.12
    });
    const matLeather = new THREE.MeshStandardMaterial({
      color: 0x111214,
      roughness: 0.45,
      metalness: 0.04
    });
    const matRubber = new THREE.MeshStandardMaterial({
      color: 0x0c0d0e,
      roughness: 0.95,
      metalness: 0.0
    });
    const matMetal = new THREE.MeshStandardMaterial({
      color: 0x2d3035,
      roughness: 0.25,
      metalness: 0.85
    });
    const matGogglesGlass = new THREE.MeshPhysicalMaterial({
      color: 0x08090b,
      roughness: 0.1,
      metalness: 0.2,
      transmission: 0.65,
      transparent: true,
      opacity: 0.85
    });

    const partsMap = new Map<string, THREE.Mesh>();

    // 1. FRANKLIN BASE HEAD / NECK (player_one proportions)
    const headGeo = new THREE.SphereGeometry(0.115, 24, 20);
    headGeo.scale(0.85, 1.05, 0.95);
    const headMat = new THREE.MeshStandardMaterial({ color: 0x141518, roughness: 0.8 });
    const headMesh = new THREE.Mesh(headGeo, headMat);
    headMesh.position.set(0, 1.58, 0);
    headMesh.castShadow = true;
    characterGroup.add(headMesh);
    partsMap.set('headBase', headMesh);

    // Neck
    const neckGeo = new THREE.CylinderGeometry(0.065, 0.075, 0.12, 16);
    const neckMesh = new THREE.Mesh(neckGeo, matTacticalFabric);
    neckMesh.position.set(0, 1.46, -0.01);
    characterGroup.add(neckMesh);

    // 2. GHOST FACETED MANDIBLE SKULL MASK
    // Custom geometric plate (angular, non-CoD)
    const maskGeo = new THREE.ConeGeometry(0.09, 0.13, 6);
    maskGeo.scale(1.1, 0.85, 0.65);
    maskGeo.rotateX(Math.PI);
    const maskMesh = new THREE.Mesh(maskGeo, matPolymerPlate);
    maskMesh.position.set(0, 1.55, 0.075);
    maskMesh.castShadow = true;
    characterGroup.add(maskMesh);
    partsMap.set('mask', maskMesh);

    // Mask eye relief & nose bridge ridge
    const noseRidgeGeo = new THREE.BoxGeometry(0.024, 0.06, 0.04);
    const noseRidgeMesh = new THREE.Mesh(noseRidgeGeo, matPolymerPlate);
    noseRidgeMesh.position.set(0, 1.60, 0.088);
    characterGroup.add(noseRidgeMesh);

    // 3. BALACLAVA & TACTICAL HOOD
    const hoodGeo = new THREE.CylinderGeometry(0.14, 0.17, 0.22, 18, 1, true);
    hoodGeo.scale(0.9, 1.0, 1.05);
    const hoodMesh = new THREE.Mesh(hoodGeo, matTacticalFabric);
    hoodMesh.position.set(0, 1.57, -0.02);
    hoodMesh.castShadow = true;
    characterGroup.add(hoodMesh);
    partsMap.set('hood', hoodMesh);

    // 4. LOW-PROFILE GOGGLES
    const gogglesGeo = new THREE.BoxGeometry(0.16, 0.045, 0.04);
    const gogglesMesh = new THREE.Mesh(gogglesGeo, matGogglesGlass);
    gogglesMesh.position.set(0, 1.63, 0.095);
    characterGroup.add(gogglesMesh);
    partsMap.set('goggles', gogglesMesh);

    const gogglesFrameGeo = new THREE.BoxGeometry(0.17, 0.052, 0.025);
    const gogglesFrameMesh = new THREE.Mesh(gogglesFrameGeo, matRubber);
    gogglesFrameMesh.position.set(0, 1.63, 0.08);
    characterGroup.add(gogglesFrameMesh);

    // 5. TACTICAL COMMS HEADSET
    const headsetGroup = new THREE.Group();
    const cupGeo = new THREE.CylinderGeometry(0.035, 0.035, 0.03, 16);
    cupGeo.rotateZ(Math.PI / 2);
    
    // Left cup
    const leftCup = new THREE.Mesh(cupGeo, matPolymerPlate);
    leftCup.position.set(-0.11, 1.58, 0);
    headsetGroup.add(leftCup);
    
    // Right cup
    const rightCup = new THREE.Mesh(cupGeo, matPolymerPlate);
    rightCup.position.set(0.11, 1.58, 0);
    headsetGroup.add(rightCup);

    // Headband
    const bandGeo = new THREE.TorusGeometry(0.115, 0.012, 8, 24, Math.PI);
    bandGeo.rotateZ(Math.PI);
    const bandMesh = new THREE.Mesh(bandGeo, matTacticalFabric);
    bandMesh.position.set(0, 1.64, 0);
    headsetGroup.add(bandMesh);

    // Boom mic
    const micGeo = new THREE.CylinderGeometry(0.004, 0.004, 0.1, 8);
    micGeo.rotateX(Math.PI / 3);
    const micMesh = new THREE.Mesh(micGeo, matMetal);
    micMesh.position.set(-0.09, 1.55, 0.06);
    headsetGroup.add(micMesh);

    characterGroup.add(headsetGroup);
    partsMap.set('headset', leftCup);

    // 6. TORSO / COMBAT SHIRT (Franklin chest anatomy)
    const torsoGeo = new THREE.CylinderGeometry(0.18, 0.145, 0.44, 20);
    torsoGeo.scale(1.15, 1.0, 0.75);
    const torsoMesh = new THREE.Mesh(torsoGeo, matTacticalFabric);
    torsoMesh.position.set(0, 1.22, 0);
    torsoMesh.castShadow = true;
    characterGroup.add(torsoMesh);
    partsMap.set('shirt', torsoMesh);

    // 7. MODULAR PLATE CARRIER
    const vestGeo = new THREE.BoxGeometry(0.32, 0.34, 0.22);
    const vestMesh = new THREE.Mesh(vestGeo, matCordura);
    vestMesh.position.set(0, 1.24, 0.01);
    vestMesh.castShadow = true;
    characterGroup.add(vestMesh);
    partsMap.set('vest', vestMesh);

    // MOLLE mag pouches on chest
    const pouchGroup = new THREE.Group();
    for (let i = -1; i <= 1; i++) {
      const magPouchGeo = new THREE.BoxGeometry(0.065, 0.14, 0.045);
      const magMesh = new THREE.Mesh(magPouchGeo, matCordura);
      magMesh.position.set(i * 0.08, 1.18, 0.14);
      magMesh.castShadow = true;
      pouchGroup.add(magMesh);
    }

    // Chest admin pouch
    const adminPouchGeo = new THREE.BoxGeometry(0.18, 0.08, 0.035);
    const adminMesh = new THREE.Mesh(adminPouchGeo, matCordura);
    adminMesh.position.set(0, 1.33, 0.135);
    pouchGroup.add(adminMesh);

    // Radio & antenna on left shoulder
    const radioGeo = new THREE.BoxGeometry(0.045, 0.11, 0.04);
    const radioMesh = new THREE.Mesh(radioGeo, matPolymerPlate);
    radioMesh.position.set(-0.14, 1.28, 0.11);
    pouchGroup.add(radioMesh);

    const antennaGeo = new THREE.CylinderGeometry(0.003, 0.002, 0.26, 8);
    const antennaMesh = new THREE.Mesh(antennaGeo, matRubber);
    antennaMesh.position.set(-0.15, 1.45, 0.08);
    pouchGroup.add(antennaMesh);

    characterGroup.add(pouchGroup);
    partsMap.set('pouches', adminMesh);

    // 8. ARMS & TACTICAL SLEEVES
    const armGeo = new THREE.CylinderGeometry(0.055, 0.045, 0.48, 16);
    // Left Arm
    const leftArm = new THREE.Mesh(armGeo, matTacticalFabric);
    leftArm.position.set(-0.25, 1.24, 0);
    leftArm.rotation.z = Math.PI / 14;
    leftArm.castShadow = true;
    characterGroup.add(leftArm);
    partsMap.set('leftArm', leftArm);

    // Right Arm
    const rightArm = new THREE.Mesh(armGeo, matTacticalFabric);
    rightArm.position.set(0.25, 1.24, 0);
    rightArm.rotation.z = -Math.PI / 14;
    rightArm.castShadow = true;
    characterGroup.add(rightArm);
    partsMap.set('rightArm', rightArm);

    // Elbow pads
    const elbowGeo = new THREE.BoxGeometry(0.065, 0.08, 0.04);
    const leftElbow = new THREE.Mesh(elbowGeo, matPolymerPlate);
    leftElbow.position.set(-0.265, 1.22, -0.03);
    characterGroup.add(leftElbow);

    const rightElbow = new THREE.Mesh(elbowGeo, matPolymerPlate);
    rightElbow.position.set(0.265, 1.22, -0.03);
    characterGroup.add(rightElbow);

    // 9. TACTICAL ASSAULT GLOVES
    const gloveGeo = new THREE.BoxGeometry(0.07, 0.12, 0.045);
    const leftGlove = new THREE.Mesh(gloveGeo, matLeather);
    leftGlove.position.set(-0.29, 0.94, 0);
    characterGroup.add(leftGlove);

    const rightGlove = new THREE.Mesh(gloveGeo, matLeather);
    rightGlove.position.set(0.29, 0.94, 0);
    characterGroup.add(rightGlove);
    partsMap.set('gloves', leftGlove);

    // 10. TACTICAL DUTY BELT & SHEATH
    const beltGeo = new THREE.CylinderGeometry(0.165, 0.16, 0.06, 20);
    beltGeo.scale(1.1, 1.0, 0.78);
    const beltMesh = new THREE.Mesh(beltGeo, matCordura);
    beltMesh.position.set(0, 0.97, 0);
    characterGroup.add(beltMesh);
    partsMap.set('belt', beltMesh);

    // Knife Sheath (sheath only, zero live blade)
    const sheathGeo = new THREE.BoxGeometry(0.035, 0.18, 0.025);
    sheathGeo.rotateZ(0.15);
    const sheathMesh = new THREE.Mesh(sheathGeo, matPolymerPlate);
    sheathMesh.position.set(0.18, 0.88, 0.06);
    characterGroup.add(sheathMesh);

    // Rear IFAK Pouch
    const ifakGeo = new THREE.BoxGeometry(0.14, 0.08, 0.06);
    const ifakMesh = new THREE.Mesh(ifakGeo, matCordura);
    ifakMesh.position.set(0, 0.96, -0.14);
    characterGroup.add(ifakMesh);

    // 11. COMBAT PANTS (Franklin legs)
    const pelvisGeo = new THREE.CylinderGeometry(0.16, 0.15, 0.22, 18);
    pelvisGeo.scale(1.05, 1.0, 0.8);
    const pelvisMesh = new THREE.Mesh(pelvisGeo, matTacticalFabric);
    pelvisMesh.position.set(0, 0.88, 0);
    characterGroup.add(pelvisMesh);

    const legGeo = new THREE.CylinderGeometry(0.075, 0.055, 0.65, 16);
    // Left Leg
    const leftLeg = new THREE.Mesh(legGeo, matTacticalFabric);
    leftLeg.position.set(-0.11, 0.55, 0);
    leftLeg.castShadow = true;
    characterGroup.add(leftLeg);
    partsMap.set('pants', leftLeg);

    // Right Leg
    const rightLeg = new THREE.Mesh(legGeo, matTacticalFabric);
    rightLeg.position.set(0.11, 0.55, 0);
    rightLeg.castShadow = true;
    characterGroup.add(rightLeg);

    // Cargo Bellows Pockets
    const pocketGeo = new THREE.BoxGeometry(0.045, 0.14, 0.11);
    const leftCargo = new THREE.Mesh(pocketGeo, matCordura);
    leftCargo.position.set(-0.18, 0.60, 0.02);
    characterGroup.add(leftCargo);

    const rightCargo = new THREE.Mesh(pocketGeo, matCordura);
    rightCargo.position.set(0.18, 0.60, 0.02);
    characterGroup.add(rightCargo);

    // Articulated Knee Armor Caps
    const kneeCapGeo = new THREE.BoxGeometry(0.075, 0.10, 0.035);
    const leftKnee = new THREE.Mesh(kneeCapGeo, matPolymerPlate);
    leftKnee.position.set(-0.11, 0.50, 0.07);
    characterGroup.add(leftKnee);

    const rightKnee = new THREE.Mesh(kneeCapGeo, matPolymerPlate);
    rightKnee.position.set(0.11, 0.50, 0.07);
    characterGroup.add(rightKnee);

    // 12. HIGH-TRACTION TACTICAL BOOTS
    const bootShaftGeo = new THREE.CylinderGeometry(0.065, 0.065, 0.18, 16);
    const leftShaft = new THREE.Mesh(bootShaftGeo, matLeather);
    leftShaft.position.set(-0.11, 0.18, 0);
    characterGroup.add(leftShaft);
    partsMap.set('boots', leftShaft);

    const rightShaft = new THREE.Mesh(bootShaftGeo, matLeather);
    rightShaft.position.set(0.11, 0.18, 0);
    characterGroup.add(rightShaft);

    // Boot Foot & Vibram Sole
    const bootFootGeo = new THREE.BoxGeometry(0.09, 0.11, 0.22);
    const leftFoot = new THREE.Mesh(bootFootGeo, matLeather);
    leftFoot.position.set(-0.11, 0.08, 0.03);
    leftFoot.castShadow = true;
    characterGroup.add(leftFoot);

    const rightFoot = new THREE.Mesh(bootFootGeo, matLeather);
    rightFoot.position.set(0.11, 0.08, 0.03);
    rightFoot.castShadow = true;
    characterGroup.add(rightFoot);

    // Soles
    const soleGeo = new THREE.BoxGeometry(0.096, 0.035, 0.24);
    const leftSole = new THREE.Mesh(soleGeo, matRubber);
    leftSole.position.set(-0.11, 0.02, 0.03);
    characterGroup.add(leftSole);

    const rightSole = new THREE.Mesh(soleGeo, matRubber);
    rightSole.position.set(0.11, 0.02, 0.03);
    characterGroup.add(rightSole);

    partMeshesRef.current = partsMap;

    // RESIZE OBSERVER
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // ANIMATION LOOP
    let angle = 0;
    const animate = () => {
      requestRef.current = requestAnimationFrame(animate);

      if (isTurntable && componentsGroupRef.current) {
        angle += 0.008;
        componentsGroupRef.current.rotation.y = angle;
      } else if (!isTurntable && componentsGroupRef.current && currentView === 'perspective') {
        // preserve current rotation
      } else if (componentsGroupRef.current && currentView !== 'perspective') {
        componentsGroupRef.current.rotation.y = 0;
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    animate();

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      resizeObserver.disconnect();
      renderer.dispose();
    };
  }, []);

  // Update Camera based on View Mode Preset
  useEffect(() => {
    if (!cameraRef.current || !componentsGroupRef.current) return;
    const camera = cameraRef.current;
    const preset = cameraPresets[currentView];

    if (currentView !== 'perspective') {
      setIsTurntable(false);
      componentsGroupRef.current.rotation.y = 0;
    }

    camera.fov = preset.fov;
    camera.position.set(...preset.pos);
    camera.lookAt(preset.target[0], preset.target[1], preset.target[2]);
    camera.updateProjectionMatrix();

    // Update orbit controls tracker
    const targetVec = new THREE.Vector3(...preset.target);
    const posVec = new THREE.Vector3(...preset.pos);
    orbitRef.current.target.copy(targetVec);
    orbitRef.current.radius = posVec.distanceTo(targetVec);
  }, [currentView]);

  // Update Lighting Presets
  useEffect(() => {
    if (!sceneRef.current) return;
    const scene = sceneRef.current;
    const key = scene.getObjectByName('mainKeyLight') as THREE.DirectionalLight;
    const fill = scene.getObjectByName('fillLight') as THREE.DirectionalLight;
    const rim = scene.getObjectByName('rimLight') as THREE.DirectionalLight;
    const amb = scene.getObjectByName('ambientLight') as THREE.AmbientLight;

    if (!key || !fill || !rim || !amb) return;

    if (lightingPreset === 'night-ops') {
      amb.color.setHex(0x1a233a);
      amb.intensity = 0.4;
      key.color.setHex(0x9bc2e6);
      key.intensity = 1.4;
      fill.color.setHex(0x223048);
      fill.intensity = 0.5;
      rim.color.setHex(0x4a90e2);
      rim.intensity = 2.2;
      scene.background = new THREE.Color(0x060709);
    } else if (lightingPreset === 'tactical-bunker') {
      amb.color.setHex(0x2f342f);
      amb.intensity = 0.6;
      key.color.setHex(0xd0e8c8);
      key.intensity = 1.8;
      fill.color.setHex(0x3a4838);
      fill.intensity = 0.7;
      rim.color.setHex(0x76a066);
      rim.intensity = 1.5;
      scene.background = new THREE.Color(0x0a0c0a);
    } else if (lightingPreset === 'los-santos') {
      amb.color.setHex(0x403028);
      amb.intensity = 0.5;
      key.color.setHex(0xffaa5e);
      key.intensity = 2.4;
      fill.color.setHex(0x403548);
      fill.intensity = 0.8;
      rim.color.setHex(0x5a70ff);
      rim.intensity = 1.6;
      scene.background = new THREE.Color(0x100c0a);
    } else {
      // Studio Neutral
      amb.color.setHex(0xffffff);
      amb.intensity = 0.55;
      key.color.setHex(0xfafafa);
      key.intensity = 2.0;
      fill.color.setHex(0x8a929a);
      fill.intensity = 0.9;
      rim.color.setHex(0xd0d8e2);
      rim.intensity = 1.5;
      scene.background = new THREE.Color(0x0b0d10);
    }
  }, [lightingPreset]);

  // Update Shading Mode (PBR, Wireframe, Bone Weights, GTA Component Slots, Clay)
  useEffect(() => {
    if (!componentsGroupRef.current) return;
    const group = componentsGroupRef.current;

    group.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const mat = child.material as THREE.MeshStandardMaterial;
        
        if (shadingMode === 'wireframe') {
          mat.wireframe = true;
          mat.color.setHex(0x22d3ee);
        } else if (shadingMode === 'clay') {
          mat.wireframe = false;
          mat.color.setHex(0x888c94);
          mat.roughness = 0.7;
          mat.metalness = 0.05;
        } else if (shadingMode === 'bone-weights') {
          mat.wireframe = false;
          // Simulate GTA V bone weight heatmaps
          const y = child.position.y;
          if (y > 1.45) mat.color.setHex(0xef4444); // Head/Neck (Red)
          else if (y > 1.1) mat.color.setHex(0xf59e0b); // Chest/Spine (Orange)
          else if (y > 0.85) mat.color.setHex(0x10b981); // Pelvis (Green)
          else if (y > 0.4) mat.color.setHex(0x06b6d4); // Thighs/Calves (Cyan)
          else mat.color.setHex(0x3b82f6); // Feet/Toe (Blue)
        } else if (shadingMode === 'gta-slots') {
          mat.wireframe = false;
          const name = child.name || '';
          if (name.includes('jbib') || child.position.y > 1.1 && child.position.y <= 1.45) {
            mat.color.setHex(0x3b82f6); // jbib = blue
          } else if (child.position.y > 0.35 && child.position.y <= 0.95) {
            mat.color.setHex(0x10b981); // lowr = green
          } else if (child.position.y <= 0.35) {
            mat.color.setHex(0xf97316); // feet = orange
          } else if (child.position.y > 1.52) {
            mat.color.setHex(0xec4899); // berd / p_head = pink
          } else {
            mat.color.setHex(0xa855f7); // accs = purple
          }
        } else {
          // PBR Default Blackout Tactical
          mat.wireframe = false;
          if (child.name === 'goggles') {
            mat.color.setHex(0x08090b);
          } else {
            mat.color.setHex(0x151619);
          }
        }
      }
    });
  }, [shadingMode]);

  // Mouse Orbit Drag Interaction
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    prevMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !cameraRef.current) return;
    const deltaX = e.clientX - prevMousePosRef.current.x;
    const deltaY = e.clientY - prevMousePosRef.current.y;
    prevMousePosRef.current = { x: e.clientX, y: e.clientY };

    if (currentView === 'perspective') {
      const orbit = orbitRef.current;
      orbit.theta -= deltaX * 0.008;
      orbit.phi = Math.max(0.1, Math.min(Math.PI - 0.1, orbit.phi - deltaY * 0.008));

      const x = orbit.target.x + orbit.radius * Math.sin(orbit.phi) * Math.sin(orbit.theta);
      const y = orbit.target.y + orbit.radius * Math.cos(orbit.phi);
      const z = orbit.target.z + orbit.radius * Math.sin(orbit.phi) * Math.cos(orbit.theta);

      cameraRef.current.position.set(x, y, z);
      cameraRef.current.lookAt(orbit.target);
    }
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (!cameraRef.current) return;
    const camera = cameraRef.current;
    const zoomFactor = e.deltaY > 0 ? 1.06 : 0.94;
    
    if (camera.fov * zoomFactor >= 15 && camera.fov * zoomFactor <= 65) {
      camera.fov *= zoomFactor;
      camera.updateProjectionMatrix();
    }
  };

  return (
    <div id="viewport-3d-container" className="relative w-full rounded-2xl overflow-hidden border border-neutral-800/80 bg-neutral-950 shadow-2xl">
      {/* 3D WebGL Canvas Container */}
      <div 
        ref={containerRef} 
        className="w-full h-[540px] md:h-[620px] cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      />

      {/* Floating Viewport HUD Header */}
      <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        {/* Left Status Badge */}
        <div className="flex items-center gap-2 bg-neutral-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-neutral-800 pointer-events-auto shadow-lg">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold tracking-wider uppercase text-neutral-200">
            RAGE RENDER VIEWPORT // FRANKLIN PED FIT
          </span>
          <span className="text-[11px] text-neutral-400 border-l border-neutral-700 pl-2">
            28.4K Tris
          </span>
        </div>

        {/* Shading Mode Switcher */}
        <div className="flex items-center gap-1 bg-neutral-900/90 backdrop-blur-md p-1 rounded-xl border border-neutral-800 pointer-events-auto shadow-lg">
          <button
            id="shading-pbr-btn"
            onClick={() => onShadingModeChange('pbr')}
            className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors ${
              shadingMode === 'pbr' ? 'bg-neutral-800 text-white shadow-sm' : 'text-neutral-400 hover:text-neutral-200'
            }`}
            title="PBR Shaded Material"
          >
            PBR Texture
          </button>
          <button
            id="shading-wire-btn"
            onClick={() => onShadingModeChange('wireframe')}
            className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors ${
              shadingMode === 'wireframe' ? 'bg-cyan-950/80 text-cyan-400 border border-cyan-800/60' : 'text-neutral-400 hover:text-neutral-200'
            }`}
            title="Topology & Wireframe Density"
          >
            Topology
          </button>
          <button
            id="shading-weights-btn"
            onClick={() => onShadingModeChange('bone-weights')}
            className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors ${
              shadingMode === 'bone-weights' ? 'bg-amber-950/80 text-amber-400 border border-amber-800/60' : 'text-neutral-400 hover:text-neutral-200'
            }`}
            title="Rigging & Bone Weight Heatmap"
          >
            Weights
          </button>
          <button
            id="shading-slots-btn"
            onClick={() => onShadingModeChange('gta-slots')}
            className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors ${
              shadingMode === 'gta-slots' ? 'bg-purple-950/80 text-purple-400 border border-purple-800/60' : 'text-neutral-400 hover:text-neutral-200'
            }`}
            title="GTA V Ped Component Slots (jbib, lowr, feet, etc.)"
          >
            GTA Slots
          </button>
          <button
            id="shading-clay-btn"
            onClick={() => onShadingModeChange('clay')}
            className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors ${
              shadingMode === 'clay' ? 'bg-neutral-700 text-white' : 'text-neutral-400 hover:text-neutral-200'
            }`}
            title="Neutral Clay Shading"
          >
            Clay
          </button>
        </div>
      </div>

      {/* Camera View Modes Selector Bar (Bottom Center) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 max-w-[95%] overflow-x-auto p-1.5 bg-neutral-900/95 backdrop-blur-md rounded-2xl border border-neutral-800 shadow-2xl flex items-center gap-1.5">
        <button
          id="cam-perspective-btn"
          onClick={() => onViewChange('perspective')}
          className={`px-3 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap transition-all ${
            currentView === 'perspective' 
              ? 'bg-neutral-200 text-neutral-950 font-semibold shadow-md' 
              : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
          }`}
        >
          Orbit 3D
        </button>

        <div className="h-4 w-[1px] bg-neutral-800 mx-0.5" />

        <button
          id="cam-front-btn"
          onClick={() => onViewChange('front')}
          className={`px-3 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap transition-all ${
            currentView === 'front' 
              ? 'bg-neutral-200 text-neutral-950 font-semibold shadow-md' 
              : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
          }`}
        >
          1. Front
        </button>

        <button
          id="cam-back-btn"
          onClick={() => onViewChange('back')}
          className={`px-3 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap transition-all ${
            currentView === 'back' 
              ? 'bg-neutral-200 text-neutral-950 font-semibold shadow-md' 
              : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
          }`}
        >
          2. Back
        </button>

        <button
          id="cam-left-btn"
          onClick={() => onViewChange('left')}
          className={`px-3 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap transition-all ${
            currentView === 'left' 
              ? 'bg-neutral-200 text-neutral-950 font-semibold shadow-md' 
              : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
          }`}
        >
          3. Left Profile
        </button>

        <button
          id="cam-right-btn"
          onClick={() => onViewChange('right')}
          className={`px-3 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap transition-all ${
            currentView === 'right' 
              ? 'bg-neutral-200 text-neutral-950 font-semibold shadow-md' 
              : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
          }`}
        >
          4. Right Profile
        </button>

        <div className="h-4 w-[1px] bg-neutral-800 mx-0.5" />

        <button
          id="cam-mask-btn"
          onClick={() => onViewChange('mask-close')}
          className={`px-3 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap transition-all ${
            currentView === 'mask-close' 
              ? 'bg-red-500/20 text-red-300 border border-red-500/40 font-semibold shadow-md' 
              : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
          }`}
        >
          🔍 5. Mask Detail
        </button>

        <button
          id="cam-vest-btn"
          onClick={() => onViewChange('vest-close')}
          className={`px-3 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap transition-all ${
            currentView === 'vest-close' 
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold shadow-md' 
              : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
          }`}
        >
          🔍 6. Vest Detail
        </button>

        <button
          id="cam-boots-btn"
          onClick={() => onViewChange('boots-close')}
          className={`px-3 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap transition-all ${
            currentView === 'boots-close' 
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold shadow-md' 
              : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
          }`}
        >
          🔍 7. Boots Detail
        </button>

        {/* 360 Turntable Toggle */}
        <button
          id="turntable-toggle-btn"
          onClick={() => setIsTurntable(!isTurntable)}
          className={`p-1.5 rounded-xl transition-all ${
            isTurntable ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'text-neutral-400 hover:text-neutral-200'
          }`}
          title="Toggle 360° Turntable Rotation"
        >
          <RotateCw className={`w-4 h-4 ${isTurntable ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Floating Environment Lighting Controls (Bottom Right) */}
      <div className="absolute top-16 right-4 flex flex-col gap-1.5 bg-neutral-900/90 backdrop-blur-md p-2 rounded-xl border border-neutral-800 shadow-xl pointer-events-auto">
        <span className="text-[10px] font-semibold tracking-wider text-neutral-400 uppercase px-1">
          HDRI / Lighting
        </span>
        <button
          onClick={() => onLightingPresetChange('night-ops')}
          className={`px-2 py-1 text-left text-xs rounded-lg transition-colors ${
            lightingPreset === 'night-ops' ? 'bg-blue-950 text-blue-300 font-medium' : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          🌙 Night Ops
        </button>
        <button
          onClick={() => onLightingPresetChange('tactical-bunker')}
          className={`px-2 py-1 text-left text-xs rounded-lg transition-colors ${
            lightingPreset === 'tactical-bunker' ? 'bg-emerald-950 text-emerald-300 font-medium' : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          🛡️ Bunker Fluorescent
        </button>
        <button
          onClick={() => onLightingPresetChange('los-santos')}
          className={`px-2 py-1 text-left text-xs rounded-lg transition-colors ${
            lightingPreset === 'los-santos' ? 'bg-amber-950 text-amber-300 font-medium' : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          🌇 LS Sunset
        </button>
        <button
          onClick={() => onLightingPresetChange('studio-neutral')}
          className={`px-2 py-1 text-left text-xs rounded-lg transition-colors ${
            lightingPreset === 'studio-neutral' ? 'bg-neutral-800 text-white font-medium' : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          💡 Studio Neutral
        </button>
      </div>

      {/* Navigation Instruction Overlay (Bottom Left) */}
      <div className="absolute bottom-4 left-4 hidden md:flex items-center gap-2 text-[11px] text-neutral-500 bg-neutral-900/70 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-neutral-800/60 pointer-events-none">
        <span>Click & Drag to Orbit</span>
        <span>•</span>
        <span>Scroll to Zoom</span>
      </div>
    </div>
  );
};
