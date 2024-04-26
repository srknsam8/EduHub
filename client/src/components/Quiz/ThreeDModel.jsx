import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import styles from './ThreeDModel.module.css';

function GLTFRenderer() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    const loader = new GLTFLoader();

    camera.position.set(1, 1, 5); // Adjusted camera position
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearAlpha(0);
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Enable damping for smoother camera movements
    controls.dampingFactor = 0.25; // Adjust damping factor if necessary

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x000000, 1);
    scene.add(hemisphereLight);

    let model;
    loader.load('src/public/scene.gltf', (gltf) => { // Adjusted path to GLTF model
      model = gltf.scene;
      model.scale.set(0.1, 0.1, 0.1);

      scene.add(model);
    });

    const animate = () => {
      requestAnimationFrame(animate);

      controls.update();

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      className={styles.ThreeDcanvas}
      ref={containerRef}
      style={{ width: '25rem', height: '25rem', position: 'absolute' }}
    />
  );
}

export default GLTFRenderer;
