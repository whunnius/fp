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

camera.position.setZ(60);



const loader = new GLTFLoader();
loader.load(
	'grass1.gltf',
	( gltf ) => {
		// called when the resource is loaded
    var grass = gltf.scene;

    for (var i = 0; i < 1000; i+=30){

      var grassTemp =grass.clone(); 
      
      grassTemp.scale.set(1,1,1)
      grassTemp.position.z =i
      grassTemp.position.y = -10
      grassTemp.position.x =i
      scene.add( grassTemp );
      
      grassTemp.position.z =-i
      grassTemp.position.y = -10
      grassTemp.position.x =-i
      scene.add( grassTemp );

      grassTemp.position.z =i
      grassTemp.position.y = -10
      grassTemp.position.x =-i
      scene.add( grassTemp );

      grassTemp.position.z =-i
      grassTemp.position.y = -10
      grassTemp.position.x =i
      scene.add( grassTemp );
    }
		
	},
	( xhr ) => {
		// called while loading is progressing
		console.log( `${( xhr.loaded / xhr.total * 100 )}% loaded` );
	},
	( error ) => {
		// called when loading has errors
		console.error( 'An error happened', error );
	},
);

scene.add(camera);
camera.position.set(0,0,0);

const effect = new StereoEffect( renderer );
effect.setSize( window.innerWidth, window.innerHeight );
effect.render( scene, camera );

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
pointLight.position.set(0,0,0);
scene.add(pointLight);

const element = renderer.domElement;



const controls = new OrbitControls(camera, element);
// controls.addEventListener('change', renderer);
controls.minDistance = 0;
controls.maxDistance = 1;

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  camera.position.z = t * 1;
  camera.position.x = t * 1;
  camera.rotation.y = t * 1;
}

// document.body.onscroll = moveCamera;

moveCamera();
function animate(){
  
  requestAnimationFrame(animate);

  //renderer.render(scene,camera);
  effect.render(scene, camera);
}

animate();