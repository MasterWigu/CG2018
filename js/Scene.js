class Scene {

    createScene() {
        'use strict';
        
        this.scene = new THREE.Scene();
        
    
        this.scene.add(new THREE.AxisHelper(10));
        
        this.mesa = new Table(0, 8, 0);
        this.scene.add(this.mesa.table); 

        /*var chair = new Chair(0, 0, 0);
        this.scene.add(chair);*/

    }
    
    createCamera() {
        'use strict';
        this.camera = new THREE.PerspectiveCamera(70,
                                             window.innerWidth / window.innerHeight,
                                             1,
                                             1000);
        this.camera.position.x = 50;
        this.camera.position.y = 50;
        this.camera.position.z = 50;
        this.camera.lookAt(this.scene.position);
    }
    
    onResize() {
        'use strict';
    
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        
        if (window.innerHeight > 0 && window.innerWidth > 0) {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
        }
    
    }
    
    onKeyDown(e) {
        'use strict';
        
        switch (e.keyCode) {
        case 65: //A
        case 97: //a
            this.scene.traverse(function (node) {
                if (node instanceof THREE.Mesh) {
                    node.material.wireframe = !node.material.wireframe;
                }
            });
            break;
        case 83:  //S
        case 115: //s
        case 69:  //E
        case 101: //e
            this.scene.traverse(function (node) {
                if (node instanceof THREE.AxisHelper) {
                    node.visible = !node.visible;
                }
            });
            break;
        }
    }
    
    render() {
        'use strict';
        this.renderer.render(this.scene, this.camera);
    }
    
    constructor() {
        'use strict';
        this.renderer = new THREE.WebGLRenderer({
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
       
        this.createScene();
        this.createCamera();
        
        this.render();
        
        window.addEventListener("keydown", this.onKeyDown);
        window.addEventListener("resize", this.onResize);
    }
    
    animate() {
        'use strict';
        
        
        //this.render();
        
        requestAnimationFrame(this.animate);
    }
}
