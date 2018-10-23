class Table extends THREE.Object3D {

    addTableLeg(x, y, z) {
        'use strict';

        this.geometry = new THREE.CylinderGeometry(1, 1, 16, 10, 1);
        this.mesh = new THREE.Mesh(this.geometry, this.legMaterial);
        this.mesh.position.set(x, y - 3, z);
        this.add(this.mesh);
    }

    addTableTop(x, y, z) {
        'use strict';
        this.geometry = new THREE.BoxGeometry(60, 2, 20);
        this.mesh = new THREE.Mesh(this.geometry, this.topMaterial);
        this.mesh.position.set(x, y, z);
        this.add(this.mesh);
    }

    constructor(x, y, z) {
        'use strict';

        super();

        this.topMaterial = new THREE.MeshBasicMaterial({ color: 0xb77100, wireframe: true });
        this.legMaterial = new THREE.MeshBasicMaterial({ color: 0x996006, wireframe: true });

        this.addTableTop(0, 0, 0);
        this.addTableLeg(-25, -6, -8);
        this.addTableLeg(-25, -6, 8);
        this.addTableLeg(25, -6, 8);
        this.addTableLeg(25, -6, -8);
        //this.addTableLeg(25, -6, -8);


        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
    }
}
