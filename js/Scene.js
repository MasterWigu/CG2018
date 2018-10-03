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
                                         1000);
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
        switch (e.keyCode) {
        case 38:
        case 40:
            this.chair.keyReleased();
            this.chair.stopMove();
            break;
        }
        console.log("aaa");
    }
    
    onKeyDown(e) {
        'use strict';
        console.log(e.key)
        
        switch (e.keyCode) {
        case 37:
            this.chair.rotateP();
            break;
        case 38:
            this.chair.startMove(-1);
            break;
        case 39:
            this.chair.rotateN();
            break;
        case 40:
            this.chair.startMove(1);
            break;
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
        
        this.chair.stopMove();
        this.chair.renderMovement();
        this.render();
        this.controls.update(); //para a camara movivel (apagar)
        requestAnimationFrame(this.animate.bind(this));
    }
}
/*
kinput.onkeydown = kinput.onkeyup = kinput.onkeypress = handle;

let lastTime = Date.now();

function handle(e) {
  if (form.elements[e.type + 'Ignore'].checked) return;

  let text = e.type +
    ' key=' + e.key +
    ' code=' + e.code +
    (e.shiftKey ? ' shiftKey' : '') +
    (e.ctrlKey ? ' ctrlKey' : '') +
    (e.altKey ? ' altKey' : '') +
    (e.metaKey ? ' metaKey' : '') +
    (e.repeat ? ' (repeat)' : '') +
    "\n";

  if (area.value && Date.now() - lastTime > 250) {
    area.value += new Array(81).join('-') + '\n';
  }
  lastTime = Date.now();

  area.value += text;

  if (form.elements[e.type + 'Stop'].checked) {
    e.preventDefault();
  }
}
*/
