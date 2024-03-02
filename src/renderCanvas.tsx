import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

// シーンの作成
const createScene = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    // シーン
    const scene = new THREE.Scene();

    // ライト
    const color = 0xFFFFFF; 
    const intensity = 300;
    const distance = 300;
    const decay = 2;

    // 立方体の頂点座標を計算
    const vertices = [
        new THREE.Vector3(-3, -3, -3), 
        new THREE.Vector3(3, -3, -3),  
        new THREE.Vector3(3, 3, -3),   
        new THREE.Vector3(-3, 3, -3),  
        new THREE.Vector3(-3, -3, 3),  
        new THREE.Vector3(3, -3, 3),   
        new THREE.Vector3(3, 3, 3),    
        new THREE.Vector3(-3, 3, 3)    
    ];

    // ポイントライトを立方体の頂点の位置に配置
    for (const vertex of vertices) {
        const light = new THREE.PointLight(color, intensity, distance, decay);
        light.position.copy(vertex);
        scene.add(light);
    }

    // カメラ
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
    camera.position.set(0, 1, 5);
    scene.add(camera);

    const controls = new OrbitControls(camera, canvasRef.current!);
    controls.enableDamping = true
    
    // ヘルパー
    const gridHelper = new THREE.GridHelper( 20, 10 );
    gridHelper.position.set(0,-1,0);
    scene.add( gridHelper );

    // レンダラー
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current!,
    });
    renderer.setSize(sizes.width, sizes.height);

    // 背景色を水色に設定
    renderer.setClearColor('#001021');

    return {  scene, camera, renderer };
};

export default createScene;