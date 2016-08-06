var skyTex = THREE.ImageUtils.loadTexture('skywall.jpg');
var skyMat = new THREE.MeshPhongMaterial({ map:skyTex, });

Backwall = function(){
    var geom = new THREE.PlaneGeometry(3200, 3200, 32, 32);
    this.mesh = new THREE.Mesh(geom, skyMat);
    this.mesh.position.z -= 1600;
    this.mesh.position.y += 1600;
}

Leftwall = function(){
    var geom = new THREE.PlaneGeometry(3200, 3200, 32, 32);
    this.mesh = new THREE.Mesh(geom, skyMat);
    this.mesh.rotation.y = Math.PI/2;
    this.mesh.position.x -= 1600;
    this.mesh.position.y += 1600;
}

Rightwall = function(){
    var geom = new THREE.PlaneGeometry(3200, 3200, 32, 32);
    this.mesh = new THREE.Mesh(geom, skyMat);
    this.mesh.rotation.y = -Math.PI/2;
    this.mesh.position.x += 1600;
    this.mesh.position.y += 1600;
}

Skywall = function(){
    this.mesh = new THREE.Object3D();

    var backwall = new Backwall();
    this.mesh.add(backwall.mesh);

    var leftwall = new Leftwall();
    this.mesh.add(leftwall.mesh);

    var rightwall = new Rightwall();
    this.mesh.add(rightwall.mesh);

    var skylight = new SkyLight();
    skylight.mesh.position.y += 800;
    this.mesh.add(skylight.mesh);

}

function createSkywall(){
    var skywall = new Skywall();
    return skywall;
}