YachtBody = function(){
    var geom = new THREE.BoxGeometry(165, 25, 40);
    var mat = new THREE.MeshPhongMaterial({ 
        color:0x777777, 
        shading:THREE.SmoothShading, 
    });
    var l = geom.vertices.length;
    this.points = [];
    for(var i=0;i<l; i++){
        var v = geom.vertices[i];
        if(i == 4 || i == 5){
            v.x += 25;
        }
        if(i == 2){
            v.z -= 15;
        }else if(i == 3){
            v.z += 15;
        }
        if(i == 0){
            v.z += 1;
        }else if(i == 1){
            v.z -= 1;
        }
        this.points.push({x:v.x,
                          y:v.y,           
                          z:v.z});
        console.log(i + " " + v.x + " " + v.y + " " + v.z);
    }
    this.mesh = new THREE.Mesh(geom, mat);
}

YachtFront = function(){
    var geom = new THREE.CylinderGeometry(25, 20, 25, 3, 4);
    var mat = new THREE.MeshPhongMaterial({ 
        color:0x777777, 
        shading:THREE.SmoothShading, 
    });
    var l = geom.vertices.length;
    this.points = [];
    for(var i=0;i<l; i++){
        var v = geom.vertices[i];
        if(i == 0){
            v.z -= 5;
        }
        if(i == 1){
            v.x += 3;
        }else if(i == 2){
            v.x -= 3;
        }
        this.points.push({x:v.x,
                          y:v.y,           
                          z:v.z});
        console.log(i + " " + v.x + " " + v.y + " " + v.z);
    }
    this.mesh = new THREE.Mesh(geom, mat);

    var boatFrontLight = new UpLight(0xffff00);
    boatFrontLight.mesh.position.y = 14;
    boatFrontLight.mesh.position.z = 20;
    this.mesh.add(boatFrontLight.mesh);
    this.mesh.rotation.y = Math.PI/2;
}

YachtTopFront = function(){
    var geom = new THREE.CylinderGeometry(25, 20, 25, 3, 4);
    var mat = new THREE.MeshPhongMaterial({ 
        color:0x777777, 
        shading:THREE.SmoothShading, 
    });

    var l = geom.vertices.length;
    this.points = [];
    for(var i=0;i<l; i++){
        var v = geom.vertices[i];
        if(i == 0){
            v.z += 30;
        }
        if(i == 12 ){
            v.y += 20;
        }
        this.points.push({x:v.x,
                          y:v.y,           
                          z:v.z});
    }
    geom.computeVertexNormals();
    geom.computeFaceNormals();
    this.mesh = new THREE.Mesh(geom, mat);
    this.mesh.position.y += 25;
    this.mesh.rotation.x = Math.PI/2;
    this.mesh.rotation.y = Math.PI/2;
    this.mesh.rotation.z = Math.PI/2;
}

YachtTopBack = function(){
    var geom = new THREE.BoxGeometry(100, 25, 40);
    var mat = new THREE.MeshPhongMaterial({ 
        color:0x777777, 
        shading:THREE.SmoothShading, 
    });
    var l = geom.vertices.length;
    this.points = [];
    for(var i=0;i<l; i++){
        var v = geom.vertices[i];
        if(i == 4 || i == 5){
            v.y -= 15;
            v.x += 25;
        }
        if(i == 4){
            v.z += 10;
        }else if(i == 5){
            v.z -= 10;
        }
        if(i == 6){
            v.z += 5;
        }else if(i == 7){
            v.z -= 5;
        }
        if(i == 0){
            v.y -= 2;
            v.z -= 3;
        }else if(i == 1){
            v.y -= 2;
            v.z += 3;
        }
        this.points.push({x:v.x,
                          y:v.y,           
                          z:v.z});
    }
    this.mesh = new THREE.Mesh(geom, mat);
    var boatBlueLight = new UpLight(0x0000ff);
    boatBlueLight.mesh.position.x = -42.5;
    boatBlueLight.mesh.position.y = -12.5;
    boatBlueLight.mesh.position.z = 18;
    this.mesh.add(boatBlueLight.mesh);
    var boatRedLight = new UpLight(0xff0000);
    boatRedLight.mesh.position.x = -42.5;
    boatRedLight.mesh.position.y = -12.5;
    boatRedLight.mesh.position.z = -18;
    this.mesh.add(boatRedLight.mesh);
    this.mesh.position.y += 25;
}


