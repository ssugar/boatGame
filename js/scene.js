var stats = new Stats();
stats.showPanel( 0 );
document.body.appendChild(stats.dom);

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1500);

var renderer = new THREE.WebGLRenderer({alpha:true});
renderer.setSize( window.innerWidth, window.innerHeight);
renderer.setClearColor(0x0000ff, 0.6);
var sceneCanvas = document.body.appendChild(renderer.domElement);
sceneCanvas.setAttribute("id", "sceneCanvas");

var ocean = createOcean();
scene.add(ocean.mesh);

var board = createBoard();
scene.add(board.mesh);
for(i=0;i<board.boundingBoxes.length;i++){
    //scene.add(board.boundingBoxes[i]);
}


var boat = createBoat();
scene.add(boat.mesh);
//scene.add(boat.boundingBox);

var joystick1	= new VirtualJoystick({
    container	: document.body,
    mouseSupport	: true,
    stationaryBase	: true,
    baseX		: 200,
    baseY		: 200,
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
    //console.log("movement");
})

var joystick2	= new VirtualJoystick({
    container	: document.body,
    mouseSupport	: true,
    stationaryBase	: true,
    baseX		: window.innerWidth - 200,
    baseY		: 200,
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
    //console.log("rotation");
})

camera.position.set( 0, 300, 800 );
camera.up = new THREE.Vector3(0,0,-1);
camera.lookAt(new THREE.Vector3(0,0,400));

var lastBoatPositionX = boat.mesh.position.x;
var lastBoatPositionZ = boat.mesh.position.z;
camera.position.set( boat.mesh.position.x, +boat.mesh.position.y + 300, +boat.mesh.position.z +500 );
camera.lookAt(boat.mesh.position);

function render(){
    requestAnimationFrame(render);
    stats.begin();
    ocean.ripple();
    boat.float();
    boat.moveBoat( +joystick1.deltaX(), +joystick1.deltaY(), +joystick1.angle(), board.mesh, board.boundingBoxes );
    boat.rotateBoat( +joystick2.deltaX(), +joystick2.deltaY(), +joystick2.angle() );
    //only move camera if boat position has changed
    if(lastBoatPositionX != boat.mesh.position.x || lastBoatPositionZ != boat.mesh.position.z){
        camera.position.set( boat.mesh.position.x, +boat.mesh.position.y + 300, +boat.mesh.position.z +500 );
        camera.lookAt(boat.mesh.position);
        lastBoatPositionX = boat.mesh.position.x;
        lastBoatPositionZ = boat.mesh.position.z;
    }
    renderer.render(scene, camera);
    stats.end();
}
render();
