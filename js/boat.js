MainBody = function(){
    var geom = new THREE.BoxGeometry(100, 25, 40);
    var mat = new THREE.MeshPhongMaterial({ 
        color:0x777777, 
        shading:THREE.SmoothShading, 
    });
    this.mesh = new THREE.Mesh(geom, mat);
}

UpperBody = function(){
    var geom = new THREE.BoxGeometry(60, 20, 30);
    var mat = new THREE.MeshPhongMaterial({ 
        color:0x808080, 
        shininess: 500,
        shading:THREE.SmoothShading, 
    });
    this.mesh = new THREE.Mesh(geom, mat);
}

FrontBody = function(){
    var geom = new THREE.CylinderGeometry(25, 20, 25, 3, 4);
    var mat = new THREE.MeshPhongMaterial({ 
        color:0x777777, 
        shading:THREE.SmoothShading, 
    });
    this.mesh = new THREE.Mesh(geom, mat);
    var boatFrontLight = new UpLight();
    boatFrontLight.mesh.position.y = 14;
    boatFrontLight.mesh.position.z = 20;
    this.mesh.add(boatFrontLight.mesh);
    this.mesh.rotation.y = Math.PI/2;
}

BackBody = function(){
    var geom = new THREE.CylinderGeometry(25, 20, 25, 3, 4);
    var mat = new THREE.MeshPhongMaterial({ 
        color:0x777777, 
        shading:THREE.SmoothShading, 
    });
    this.mesh = new THREE.Mesh(geom, mat);
    var boatBackLight = new UpLight();
    boatBackLight.mesh.position.y = 14;
    boatBackLight.mesh.position.z = 20;
    this.mesh.add(boatBackLight.mesh);
    this.mesh.rotation.y = Math.PI*1.5;
}

FlagPole = function(){
    var geom = new THREE.BoxGeometry(5, 70, 5);
    var mat = new THREE.MeshPhongMaterial({ 
        color:0x0000000, 
        shininess: 500,
        shading:THREE.SmoothShading, 
    });
    this.mesh = new THREE.Mesh(geom, mat);
}

Flag = function(){
    var geom = new THREE.CylinderGeometry(20, 20, 5, 3, 4);
    var mat = new THREE.MeshPhongMaterial({ 
        color:0x550000, 
        shininess: 500,
        shading:THREE.SmoothShading, 
    });
    this.mesh = new THREE.Mesh(geom, mat);
    this.mesh.position.x = 13;
    this.mesh.rotation.x = Math.PI/2;
    this.mesh.rotation.y = Math.PI/2;
}

Boat = function(){
    this.mesh = new THREE.Object3D();
    this.floatCounter = 0;

    var mainBody = new MainBody();
    this.mesh.add(mainBody.mesh);

    var upperBody = new UpperBody();
    upperBody.mesh.position.y = 12.5;
    this.mesh.add(upperBody.mesh);

    var frontBody = new FrontBody();
    frontBody.mesh.position.x = 60;
    this.mesh.add(frontBody.mesh);

    var backBody = new BackBody();
    backBody.mesh.position.x = -60;
    this.mesh.add(backBody.mesh);

    var flagPole = new FlagPole();
    flagPole.mesh.position.y = 50;
    this.mesh.add(flagPole.mesh);

    var flag = new Flag();
    flag.mesh.position.y = 70;
    this.mesh.add(flag.mesh);

    this.mesh.position.z = 320;

    this.boundingBox = new THREE.BoundingBoxHelper(this.mesh);
    this.boundingBox.update();

    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
}

Boat.prototype.float = function(){
    this.mesh.position.y = Math.sin(this.floatCounter)*4; 
    this.floatCounter += 0.01;
}

Boat.prototype.getRotation = function(){
    var boatRotation = this.mesh.rotation.y;
    boatRotation *= 180/Math.PI;
    boatRotation = boatRotation%360;
    if(boatRotation < 0){boatRotation += 360}
    return boatRotation;
}

Boat.prototype.determineSpeed = function(joystickAngle){
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

Boat.prototype.detectCollision = function(dx, dz, boardMesh, boardPieces){
    this.boundingBox.position.x += dx;
    this.boundingBox.position.z += dz;
    this.boundingBox.update();
    for(i=0;i<boardPieces.length;i++){
        boardPieces[i].update();
        collision = this.boundingBox.box.intersectsBox(boardPieces[i].box);
        if(collision){
            this.boundingBox.position.x -= dx;
            this.boundingBox.position.z -= dz;
            this.boundingBox.update();
            return true;
        }
    }
    return false;
}

Boat.prototype.moveBoat = function(dx, dz, joystickAngle, boardMesh, boardPieces){
    if(dx != 0 || dz != 0){  //only work if there is joystick movement detected
        var speedMultiplier = this.determineSpeed(joystickAngle);
        var collision = this.detectCollision(dx*0.005*speedMultiplier, dz*0.005*speedMultiplier, boardMesh, boardPieces);
        if(collision == false){
            this.mesh.position.x += dx*0.005*speedMultiplier; 
            this.mesh.position.z += dz*0.005*speedMultiplier; 
            this.boundingBox.update();
        }
    }
}

Boat.prototype.rotateBoat = function(dx, dz, joystickAngle){
    if(dx != 0 || dz != 0){  //only work if there is joystick movement detected
        var joystickRadians = joystickAngle * Math.PI/180;
        this.mesh.rotation.y = joystickRadians;
        this.boundingBox.update();
    }
}

function createBoat(){
    var boat = new Boat();
    return boat;
}