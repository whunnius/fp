//import './style.css'

import * as THREE from 'three';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://unpkg.com/three@0.120.1/examples/jsm/controls/OrbitControls.js'
import { StereoEffect} from './StereoEffect.js'
import { GUI } from 'dat.gui'


var pointer, raycaster;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

const plantTarget =[]
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

loader.load(
	'dandelion.gltf',
	( gltf ) => {
		// called when the resource is loaded
    var dand = gltf.scene;
        
    // var dandTemp =dand.clone(); 
    // dandTemp.scale.set(1,1,1);
    // dandTemp.position.set(-100,-2,-90)
    // scene.add(dandTemp);
    // plantTarget.push(dandTemp);

    for (var i = 0; i < 200; i+=40){
      for(var j = 0; j < 200; j+=40){

        var dandTemp =dand.clone(); 
        
        dandTemp.scale.set(1,1,1)
        
        dandTemp.position.z =-i
        dandTemp.position.y = -14
        dandTemp.position.x =-j
        scene.add( dandTemp );
        plantTarget.push(dandTemp);

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

loader.load(
	'fern.gltf',
	( gltf ) => {
		// called when the resource is loaded
    var fern = gltf.scene;

    for (var i = 0; i < 300; i+=30){
      for(var j = 0; j < 300; j+=30){

        var fernTemp =fern.clone(); 
        
        fernTemp.scale.set(1,1,1)
        fernTemp.position.z =i
        fernTemp.position.y = -14
        fernTemp.position.x =j
        scene.add( fernTemp );
        //plantTarget.add(fernTemp)

        fernTemp.position.z =-i
        fernTemp.position.y = -14
        fernTemp.position.x =-j
        scene.add( fernTemp );
        //plantTarget.add(fernTemp)

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
var text =
{
    Name: 'This plant very cool jaja',
    SciName: "Plant is located \nin prarie fields",
    Family: 'Very Gud Family',
    Subfamily: 'Very bad subFamily',
    Order: 'No Order :('
}
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


function plantIntersects() {
  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(plantTarget);
  //const intersects2 = raycaster.intersectObjects(targets);

  for (let i = 0; i < intersects.length; i++) {
    tick++;
    
    if(tick>=180 && tick>=1){
      plantFolder.close()
      //intersects[i].object.material.color.setHex( 0xff0000 );
      tick = 0;
    }
    
    else{
        //intersects[i].object.material.color.setHex( 0xffffff );
        text.Name = 'Dandelion'
        text.SciName = 'Taraxacum'
        text.Family= 'Asteracae'
        text.Subfamily= 'Cichorioideae'
        text.Order= 'Asterales'
        plantFolder.open()
    }
    
    
  }

  if(intersects.length == 0 && tick !=0){
    targets.forEach((targets)=>{
      //targets.material.color.setHex( 0xff0000 );
      plantFolder.close()
    })
    tick = 0;
  }
}

// document.body.onscroll = moveCamera;



function hoverSpheres() {
  raycaster.setFromCamera(pointer, camera);
  const intersects2 = raycaster.intersectObjects(targets);


  for (let i = 0; i < intersects2.length; i++) {

    tick++;
    
    if(tick>=180 && tick>=1){
      movePlayer(intersects2[i].object.position.x, intersects2[i].object.position.z);
      intersects2[i].object.material.color.setHex( 0xff0000 );
      tick = 0;
    }
    else{
      intersects2[i].object.material.color.setHex( 0xffffff );
    }
  }
  if(intersects2.length == 0 && tick !=0){
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


//text = new sampleText();
//setValue();

moveCamera();


const gui = new GUI({width:300})
const plantFolder = gui.addFolder('Plant Details')
plantFolder.add(text, 'Name').listen();
plantFolder.add(text, 'SciName').listen();
plantFolder.add(text, 'Family').listen();
plantFolder.add(text, 'Subfamily').listen();
plantFolder.add(text, 'Order').listen();


function animate(){
  
  requestAnimationFrame(animate);
  plantIntersects();
  hoverSpheres();
  effect.render(scene, camera);
  
}

animate();