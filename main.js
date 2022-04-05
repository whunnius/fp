

import 'style.css'

import * as THREE from 'three';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://unpkg.com/three@0.120.1/examples/jsm/controls/OrbitControls.js'
import { StereoEffect} from './StereoEffect.js'


var pointer, raycaster;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

pointer = new THREE.Vector2();
pointer.x = 0
pointer.y = 0
raycaster = new THREE.Raycaster();

const element = renderer.domElement;

//camera.position.set( 100, 0, 100 );
const controls = new OrbitControls(camera, element);
// controls.addEventListener('change', renderer);
controls.target.set(-100,0,-100);
controls.enableZoom = false;
controls.minDistance = 1;
controls.maxDistance = 1;


controls.update();


//How objects get loaded into 
const loader = new GLTFLoader();
loader.load(
	'grass1.gltf',
	( gltf ) => {
		// called when the resource is loaded
    var grass = gltf.scene;

    for (var i = 0; i < 300; i+=40){
      for(var j = 0; j < 300; j+=40){

        var grassTemp =grass.clone(); 
        
        grassTemp.scale.set(1,1,1)
        grassTemp.position.z =i
        grassTemp.position.y = -14
        grassTemp.position.x =j
        scene.add( grassTemp );
        
        grassTemp.position.z =-i
        grassTemp.position.y = -14
        grassTemp.position.x =-j
        scene.add( grassTemp );

        }

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



const effect = new StereoEffect( renderer );
effect.setSize( window.innerWidth, window.innerHeight );
effect.render( scene, camera );

// Loading images into VR environment
let materialArray = [];
let texture_ft = new THREE.TextureLoader().load( 'meadow_ft.jpg');
let texture_bk = new THREE.TextureLoader().load( 'meadow_bk.jpg');
let texture_up = new THREE.TextureLoader().load( 'meadow_up.jpg');
let texture_dn = new THREE.TextureLoader().load( 'meadow_dn.jpg');
let texture_rt = new THREE.TextureLoader().load( 'meadow_rt.jpg');
let texture_lf = new THREE.TextureLoader().load( 'meadow_lf.jpg');

//Overlapping mesh objects with textures  
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_ft }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_bk }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_up }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_dn }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_rt }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_lf }));
   
for (let i = 0; i < 6; i++)
  materialArray[i].side = THREE.BackSide;
   
let skyboxGeo = new THREE.BoxGeometry( 1000, 1000, 1000);
let skybox = new THREE.Mesh( skyboxGeo, materialArray );
scene.add( skybox );


const pointLight = new THREE.PointLight(0xffffff,1.2);
pointLight.position.set(-100,0,-100);
scene.add(pointLight);

const pointLight2 = new THREE.PointLight(0xffffff,1.2);
pointLight2.position.set(0,0,0);
scene.add(pointLight2);

const pointLight3 = new THREE.PointLight(0xffffff,1.2);
pointLight3.position.set(-200,0,-200);
scene.add(pointLight3);

const pointLight4 = new THREE.PointLight(0xffffff,1.2);
pointLight4.position.set(-300,0,-300);
scene.add(pointLight4);

//Creating Red dot objects to point and move to
const targets = []

const target1 = new THREE.Mesh(
  new THREE.SphereGeometry(0.25),
  new THREE.MeshLambertMaterial({color:'red'})
)
target1.position.set(-100,-2,-110)
targets.push(target1)

const target2 = new THREE.Mesh(
  new THREE.SphereGeometry(0.25),
  new THREE.MeshLambertMaterial({color:'red'})
)
target2.position.set(-110,-2,-100)
targets.push(target2)

const target3 = new THREE.Mesh(
  new THREE.SphereGeometry(0.25),
  new THREE.MeshLambertMaterial({color:'red'})
)
target3.position.set(-90,-2,-100)
targets.push(target3)

const target4 = new THREE.Mesh(
  new THREE.SphereGeometry(0.25),
  new THREE.MeshLambertMaterial({color:'red'})
)
target4.position.set(-100,-2,-90)
targets.push(target4)

targets.forEach((target)=>{
  scene.add(target)
})

var reticle = new THREE.Mesh(
  new THREE.BoxGeometry( 0.01, 0.01, 0.01 ),
  new THREE.MeshBasicMaterial( {color: 0xffffff, blending: THREE.AdditiveBlending, side: THREE.DoubleSide })
);
reticle.position.z = -1;
reticle.lookAt(camera.position);
camera.add(reticle);
scene.add(camera);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  camera.position.z = t * 1;
  camera.position.x = t * 1;
  camera.rotation.y = t * 1;
}

var tick = 0;



// document.body.onscroll = moveCamera;

function hoverSpheres() {
  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(targets);


  for (let i = 0; i < intersects.length; i++) {

    tick++;
    
    if(tick>=180 && tick >= 1){
      movePlayer(intersects[i].object.position.x, intersects[i].object.position.z);
      intersects[i].object.material.color.setHex( 0xff0000 );
      
      tick = 0;
    }
    else{
      intersects[i].object.material.color.setHex( 0xffffff );
      
    }
  }
  if(intersects.length == 0 && tick !=0){
    targets.forEach((target)=>{
      target.material.color.setHex( 0xff0000 );
    })
    tick = 0;
  }
}

function movePlayer( x, z ) {
  controls.target.set( x, 0, z );
  target1.position.set( x, -2, z - 10 );
  target2.position.set( x - 10, -2, z );
  target3.position.set( x + 10, -2, z );
  target4.position.set( x, -2, z + 10 );
}

moveCamera();
function animate(){
  
  requestAnimationFrame(animate);
  hoverSpheres();
  effect.render(scene, camera);
  
}

animate();
