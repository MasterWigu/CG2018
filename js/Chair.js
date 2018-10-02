class Chair extends THREE.Object3D {

	createWheel(x, y, z, rot) {
		this.geometry = new THREE.TorusGeometry(0.75, 0.50, 10, 10);
        this.mesh = new THREE.Mesh(this.geometry, this.wheelMaterial);
        this.mesh.position.set(x, y, z);
        this.mesh.rotateOnAxis(new THREE.Vector3(0,1,0), rot);
        this.bottom.add(this.mesh);
	}

	createWheelArm(x, y, z, rot) {
		this.geometry = new THREE.BoxGeometry(0.5, 0.5, 8);
        this.mesh = new THREE.Mesh(this.geometry, this.ironMaterial);
        this.mesh.position.set(x, y, z);
        this.mesh.rotateOnAxis(new THREE.Vector3(0,1,0), rot);
        this.bottom.add(this.mesh);
	}

	createStick(x, y, z) {
		this.geometry = new THREE.CylinderGeometry(0.5, 0.5, 7, 10, 1);
        this.mesh = new THREE.Mesh(this.geometry, this.ironMaterial);
        this.mesh.position.set(x, y, z);
        this.bottom.add(this.mesh);
	}


	createSeat(x, y, z) {
		this.geometry = new THREE.BoxGeometry(8, 1, 8);
        this.mesh = new THREE.Mesh(this.geometry, this.ironMaterial);
        this.mesh.position.set(x, y, z);
        this.top.add(this.mesh);
	}

	createBack(x, y, z) {
		this.geometry = new THREE.BoxGeometry(8, 10, 1);
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

		this.createWheelArm(x, y, z, 0);
		this.createWheelArm(x, y, z, 55);
		this.createWheel(x+3.75 ,y-1.5 ,z, 55);
		this.createWheel(x-3.75 ,y-1.5 ,z, 55);
		this.createWheel(x ,y-1.5 ,z+3.75, 55);
		this.createWheel(x ,y-1.5 ,z-3.75, 55);
		this.createStick(x, y+3.75, z);
		this.createSeat(x, y+7.5, z);
		this.createBack(x, y+12, z+4);

		this.top.position.x = 0;
        this.top.position.y = 0;
        this.top.position.z = 0;

        this.bottom.position.x = 0;
        this.bottom.position.y = 0;
        this.bottom.position.z = 0;
        

        this.add(this.bottom);
        this.add(this.top);

	}

}