class Chair extends THREE.Object3D {

	createWheel(x, y, z) {
		this.geometry = new THREE.TorusGeometry(0.75, 0.50, 10, 10);
        this.mesh = new THREE.Mesh(this.geometry, this.wheelMaterial);
        this.mesh.position.set(x, y, z);
        this.bottom.add(this.mesh);
	}

	createWheelArm(x, y, z, rot) {
		this.geometry = new THREE.BoxGeometry(0.5, 0.5, 7);
        this.mesh = new THREE.Mesh(this.geometry, this.ironMaterial);
        this.mesh.position.set(x, y, z);
        this.bottom.add(this.mesh);
	}

	createStick(x, y, z) {
		this.geometry = new THREE.CylinderGeometry(0.5, 0.5, 5, 10, 1);
        this.mesh = new THREE.Mesh(this.geometry, this.ironMaterial);
        this.mesh.position.set(x, y, z);
        this.bottom.add(this.mesh);
	}


	createSeat(x, y, z) {
		this.geometry = new THREE.BoxGeometry(2, 16, 2);
        this.mesh = new THREE.Mesh(this.geometry, this.ironMaterial);
        this.mesh.position.set(x, y, z);
        this.top.add(this.mesh);
	}

	createBack(x, y, z) {
		this.geometry = new THREE.BoxGeometry(2, 16, 2);
        this.mesh = new THREE.Mesh(this.geometry, this.ironMaterial);
        this.mesh.position.set(x, y, z);
        this.top.add(this.mesh);
	}



	
	constructor(x, y, z) {
		super();

		this.top = new THREE.Object3D();
		this.bottom = new THREE.Object3D();

		this.wheelMaterial = new THREE.MeshBasicMaterial({ color: 0x996006, wireframe: true });
		this.ironMaterial = new THREE.MeshBasicMaterial({ color: 0x996006, wireframe: true });

		this.createWheel(x ,y ,z);
		this.createWheelArm(x, y, z);

		this.top.position.x = 0;
        this.top.position.y = 0;
        this.top.position.z = 0;

        this.bottom.position.x = 0;
        this.bottom.position.y = 0;
        this.bottom.position.z = 0;
        this.bottom.rotateOnAxis(new THREE.Vector3(1,1,0), 6.3);

        this.add(this.bottom);
        this.add(this.top);

	}

}