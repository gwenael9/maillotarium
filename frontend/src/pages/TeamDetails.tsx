import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Suspense, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

function JerseyCard({ url, angle, currentRotation }: { url: string; angle: number; currentRotation: number }) {
  const texture = useLoader(THREE.TextureLoader, url);
  const meshRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null!);

  useFrame(() => {
    // 1. Calcul de la position sur le cercle (Manège)
    // On ajoute l'angle du maillot à la rotation globale du manège
    const finalAngle = angle + currentRotation;
    const radius = 3.2; // Rayon du manège
    
    const x = Math.sin(finalAngle) * radius;
    const z = Math.cos(finalAngle) * radius;
    
    meshRef.current.position.lerp(new THREE.Vector3(x, 0, z), 0.1);

    // 2. Toujours regarder vers la caméra (Billboard effect)
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, 0, 0.1);

    // 3. Mise à l'échelle et Opacité selon la proximité (Z)
    // Plus Z est grand (proche de nous), plus c'est grand et opaque
    const isFront = z > 2.5; 
    const scale = isFront ? 2.5 : 1.6;
    meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, 1), 0.1);
    
    if (materialRef.current) {
      const targetOpacity = z > 1 ? 1 : 0.5;
      materialRef.current.opacity = THREE.MathUtils.lerp(materialRef.current.opacity, targetOpacity, 0.1);
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[1, 1.25]} />
      <meshBasicMaterial 
        ref={materialRef} 
        map={texture} 
        transparent={true} 
        side={THREE.DoubleSide} 
      />
    </mesh>
  );
}

export default function TeamDetails() {
  // On stocke l'index actuel pour savoir quel maillot est "devant"
  const [currentIndex, setCurrentIndex] = useState(1); // 1 = Domicile par défaut
  const jerseys = useMemo(() => [
    { id: 0, url: "/maillots/away.png", label: "EXTÉRIEUR" },
    { id: 1, url: "/maillots/home.png", label: "DOMICILE" },
    { id: 2, url: "/maillots/third.png", label: "THIRD" },
  ], []);

  const step = (Math.PI * 2) / jerseys.length;
  
  // La rotation est basée sur l'index
  const rotation = -currentIndex * step;

  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => prev - 1);
  };

  return (
    <div className="h-full w-full relative overflow-hidden bg-transparent">
      
      {/* Canvas */}
      <Canvas camera={{ position: [0, 0, 8], fov: 40 }}>
        <Suspense fallback={null}>
          {jerseys.map((j, i) => (
            <JerseyCard 
              key={j.id}
              url={j.url}
              angle={i * step}
              currentRotation={rotation}
            />
          ))}
        </Suspense>
      </Canvas>

      {/* Flèche Gauche */}
      <button 
        onClick={handlePrev}
        className="absolute left-8 top-1/2 -translate-y-1/2 z-20 p-4 transition-all hover:scale-125 group"
        aria-label="Maillot précédent"
      >
        <div className="border-t-4 border-l-4 border-white w-6 h-6 -rotate-45 group-hover:border-red-500 transition-colors" />
      </button>

      {/* Flèche Droite */}
      <button 
        onClick={handleNext}
        className="absolute right-8 top-1/2 -translate-y-1/2 z-20 p-4 transition-all hover:scale-125 group"
        aria-label="Maillot suivant"
      >
        <div className="border-t-4 border-r-4 border-white w-6 h-6 rotate-45 group-hover:border-red-500 transition-colors" />
      </button>
    </div>
  );
}