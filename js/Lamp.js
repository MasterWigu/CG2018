class Lamp extends THREE.Object3D {

	makeBase(x, y, z) {
        'use strict';
        this.geometry = new THREE.ConeGeometry(3, 3, 10, 10);
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.set(x, y-3.5, z);
        this.add(this.mesh);
    }

    makeStick(x, y, z) {
    	'use strict';
    	this.geometry = new THREE.CylinderGeometry(0.5, 0.5, 30, 10);
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.set(x, y + 11, z);
        this.add(this.mesh);
    }

    makeTop(x, y, z) {
    	'use strict';
    	this.geometry = new THREE.CylinderGeometry(3, 4, 6, 20, 1, true);
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.set(x, y + 28, z);
        this.add(this.mesh);
    }

    makeLamp(x, y, z) {
    	'use strict';
    	this.geometry = new THREE.SphereGeometry(2, 10, 10);
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.set(x, y + 28, z);
        this.add(this.mesh);
    }

	constructor(x, y, z) {
		'use strict';
		super();

		this.material = new THREE.MeshBasicMaterial({ color: 0xffcd00, wireframe: true });
        this.material.side = THREE.DoubleSide

		this.makeBase(x, y, z);
		this.makeStick(x, y, z);
		this.makeTop(x, y, z);
		this.makeLamp(x, y, z);
		this.makeLamp(x, y, z);

		this.position.x = x;
        this.position.y = y;
        this.position.z = z;
	}
}