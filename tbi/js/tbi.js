init();

function init() {
    createScene();
    loadHelmet();
    drawArrows();
}

function createScene() {
    // Get the canvas wrapper initial size
    getSizes();

    // Setup scene
    scene = new THREE.Scene();

    // Setup camera
    camera = new THREE.PerspectiveCamera(
        75,
        sizes.width / sizes.height,
        0.1,
        1000
    );

    // Setup Renderer
    renderer = new THREE.WebGLRenderer();
    renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(sizes.width, sizes.height);

    document.querySelector(".canvas-wrapper").appendChild(renderer.domElement);

    // Detect window resizing and resize canvas
    window.addEventListener("resize", setCanvasSize, false);

    // Turn on the lights
    var light = new THREE.AmbientLight(0xffffff); // soft white light
    scene.add(light);

    var directionalLight = new THREE.DirectionalLight(0xffffff, 0.1);
    directionalLight.position.set(0, 100, 0);
    scene.add(directionalLight);

    // Setup Orbit Controls
    var controls = new THREE.OrbitControls(camera);
    camera.position.set(40, 40, 40);
    controls.update();

    // Add axes helper
    var axesHelper = new THREE.AxesHelper(100);
    scene.add(axesHelper);

    // Render the canvas
    var animate = function() {
        requestAnimationFrame(animate);

        controls.update();

        renderer.render(scene, camera);
    };
    animate();
}

function loadHelmet() {
    // Init a loader
    var loader = new THREE.GLTFLoader();

    // Load a glTF resource
    loader.load(
        "../models/helmet/scene.gltf",
        function(gltf) {
            // Adjust helmet y position
            gltf.scene.position.set(0, -17, 0);

            scene.add(gltf.scene);
        },
        function(xhr) {
            console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        },
        function(error) {
            console.log(error);
        }
    );
}

function drawArrows() {
    // φ = azimuth
    // θ = elevation
    // ρ = radius

    // for (azi = 0; azi < 36; azi++) {
    //     var azimuth = start_azimuth + azi * 10;

    //     for (ele = 0; ele < 18; ele++) {
    //         var elevation = start_elevation + ele * 10;
    //         console.log(elevation);

    //         var x =
    //             radius *
    //             Math.sin(elevation * 0.0174533) *
    //             Math.cos(azimuth * 0.0174533);
    //         var z =
    //             radius *
    //             Math.sin(elevation * 0.0174533) *
    //             Math.sin(azimuth * 0.0174533);
    //         var y = radius * Math.cos(elevation * 0.0174533);

    //         // var geometry = new THREE.Geometry();
    //         // geometry.vertices.push(
    //         //     new THREE.Vector3(x * 0.95, y * 0.95, z * 0.95)
    //         // );
    //         // geometry.vertices.push(new THREE.Vector3(x, y, z));

    //         // var material = new THREE.LineBasicMaterial({ color: 0xff00ff });
    //         // var line = new THREE.Line(geometry, material);

    //         // scene.add(line);

    //         var geometry = new THREE.ConeGeometry(1, 3, 5);
    //         var material = new THREE.MeshBasicMaterial({ color: 0xff00ff });
    //         var cone = new THREE.Mesh(geometry, material);
    //         cone.rotation.set(90, 0, 0);
    //         cone.position.set(x, y, z);

    //         scene.add(cone);
    //     }
    // }

    var radius = 30;
    var start_azimuth = -175;
    var start_elevation = 0;

    for (azi = 0; azi < 36; azi++) {
        var azimuth = start_azimuth + azi * 0.174533;

        for (ele = 0; ele < 18; ele++) {
            var elevation = start_elevation + ele * 0.174533;

            console.log(start_azimuth + azi * 10, start_elevation + ele * 10);

            var geometry = new THREE.ConeGeometry(0.5, 2, 6);
            var material = new THREE.MeshBasicMaterial({ color: 0xff00ff });
            var cone = new THREE.Mesh(geometry, material);
            cone.rotation.set(0, 0, elevation);

            scene.add(cone);

            geometry.translate(0, 30, 0);
        }

        // cone.translateZ = 30;
    }
}

function getSizes() {
    // Get the size of the canvas wrapper
    sizes = document.querySelector(".canvas-wrapper").getBoundingClientRect();
}

function setCanvasSize() {
    getSizes();

    // Set the size of the canvas to fill the .brain-wrapper
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
}
