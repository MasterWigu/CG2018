/*global THREE, requestAnimationFrame, console*/
        
    
class Table extends THREE.Object3D {
    
    addTableLeg(obj, x, y, z) {
        'use strict';
    
        this.geometry = new THREE.CubeGeometry(2, 12, 2);
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.set(x, y - 3, z);
        this.add(this.mesh);
    }
    
    addTableTop(obj, x, y, z) {
        'use strict';
        this.geometry = new THREE.CubeGeometry(60, 2, 20);
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.set(x, y, z);
        this.add(this.mesh);
    }
    
    constructor(x, y, z) {
        'use strict';

        super();
        
        //this.table = new THREE.Object3D();
        
        this.material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
       
        this.addTableTop(this, 0, 0, 0);
        this.addTableLeg(this, -25, -4, -8);
        this.addTableLeg(this, -25, -4, 8);
        this.addTableLeg(this, 25, -4, 8);
        this.addTableLeg(this, 25, -4, -8);
        
        
        
        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
    }
}