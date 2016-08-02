var blockTex = THREE.ImageUtils.loadTexture('block.jpg');
var blockMat = new THREE.MeshPhongMaterial({ map:blockTex, });

BoardPiece = function(){
    var geom = new THREE.BoxGeometry(50, 50, 50);
    var mat = new THREE.MeshPhongMaterial({ 
        color:0xffffff, 
        shading:THREE.FlatShading, 
    });
    this.mesh = new THREE.Mesh(geom, blockMat);
    //this.mesh.scale.y = 0.1;
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
}

Board = function(){
    this.mesh = new THREE.Object3D();
    var numBoardPieces = 100;
    this.boardWidth = 10;
    this.boardHeight = 10;
    for(var i=0;i<numBoardPieces; i++){
        var boardPiece = new BoardPiece();
        boardPiece.mesh.position.x = i%this.boardWidth*50;
        boardPiece.mesh.position.z = Math.floor(i/this.boardWidth)*50;
        //only add the outside boxes to the board
        if(i < this.boardWidth || i > numBoardPieces - this.boardWidth || i%this.boardWidth == 0 || i%this.boardWidth == 9){
            if(i >= 93 && i <= 95){  //make a hole for the boat to go out
                //skip block creation
            } else if (i == 0 || i == 9 || i == 92 || i == 96) {
                var lightPoleGeom = new THREE.BoxGeometry(5, 70, 5);
                var lightPoleMat = new THREE.MeshPhongMaterial({ 
                    color:0x0000000, 
                    shininess: 500,
                    shading:THREE.SmoothShading, 
                });
                /*lightPoleMesh = new THREE.Mesh(lightPoleGeom, lightPoleMat);
                lightPoleMesh.position.y = 20;
                boardPiece.mesh.add(lightPoleMesh);
                var blockLight = new UpLight();
                blockLight.mesh.position.y = 55;
                boardPiece.mesh.add(blockLight.mesh);*/
                this.mesh.add(boardPiece.mesh);
            } else {
                this.mesh.add(boardPiece.mesh);
            }

        }
    };
    //set position and rotation of the whole board
    this.mesh.position.x = -300;
    this.mesh.position.y = 10;
    this.mesh.position.z = 300;
    this.mesh.rotation.y = Math.PI/4;
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
}

function createBoard(){
    var board = new Board();
    return board;
}