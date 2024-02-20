import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import createScene from './renderCanvas';

const App = () => {

  // canvasを扱う、DOMを扱うから初期値null
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // シーンの作成
    const { scene, camera, renderer } = createScene(canvasRef);

    // モデルの読み込み
    let model: THREE.Object3D;
    const loader = new GLTFLoader();
    loader.load('assets/earth2.glb', (gltf) => {
      model = gltf.scene;
      model.position.set(0,-1,0);
      scene.add(model);

      // カメラの位置を設定
      camera.position.set(0, 1, 5);

      // シーンの更新
      const animate = () => {
        requestAnimationFrame(animate);

        // モデルの回転
        if (model) {
          model.rotation.y += 0.001;
        }
        renderer.render(scene, camera);
      };
      animate();
    });
  }, []);

  return <canvas ref={canvasRef} className='canvasContaier'/>;
}

export default App