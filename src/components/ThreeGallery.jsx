import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { X } from 'lucide-react';

const PORTFOLIO_ITEMS = [
  {
    id: 1,
    src: '/images/WEEDING/HEROSEACTIONIMAGE/5.webp',
    title: 'Sacred Vows',
    category: 'Weddings',
    desc: 'Timeless moments captured during traditional rituals.',
  },
  {
    id: 2,
    src: '/images/WEEDING/HEROSEACTIONIMAGE/6.webp',
    title: 'The Royal Procession',
    category: 'Weddings',
    desc: 'Vibrant grand entries filled with joy and celebration.',
  },
  {
    id: 3,
    src: '/images/WEEDING/PREWEEDING/1.webp',
    title: 'Golden Hour Embrace',
    category: 'Pre-Weddings',
    desc: 'Atmospheric sunset storytelling by the shore.',
  },
  {
    id: 4,
    src: '/images/BABYIMAGE/4.webp',
    title: 'First Smiles',
    category: 'Baby & Maternity',
    desc: 'Pure, candid expressions of innocent wonder.',
  },
  {
    id: 5,
    src: '/images/WEEDING/1.webp',
    title: 'Bridal Elegance',
    category: 'Weddings',
    desc: 'Intricate detail focus and heirloom portraiture.',
  },
  {
    id: 6,
    src: '/images/WEEDING/PREWEEDING/2.webp',
    title: 'Whispers in the Mist',
    category: 'Pre-Weddings',
    desc: 'Dreamy cinematic compositions in nature.',
  },
  {
    id: 7,
    src: '/images/BABYIMAGE/1.webp',
    title: 'Motherhood Grace',
    category: 'Baby & Maternity',
    desc: 'Warm, intimate maternity sessions celebrating new life.',
  },
  {
    id: 8,
    src: '/images/WEEDING/2.webp',
    title: 'Jayamala Joy',
    category: 'Weddings',
    desc: 'Unscripted emotion during flower garland exchange.',
  },
  {
    id: 9,
    src: '/images/WEEDING/PREWEEDING/6.webp',
    title: 'Urban Serenade',
    category: 'Pre-Weddings',
    desc: 'Modern aesthetics with classic emotional warmth.',
  },
  {
    id: 10,
    src: '/images/BABYIMAGE/2.webp',
    title: 'Tiny Steps',
    category: 'Baby & Maternity',
    desc: 'Heartwarming milestone portraits with soft lighting.',
  },
  {
    id: 11,
    src: '/images/WEEDING/7.webp',
    title: 'Eternal Promise',
    category: 'Weddings',
    desc: 'Capturing the deep glance between souls.',
  },
  {
    id: 12,
    src: '/images/BABYIMAGE/5.webp',
    title: 'Angelic Dreams',
    category: 'Baby & Maternity',
    desc: 'Gentle, minimalist newborn studio photography.',
  },
];

export default function ThreeGallery() {
  const mountRef = useRef(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const rotationTargetRef = useRef(0);
  const currentRotationRef = useRef(0);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 550;

    // 1. Scene Setup - Transparent background (No black color)
    const scene = new THREE.Scene();

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 9.2);

    // 3. Renderer Setup with full transparency
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. Vibrant Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.0);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.8);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    // 5. Create 3D Carousel Ring
    const meshesGroup = new THREE.Group();
    scene.add(meshesGroup);

    const textureLoader = new THREE.TextureLoader();
    const count = PORTFOLIO_ITEMS.length;
    const radius = Math.max(4.2, count * 0.45);
    const planeGeo = new THREE.PlaneGeometry(2.3, 3.0, 16, 16);

    const itemsMap = [];

    PORTFOLIO_ITEMS.forEach((item, index) => {
      const angle = (index / count) * Math.PI * 2;
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;

      const cardObj = new THREE.Object3D();
      cardObj.position.set(x, 0, z);
      cardObj.rotation.y = angle;

      const texture = textureLoader.load(item.src);
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;

      const material = new THREE.MeshStandardMaterial({
        map: texture,
        side: THREE.DoubleSide,
        roughness: 0.2,
        metalness: 0.05,
      });

      const mesh = new THREE.Mesh(planeGeo, material);
      mesh.userData = item;
      cardObj.add(mesh);

      // Subtle light border frame
      const borderGeo = new THREE.PlaneGeometry(2.36, 3.06);
      const borderMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6,
      });
      const borderMesh = new THREE.Mesh(borderGeo, borderMat);
      borderMesh.position.z = -0.008;
      cardObj.add(borderMesh);

      meshesGroup.add(cardObj);
      itemsMap.push({ mesh, cardObj });
    });

    // Raycaster for mouse click & drag
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);
    let hoveredMesh = null;

    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / container.clientWidth) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / container.clientHeight) * 2 + 1;
    };

    let isDragging = false;
    let previousMouseX = 0;

    const handlePointerDown = (e) => {
      isDragging = true;
      previousMouseX = e.clientX;
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    const handleGlobalPointerMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMouseX;
      previousMouseX = e.clientX;
      rotationTargetRef.current += deltaX * 0.004;
    };

    container.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointermove', handleGlobalPointerMove);

    const handleClick = () => {
      if (hoveredMesh) {
        setSelectedItem(hoveredMesh.userData);
      }
    };
    container.addEventListener('click', handleClick);

    // Continuous Auto-Rotation Animation Loop
    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Continuous auto-rotation
      if (!isDragging) {
        rotationTargetRef.current += 0.0035;
      }

      currentRotationRef.current += (rotationTargetRef.current - currentRotationRef.current) * 0.08;
      meshesGroup.rotation.y = currentRotationRef.current;

      // Hover Raycasting
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(itemsMap.map((entry) => entry.mesh));

      if (intersects.length > 0) {
        const topMesh = intersects[0].object;
        if (hoveredMesh !== topMesh) {
          if (hoveredMesh) {
            hoveredMesh.scale.set(1, 1, 1);
            hoveredMesh.position.z = 0;
          }
          hoveredMesh = topMesh;
          container.style.cursor = 'pointer';
        }
        hoveredMesh.scale.lerp(new THREE.Vector3(1.1, 1.1, 1.1), 0.15);
        hoveredMesh.position.z = THREE.MathUtils.lerp(hoveredMesh.position.z, 0.35, 0.15);
      } else {
        if (hoveredMesh) {
          hoveredMesh.scale.set(1, 1, 1);
          hoveredMesh.position.z = 0;
          hoveredMesh = null;
          container.style.cursor = 'grab';
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 550;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointermove', handleGlobalPointerMove);
      container.removeEventListener('click', handleClick);

      planeGeo.dispose();
      itemsMap.forEach(({ mesh }) => {
        if (mesh.material.map) mesh.material.map.dispose();
        mesh.material.dispose();
        mesh.geometry.dispose();
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div className="three-gallery-wrapper transparent-bg">
      {/* 3D WebGL Canvas Container - Auto Rotating Images */}
      <div className="three-canvas-container" ref={mountRef}></div>

      {/* Lightbox Overlay */}
      {selectedItem && (
        <div className="three-lightbox-overlay" onClick={() => setSelectedItem(null)}>
          <div className="three-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close-btn" onClick={() => setSelectedItem(null)}>
              <X size={24} />
            </button>
            <div className="lightbox-img-wrapper">
              <img src={selectedItem.src} alt={selectedItem.title} />
            </div>
            <div className="lightbox-info">
              <span className="lightbox-category">{selectedItem.category}</span>
              <h3>{selectedItem.title}</h3>
              <p>{selectedItem.desc}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
