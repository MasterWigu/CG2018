class Chair extends THREE.Object3D {

	createWheel(x, y, z, rot) {
		this.geometry = new THREE.TorusGeometry(0.75, 0.50, 100, 100);
        this.mesh = new THREE.Mesh(this.geometry, this.wheelMaterial);
        this.mesh.position.set(x, y, z);
        this.mesh.rotateOnAxis(new THREE.Vector3(0,1,0), rot);
        this.bottom.add(this.mesh);
        return this.mesh;
	}

	createWheelArm(x, y, z, rot) {
		this.geometry = new THREE.BoxGeometry(0.75, 0.75, 10);
        this.mesh = new THREE.Mesh(this.geometry, this.ironMaterial);
        this.mesh.position.set(x, y, z);
        this.mesh.rotateOnAxis(new THREE.Vector3(0,1,0), rot);
        this.bottom.add(this.mesh);
	}

	createStick(x, y, z) {
		this.geometry = new THREE.CylinderGeometry(0.75, 0.75, 7, 10, 1);
        this.mesh = new THREE.Mesh(this.geometry, this.ironMaterial);
        this.mesh.position.set(x, y, z);
        this.bottom.add(this.mesh);
	}


	createSeat(x, y, z) {
		this.geometry = new THREE.BoxGeometry(10, 1.5, 11);
        this.mesh = new THREE.Mesh(this.geometry, this.blueMaterial);
        this.mesh.position.set(x, y, z);
        this.top.add(this.mesh);
	}

	createBack(x, y, z) {
		this.geometry = new THREE.BoxGeometry(10, 12, 1.5);
        this.mesh = new THREE.Mesh(this.geometry, this.blueMaterial);
        this.mesh.position.set(x, y, z);
        this.top.add(this.mesh);
	}

	rotateP() {
		this.top.rotateY(this.rotAngle);
		this.absRot+=this.rotAngle;
	}

	rotateN() {
		this.top.rotateY(-this.rotAngle);
		this.absRot-=this.rotAngle;
	}

	updateWheels() {
		this.wheel1.rotateY(-this.wheelRotTemp);
		this.wheel2.rotateY(-this.wheelRotTemp);
		this.wheel3.rotateY(-this.wheelRotTemp);
		this.wheel4.rotateY(-this.wheelRotTemp);


		this.wheel1.rotateY(this.absRot);
		this.wheel2.rotateY(this.absRot);
		this.wheel3.rotateY(this.absRot);
		this.wheel4.rotateY(this.absRot);

		this.wheelRotTemp = this.absRot;
	}


	accelerate() {
		if (this.speed>=0)
			this.speed = this.speed + this.accel*(new Date() - this.startMoveTime);
	}

	brake() {
		if (this.speed>0 && this.alreadyPressed == false)
			this.speed = this.speed - this.accel*(new Date() - this.startMoveTime);
		if (this.speed < 0.001)
			this.speed = 0;
		console.log(this.speed);
		if (this.lastOrientation == 1) {
			this.translateX(this.speed * Math.sin(this.absRot));
			this.translateZ(this.speed * Math.cos(this.absRot));
		}
		else {
			this.translateX(-this.speed * Math.sin(this.absRot));
			this.translateZ(-this.speed * Math.cos(this.absRot));
		}

		

	}

	moveP() {
		if (this.wheelsUpdated == false) {
			this.updateWheels();
			this.wheelsUpdated = true;
		}
		if (this.alreadyPressed == false) {
			this.startMoveTime = new Date();
			this.alreadyPressed = true;
		}

		this.accelerate();
		this.translateX(this.speed * Math.sin(this.absRot));
		this.translateZ(this.speed * Math.cos(this.absRot));
		this.lastOrientation = 1;
	}

	moveN() {
		if (this.wheelsUpdated == false) {
			this.updateWheels();
			this.wheelsUpdated = true;
		}
		if (this.alreadyPressed == false) {
			this.startMoveTime = new Date();
			this.alreadyPressed = true;
		}

		this.accelerate();
		this.translateX(-this.speed * Math.sin(this.absRot));
		this.translateZ(-this.speed * Math.cos(this.absRot));
		this.lastOrientation = -1;
	}

	stopMove() {
		this.startMoveTime = new Date();
		this.wheelsUpdated = false;
		this.alreadyPressed = false;
		this.brake();
	}



	
	constructor(x, y, z) {
		super();

		this.top = new THREE.Object3D();
		this.bottom = new THREE.Object3D();

		this.wheelMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: false });
		this.ironMaterial = new THREE.MeshBasicMaterial({ color: 0x919191, wireframe: false });
		this.blueMaterial = new THREE.MeshBasicMaterial({ color: 0x007FE1, wireframe: false });

		this.createWheelArm(x, y, z, 0);
		this.createWheelArm(x, y, z, 55);
		this.wheel1 = this.createWheel(x+4.25, y-1.5 ,z, 55);
		this.wheel2 = this.createWheel(x-4.25, y-1.5 ,z, 55);
		this.wheel3 = this.createWheel(x ,y-1.5 ,z+4.25, 55);
		this.wheel4 = this.createWheel(x ,y-1.5 ,z-4.25, 55);
		this.createStick(x, y+3.75, z);
		this.createSeat(x, y+7.5, z);
		this.createBack(x, y+12.75, z+5);

		this.top.position.x = 0;
        this.top.position.y = 0;
        this.top.position.z = 0;

        this.bottom.position.x = 0;
        this.bottom.position.y = 0;
        this.bottom.position.z = 0;
        

        this.add(this.bottom);
        this.add(this.top);

        this.position.x=0;
        this.position.y=0;
        this.position.z=0

        this.rotAngle = Math.PI*2 / 100
        this.absRot=0;
        this.wheelRotTemp = 0;
        this.speed = 0;
        this.accel = 0.001;
        this.lastOrientation = 1;
        this.alreadyPressed = false;
        this.wheelsUpdated = false;

        this.translateZ(10)


	}

}