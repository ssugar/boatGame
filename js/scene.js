var stats = new Stats();
stats.showPanel( 0 );
document.body.appendChild(stats.dom);

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1500);

var renderer = new THREE.WebGLRenderer({alpha:true});
renderer.setSize( window.innerWidth, window.innerHeight);
renderer.setClearColor(0x0000ff, 0.6);
document.body.appendChild(renderer.domElement);

var ocean = createOcean();
scene.add(ocean.mesh);

var board = createBoard();
scene.add(board.mesh);

var boat = createBoat();
scene.add(boat.mesh);

camera.position.set( 0, 300, 800 );
camera.up = new THREE.Vector3(0,0,-1);
camera.lookAt(new THREE.Vector3(0,0,400));

var controls = new THREE.OrbitControls(camera, render.domElement);

var pointLight = new THREE.PointLight(0xffffff, 2, 0);
pointLight.position.set(0,400,1200);
//scene.add(pointLight);

function render(){
    requestAnimationFrame(render);
    stats.begin();
    ocean.ripple();
    boat.float();
    boat.moveBoat();
    renderer.render(scene, camera);
    stats.end();
}
render();
