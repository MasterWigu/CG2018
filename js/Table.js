/*global THREE, requestAnimationFrame, console*/
        
    
class Table {
    
    addTableLeg(obj, x, y, z) {
        'use strict';
    
        this.geometry = new THREE.CubeGeometry(2, 12, 2);
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.set(x, y - 3, z);
        obj.add(this.mesh);
    }
    
    addTableTop(obj, x, y, z) {
        'use strict';
        this.geometry = new THREE.CubeGeometry(60, 2, 20);
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.set(x, y, z);
        obj.add(this.mesh);
    }
    
    constructor(x, y, z) {
        'use strict';
        
        this.table = new THREE.Object3D();
        
        this.material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
       
        this.addTableTop(this.table, 0, 0, 0);
        this.addTableLeg(this.table, -25, -2, -8);
        this.addTableLeg(this.table, -25, -2, 8);
        this.addTableLeg(this.table, 25, -2, 8);
        this.addTableLeg(this.table, 25, -2, -8);
        
        
        
        this.table.position.x = x;
        this.table.position.y = y;
        this.table.position.z = z;
    }
}