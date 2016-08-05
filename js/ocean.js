Ocean = function(){
    var geom = new THREE.PlaneGeometry(3200, 3200, 200, 200);
    var l = geom.vertices.length;
    this.waves = [];
    for(var i=0;i<l; i++){
        var v = geom.vertices[i];
        this.waves.push({y:v.y,
                         x:v.x,
                         z:v.z,
                         ang:Math.random()*Math.PI*2,
                         amp:3 + Math.random()*5,
                         speed:0.016 + Math.random()*0.032
                        });
    };
    var mat = new THREE.MeshPhongMaterial({ 
        color:0x0000ff, 
        transparent:true, 
        opacity:.8, 
        shading:THREE.FlatShading, 
    });
    this.mesh = new THREE.Mesh(geom, mat);
    this.boundingBox = new THREE.BoundingBoxHelper(this.mesh); 
    this.mesh.rotation.x = -Math.PI/2;
    this.mesh.rotation.z = Math.PI/4;
    this.mesh.receiveShadow = true;
    this.boundingBox.update();
}

Ocean.prototype.ripple = function(){
    var verts = this.mesh.geometry.vertices;
    var l = verts.length;
    var modulusBy = 2;
    for (var i = 0; i < l; i++){
        if(i%modulusBy == 0){
            var v = verts[i];
            var w = this.waves[i];
            v.z = w.z + Math.cos(w.ang)*w.amp;
            w.ang += w.speed;
        }
    }
    this.mesh.geometry.verticesNeedUpdate=true;
}

function createOcean(){
    var ocean = new Ocean();
    return ocean;
}