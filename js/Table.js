/*global THREE, requestAnimationFrame, console*/
        
    
class Table extends THREE.Object3D {
    
    addTableLeg(x, y, z) {
        'use strict';
    
        this.geometry = new THREE.CubeGeometry(2, 16, 2);
        this.mesh = new THREE.Mesh(this.geometry, this.legMaterial);
        this.mesh.position.set(x, y - 3, z);
        this.add(this.mesh);
    }
    
    addTableTop(x, y, z) {
        'use strict';
        this.geometry = new THREE.CubeGeometry(60, 2, 20);
        this.mesh = new THREE.Mesh(this.geometry, this.topMaterial);
        this.mesh.position.set(x, y, z);
        this.add(this.mesh);
    }
    
    constructor(x, y, z) {
        'use strict';

        super();
        
        this.topMaterial = new THREE.MeshBasicMaterial({ color: 0xb77100, wireframe: false });
        this.legMaterial = new THREE.MeshBasicMaterial({ color: 0x996006, wireframe: false });

        this.addTableTop(0, 0, 0);
        this.addTableLeg(-25, -6, -8);
        this.addTableLeg(-25, -6, 8);
        this.addTableLeg(25, -6, 8);
        this.addTableLeg(25, -6, -8);
        
        
        
        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
    }
}