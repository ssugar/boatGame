UpLight = function(){
    this.mesh = new THREE.Object3D();
    var upLight = new THREE.PointLight(0xffffff, 1, 300);
    var lightGeom = new THREE.SphereGeometry(2, 16, 16);
    var lightMat = new THREE.MeshPhongMaterial({ 
        color:0xffff00, 
        shininess: 1000,
        shading:THREE.SmoothShading, 
    });
    lightSphere = new THREE.Mesh(lightGeom, lightMat);
    var lightAbove = new THREE.PointLight(0xffffff, 10, 5);
    lightAbove.position.y = 5;
    lightSphere.add(lightAbove);
    upLight.add(lightSphere);
    this.mesh.add(upLight);
}