Yacht = function(){
    this.mesh = new THREE.Object3D();
    this.floatCounter = 0;

    var yachtBody = new YachtBody();
    this.mesh.add(yachtBody.mesh);

    var yachtFront = new YachtFront();
    yachtFront.mesh.position.x += 90;
    this.mesh.add(yachtFront.mesh);

    var yachtTopFront = new YachtTopFront();
    yachtTopFront.mesh.position.x += 50;
    this.mesh.add(yachtTopFront.mesh);

    var yachtTopBack = new YachtTopBack();
    yachtTopBack.mesh.position.x -= 10;
    this.mesh.add(yachtTopBack.mesh);

    this.mesh.position.z = 380;

    this.boundingBox = new THREE.BoundingBoxHelper(this.mesh);
    this.boundingBox.update();

    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
}

Yacht.prototype.float = function(){
    this.mesh.position.y = Math.sin(this.floatCounter)*4; 
    this.floatCounter += 0.01;
}

Yacht.prototype.getRotation = function(){
    var boatRotation = this.mesh.rotation.y;
    boatRotation *= 180/Math.PI;
    boatRotation = boatRotation%360;
    if(boatRotation < 0){boatRotation += 360}
    return boatRotation;
}

Yacht.prototype.determineSpeed = function(joystickAngle){
        var boatRotation = this.getRotation();
        var angDifference = 180 - Math.abs(Math.abs(joystickAngle - boatRotation) - 180);
        if(angDifference <= 5 ){
            return 16;
        } else if(angDifference <= 20 ){
            return 6;
        } else if(angDifference <= 50) {
            return 1;
        } else {
            return 0.5;
        }
}

Yacht.prototype.moveBoundingBoxNextPos = function(dx, dz){
    this.boundingBox.position.x += dx;
    this.boundingBox.position.z += dz;
}

Yacht.prototype.detectCollision = function(boardPieces){
    for(i=0;i<boardPieces.length;i++){
        boardPieces[i].update();
        var currentPos = new THREE.Vector3(this.boundingBox.position.x, 0, this.boundingBox.position.z);
        collision = boardPieces[i].box.distanceToPoint(currentPos);
        if(collision < 60){ return true; }
    }
    return false;
}

Yacht.prototype.confirmOnOcean = function(oceanBoundingBox) {
    oceanBoundingBox.update();
    var currentPos = new THREE.Vector3(this.boundingBox.position.x, 0, this.boundingBox.position.z);
    oceanContains = oceanBoundingBox.box.distanceToPoint(currentPos);
    if(oceanContains == 0) { return true; } else { return false; }
}

Yacht.prototype.moveBoat = function(dx, dz, joystickAngle, boardPieces, oceanBoundingBox){
    if(dx != 0 || dz != 0){  //only work if there is joystick movement detected
        var speedMultiplier = this.determineSpeed(joystickAngle);
        this.boundingBox.update();
        this.moveBoundingBoxNextPos(dx*0.005*speedMultiplier, dz*0.005*speedMultiplier);
        var collision = this.detectCollision(boardPieces);
        var onOcean = this.confirmOnOcean(oceanBoundingBox);
        if(collision == false && onOcean == true) {
            this.mesh.position.x += dx*0.005*speedMultiplier; 
            this.mesh.position.z += dz*0.005*speedMultiplier; 
            this.boundingBox.update();
        } else {
            this.boundingBox.update();
        }
    }
}

Yacht.prototype.rotateBoat = function(dx, dz, joystickAngle){
    if(dx != 0 || dz != 0){  //only work if there is joystick movement detected
        var joystickRadians = joystickAngle * Math.PI/180;
        this.mesh.rotation.y = joystickRadians;
        this.boundingBox.update();
    }
}

function createYacht(){
    var yacht = new Yacht();
    return yacht;
}