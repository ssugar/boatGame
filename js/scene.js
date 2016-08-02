var stats = new Stats();
stats.showPanel( 0 );
document.body.appendChild(stats.dom);

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1500);

var joystick1	= new VirtualJoystick({
    container	: document.body,
    mouseSupport	: true,
    stationaryBase	: true,
    baseX		: 150,
    baseY		: 150,
    strokeStyle	: 'cyan',
    limitStickTravel: true,
    stickRadius	: 120		
});
joystick1.addEventListener('touchStartValidation', function(event){
    var touch	= event.changedTouches[0];
    if( touch.pageX >= window.innerWidth/2 )	return false;
    return true
});
joystick1.addEventListener('touchStart', function(){
    console.log("movement");
})

var joystick2	= new VirtualJoystick({
    container	: document.body,
    mouseSupport	: true,
    stationaryBase	: true,
    baseX		: window.innerWidth - 150,
    baseY		: 150,
    strokeStyle	: 'orange',
    limitStickTravel: true,
    stickRadius	: 120		
});
joystick2.addEventListener('touchStartValidation', function(event){
    var touch	= event.changedTouches[0];
    if( touch.pageX < window.innerWidth/2 )	return false;
    return true
});
joystick2.addEventListener('touchStart', function(){
    console.log("rotation");
})

var renderer = new THREE.WebGLRenderer({alpha:true});
renderer.setSize( window.innerWidth, window.innerHeight);
renderer.setClearColor(0x0000ff, 0.6);
var sceneCanvas = document.body.appendChild(renderer.domElement);
sceneCanvas.setAttribute("id", "sceneCanvas");

var ocean = createOcean();
scene.add(ocean.mesh);

var board = createBoard();
scene.add(board.mesh);

var boat = createBoat();
scene.add(boat.mesh);

camera.position.set( 0, 300, 800 );
camera.up = new THREE.Vector3(0,0,-1);
camera.lookAt(new THREE.Vector3(0,0,400));

//var controls = new THREE.OrbitControls(camera, render.domElement);

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
