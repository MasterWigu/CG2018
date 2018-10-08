var controls;

class Scene extends THREE.Scene {


    createScene() {
        'use strict';
    
        this.add(new THREE.AxisHelper(10));
        
        this.mesa = new Table(0, 8, 0);
        this.add(this.mesa); 

        this.chair = new Chair(0, -6.25, 0);
        this.add(this.chair);

        this.lamp = new Lamp(16, -2, -6.5);
        this.add(this.lamp);

    }
    
    createCameras() {
        'use strict';
        this.activeCamera = 0;  //guarda qual a camara que estamos a usar (para o render)
        this.camera1 = new Camera(this, 0, 50, 0);
        this.camera2 = new Camera(this, 50, 0, 0);
        this.camera3 = new Camera(this, 0, 0, 50);


        //Camera temporaria movível
        this.camera0 = new THREE.PerspectiveCamera(70,
                                         window.innerWidth / window.innerHeight,
                                         1,
                                         100000000);
        this.camera0.position.x = 50;
        this.camera0.position.y = 50;
        this.camera0.position.z = 50;
        this.camera0.lookAt(this.position);

    }
    
    onResize() {
        'use strict';
    
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        
        if (window.innerHeight > 0 && window.innerWidth > 0) {
            this.camera0.aspect = window.innerWidth / window.innerHeight;
            this.camera0.updateProjectionMatrix();
        }
    
        this.camera1.update();
        this.camera2.update();
        this.camera3.update();

    }

    onKeyUp(e) {
        'use strict';
        this.chair.keyReleased(e.keyCode);
    }
    
    onKeyDown(e) {
        'use strict';
        this.chair.keyPressed(e.keyCode);
        switch (e.keyCode) {
        case 49:
            this.activeCamera = 1;
            break;
        case 50:
            this.activeCamera = 2;
            break;
        case 51:
            this.activeCamera = 3;
            break;
        case 52: //para camara movivel
            this.activeCamera = 0;
            break;


        case 65: //A
        case 97: //a
            this.traverse(function (node) {
                if (node instanceof THREE.Mesh) {
                    node.material.wireframe = !node.material.wireframe;
                }
            });
            break;
        case 83:  //S
        case 115: //s
            this.chair.resetPos();
            break;
        case 69:  //E
        case 101: //e
            this.traverse(function (node) {
                if (node instanceof THREE.AxisHelper) {
                    node.visible = !node.visible;
                }
            });
            break;
        }
    }
    
    render() {
        'use strict';
        if (this.activeCamera == 0)
            this.renderer.render(this, this.camera0); //camara movivel (apagar)
        if (this.activeCamera == 1)
            this.renderer.render(this, this.camera1);
        if (this.activeCamera == 2)
            this.renderer.render(this, this.camera2);
        if (this.activeCamera == 3)
            this.renderer.render(this, this.camera3);
    }
    
    constructor() {
        'use strict';

        super();
        this.background = new THREE.Color( 0xfff7c4 );

        this.renderer = new THREE.WebGLRenderer({
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
       

        this.createScene();
        this.createCameras();
        
        this.controls = new THREE.TrackballControls(this.camera0); //para a camara movivel
        
        this.render();
        
        window.addEventListener("keydown", this.onKeyDown.bind(this)); //tem de se usar o bind() por ser uma classe ou wtv, apenas sei que funciona assim
        window.addEventListener("keyup", this.onKeyUp.bind(this));
        window.addEventListener("resize", this.onResize.bind(this));
    }
    
    animate() {
        'use strict';
        
        this.chair.move();
        this.chair.renderMovement();
        this.render();
        this.controls.update(); //para a camara movivel (apagar)
        requestAnimationFrame(this.animate.bind(this));
    }
}
