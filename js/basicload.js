/**
 * Created by gxp on 2015/12/2.
 */

function createScene(){
    this.canvas = document.getElementById('renderCanvas');
    this.engine = new BABYLON.Engine(this.canvas , true);

    this.engine.runRenderLoop(function(){
        this.scene.render();
    });
    this.scene = new BABYLON.Scene(engine);

    //var camera = new BABYLON.ArcRotateCamera("Camera", 3 * Math.PI / 2, Math.PI / 8, 50, BABYLON.Vector3.Zero(), scene);
    this.camera = new BABYLON.ArcRotateCamera("Camera", 0,0,0, BABYLON.Vector3.Zero(), this.scene);
    this.camera.setPosition(new BABYLON.Vector3(0,150,-300));
    //var camera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(0,10,-35), scene);
    this.camera.attachControl(this.canvas, false);

    this.light = new BABYLON.HemisphericLight("Hemi0", new BABYLON.Vector3(0, 1, 0), this.scene);
    this.light.diffuse = new BABYLON.Color3(1, 1, 1);
    this.light.specular = new BABYLON.Color3(1, 1, 1);
    this.light.groundColor = new BABYLON.Color3(0, 0, 0);
    this.light.setEnabled(1);

    addGridHelper();

    return this.scene;
}

function loadWatership(){
    var loader = new BABYLON.AssetsManager(scene);

    var position = -5;
    var pos = function(t) {
        t.loadedMeshes.forEach(function(m) {
            m.position.x -= position;
        });
        position += 5;
    };

    var bane = loader.addMeshTask("bane", "", "./assets/", "sphere.obj");
    bane.onSuccess = pos;

    loader.load();

}

function addBox() {
    //Creation of a box
    //(name of the box, size, scene)
    var box = BABYLON.Mesh.CreateBox("box", 6.0, this.scene);
    //var material1 = new BABYLON.StandardMaterial("texture1", scene);
    //material1.diffuseTexture = new BABYLON.Texture("KIEfs.jpg", scene);
    //box.material = material1;

    //console.log("sssss");
    box.position = getRandomPosition();   // Using a vector

}

function addSphere(){
    //Creation of a sphere
    //(name of the sphere, segments, diameter, scene)
    var sphere = BABYLON.Mesh.CreateSphere("sphere", 10.0, 10.0, scene);

    sphere.position = getRandomPosition(); // Using a vector
}

function addPlane(){
    //Creation of a plane
    //(name of the plane, size, scene)
    var plane = BABYLON.Mesh.CreatePlane("plane", 10.0, scene);

    plane.position = getRandomPosition();                  // Using a single coordinate component
}

function addCylinder(){
    //Creation of a cylinder
    //(name, height, diamTop, diamBottom, tessellation, [optional height subdivs], scene, updatable)
    var cylinder = BABYLON.Mesh.CreateCylinder("cylinder", 3, 3, 6, 3, 1, scene, false);

    cylinder.position =getRandomPosition();
}

function addTorus(){
    // Creation of a torus
    // (name, diameter, thickness, tessellation, scene, updatable)
    var torus = BABYLON.Mesh.CreateTorus("torus", 5, 1, 10, scene, false);

    torus.position  = getRandomPosition();
}

function addKnot(){
    // Creation of a knot
    // (name, radius, tube, radialSegments, tubularSegments, p, q, scene, updatable)
    var knot = BABYLON.Mesh.CreateTorusKnot("knot", 2, 0.5, 128, 64, 2, 3, scene);
    knot.position = getRandomPosition();
}

function addLines(){
    // Creation of a lines mesh
    var lines = BABYLON.Mesh.CreateLines("lines", [
        new BABYLON.Vector3(-10, 0, 0),
        new BABYLON.Vector3(10, 0, 0),
        new BABYLON.Vector3(0, 0, -10),
        new BABYLON.Vector3(0, 0, 10)
    ], scene);
}

function addAll(){
    //Creation of a box
    //(name of the box, size, scene)
    var box = BABYLON.Mesh.CreateBox("box", 6.0, scene);
    var material1 = new BABYLON.StandardMaterial("texture1", scene);
    material1.diffuseTexture = new BABYLON.Texture("KIEfs.jpg", scene);
    box.material = material1;

    box.position = new BABYLON.Vector3(-10, 0, 0);   // Using a vector
    //Creation of a sphere
    //(name of the sphere, segments, diameter, scene)
    var sphere = BABYLON.Mesh.CreateSphere("sphere", 10.0, 10.0, scene);

    sphere.position = new BABYLON.Vector3(0, 10, 0); // Using a vector
    //Creation of a plane
    //(name of the plane, size, scene)
    var plane = BABYLON.Mesh.CreatePlane("plane", 10.0, scene);

    plane.position.z = 10;                  // Using a single coordinate component
    //Creation of a cylinder
    //(name, height, diamTop, diamBottom, tessellation, [optional height subdivs], scene, updatable)
    var cylinder = BABYLON.Mesh.CreateCylinder("cylinder", 3, 3, 6, 3, 1, scene, false);

    cylinder.position.z = -10;
    // Creation of a torus
    // (name, diameter, thickness, tessellation, scene, updatable)
    var torus = BABYLON.Mesh.CreateTorus("torus", 5, 1, 10, scene, false);

    torus.position.x = 10;
    // Creation of a knot
    // (name, radius, tube, radialSegments, tubularSegments, p, q, scene, updatable)
    var knot = BABYLON.Mesh.CreateTorusKnot("knot", 2, 0.5, 128, 64, 2, 3, scene);
    knot.position.y = -10;

    // Creation of a lines mesh
    var lines = BABYLON.Mesh.CreateLines("lines", [
        new BABYLON.Vector3(-10, 0, 0),
        new BABYLON.Vector3(10, 0, 0),
        new BABYLON.Vector3(0, 0, -10),
        new BABYLON.Vector3(0, 0, 10)
    ], scene);
}

function addGridHelper(){

    for (var i= 0;i<16;i++){
        var lines = BABYLON.Mesh.CreateLines("lines", [
            new BABYLON.Vector3(-150, 0, i*10),
            new BABYLON.Vector3(150, 0, i*10)
        ], this.scene);

        var lines = BABYLON.Mesh.CreateLines("lines", [
            new BABYLON.Vector3(-150, 0, -i*10),
            new BABYLON.Vector3(150, 0, -i*10)
        ], this.scene);

        var lines = BABYLON.Mesh.CreateLines("lines", [
            new BABYLON.Vector3(i*10, 0, -150),
            new BABYLON.Vector3(i*10, 0, 150)
        ], this.scene);

        var lines = BABYLON.Mesh.CreateLines("lines", [
            new BABYLON.Vector3(-i*10, 0, -150),
            new BABYLON.Vector3(-i*10, 0, 150)
        ], this.scene);
    }
}

function getRandomPosition(){
    var x = Math.ceil(Math.random()*300) - 150;
    var y = Math.ceil(Math.random()*50);
    var z = Math.ceil(Math.random()*300) - 150;
    var  vec = new BABYLON.Vector3(x,y,z);
    console.log(x,y,z);
    return vec;
}


