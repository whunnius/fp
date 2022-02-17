import './style.css'

import * as THREE from 'three';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://unpkg.com/three@0.120.1/examples/jsm/controls/OrbitControls.js'
import { StereoEffect} from './StereoEffect.js'





const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

scene.add(camera);



renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight);
camera.position.set(0,0,0);
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;



const effect = new StereoEffect( renderer );
effect.setSize( window.innerWidth, window.innerHeight );
effect.render( scene, camera );

//window.addEventListener( 'resize', onWindowResize );

			





let materialArray = [];
let texture_ft = new THREE.TextureLoader().load( 'meadow_ft.jpg');
let texture_bk = new THREE.TextureLoader().load( 'meadow_bk.jpg');
let texture_up = new THREE.TextureLoader().load( 'meadow_up.jpg');
let texture_dn = new THREE.TextureLoader().load( 'meadow_dn.jpg');
let texture_rt = new THREE.TextureLoader().load( 'meadow_rt.jpg');
let texture_lf = new THREE.TextureLoader().load( 'meadow_lf.jpg');
  
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_ft }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_bk }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_up }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_dn }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_rt }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_lf }));
   
for (let i = 0; i < 6; i++)
  materialArray[i].side = THREE.BackSide;
   
let skyboxGeo = new THREE.BoxGeometry( 100, 100, 100);
let skybox = new THREE.Mesh( skyboxGeo, materialArray );
scene.add( skybox );


const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0,0,1000);
scene.add(pointLight);

const element = renderer.domElement;



const controls = new OrbitControls(camera, element);
controls.addEventListener('change', renderer);
controls.minDistance = 0;
controls.maxDistance = 1;

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  camera.position.z = t * 1;
  camera.position.x = t * 1;
  camera.rotation.y = t * 1;
}

document.body.onscroll = moveCamera;
moveCamera();

function animate(){
  requestAnimationFrame(animate);

  renderer.render(scene,camera);
  effect.render(scene, camera);
}

animate();