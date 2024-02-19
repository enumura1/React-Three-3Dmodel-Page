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
    const color = 0xFFFFFF; // 光の色
    const intensity = 300; // 光の強度
    const distance = 300; // 光の有効範囲（距離）
    const decay = 3; // 減衰率

    const numLights = 9; // ライトの数
    const radius = 3; // ライトの配置半径

    // ライトを配置するためのグループを作成
    const lightsGroup = new THREE.Group();

    // xy平面とz軸方向の両方に6つのポイントライトを均等に配置
    for (let i = 0; i < numLights; i++) {
      const angle = (Math.PI * 2) / numLights * i;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const z = (i % 2 === 0) ? radius : -radius; // 偶数番目のライトは+z軸方向、奇数番目のライトは-z軸方向

      const light = new THREE.PointLight(color, intensity, distance, decay);
      light.position.set(x, y, z);
      lightsGroup.add(light);
    }

    scene.add(lightsGroup);


    // カメラ
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
    camera.position.set(0, 1, 5);
    scene.add(camera);

    // カメラコントローラーを作成
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const controls = new OrbitControls(camera, canvasRef.current!);
    controls.enableDamping = true
  

    const divisions = 10;
    const gridHelper = new THREE.GridHelper( 20, divisions );
    gridHelper.position.set(0,-1,0);
    scene.add( gridHelper );

    // レンダラー
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current!,
    });
    renderer.setSize(sizes.width, sizes.height);

    // 背景色を水色に設定
    renderer.setClearColor('#7DBDFF');

    return {  scene, camera, renderer };
};

export default createScene;