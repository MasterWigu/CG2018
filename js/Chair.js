class Chair extends THREE.Object3D {

	createWheel(x, y, z, rot) {
		this.geometry = new THREE.TorusGeometry(0.75, 0.50, 20, 10);
        this.mesh = new THREE.Mesh(this.geometry, this.wheelMaterial);
        this.mesh.position.set(x, y, z);
        this.mesh.rotateOnAxis(new THREE.Vector3(0,1,0), rot);
        this.bottom.add(this.mesh);
        return this.mesh;
	}

	createWheelArm(x, y, z, rot) {
		this.geometry = new THREE.CubeGeometry(0.75, 0.75, 10);
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
		this.geometry = new THREE.CubeGeometry(10, 1.5, 11);
        this.mesh = new THREE.Mesh(this.geometry, this.blueMaterial);
        this.mesh.position.set(x, y, z);
        this.top.add(this.mesh);
	}

	createBack(x, y, z) {
		this.geometry = new THREE.CubeGeometry(10, 12, 1.5);
        this.mesh = new THREE.Mesh(this.geometry, this.blueMaterial);
        this.mesh.position.set(x, y, z);
        this.top.add(this.mesh);
	}

	rotateP() {
		this.top.rotateY(this.rotAngle);
		this.absRot+=this.rotAngle;
		this.wheelsUpdated = false;
	}

	rotateN() {
		this.top.rotateY(-this.rotAngle);
		this.absRot-=this.rotAngle;
		this.wheelsUpdated = false;
	}

	updateWheels() {
		this.wheel1.rotateY(-this.wheelRotTemp);
		this.wheel2.rotateY(-this.wheelRotTemp);
		this.wheel3.rotateY(-this.wheelRotTemp);
		this.wheel4.rotateY(-this.wheelRotTemp);
		this.wheel5.rotateY(-this.wheelRotTemp);


		this.wheel1.rotateY(this.absRot);
		this.wheel2.rotateY(this.absRot);
		this.wheel3.rotateY(this.absRot);
		this.wheel4.rotateY(this.absRot);
		this.wheel5.rotateY(this.absRot);

		this.wheelRotTemp = this.absRot;
	}


	startMove(dir) {
		console.log("ddss");
		if (this.wheelsUpdated == false) {
			this.updateWheels();
			this.wheelsUpdated = true;
		}

		this.speed = this.speed + dir * this.accel*(new Date() - this.startMoveTime);
		this.lastMove = dir;
	}


	stopMove() {

		if (this.speed != 0) {
			if (this.lastMove == -1) {
				this.speed = this.speed + this.brakeAccel*(new Date() - this.startMoveTime);
				if (this.speed > 0)
					this.speed = 0;
			}
			else {
				this.speed = this.speed - this.brakeAccel*(new Date() - this.startMoveTime);
				if (this.speed < 0)
					this.speed = 0;
			}

			if (this.wheelsUpdated == false) {
				this.updateWheels();
				this.wheelsUpdated = true;
			}
		}

		if (this.speed <= 0.0001 && this.speed >= -0.0001)
			this.speed = 0;
	}

	renderMovement() {
		this.translateX(this.speed * Math.sin(this.absRot));
		this.translateZ(this.speed * Math.cos(this.absRot));
	}


	move() {
		if (this.rotP == true)
			this.rotateP();
		if (this.rotN == true)
			this.rotateN();

		if (this.accP == true) 
			this.startMove(1);
		if (this.accN == true)
			this.startMove(-1);
		if (this.accN == false && this.accP == false)
			this.stopMove();
	}

	keyPressed(key) {
		if (key == 37)
			this.rotP = true;
		else if (key == 39)
			this.rotN = true;
		else if (key == 40) {
			this.accP = true;
			this.startMoveTime = new Date();
		}
		else if (key == 38) {
			this.accN = true;
			this.startMoveTime = new Date();
		}

	}

	keyReleased(key) {
		if (key == 37)
			this.rotP = false;
		else if (key == 39)
			this.rotN = false;
		else if (key == 40) {
			this.accP = false;
			this.startMoveTime = new Date();
		}
		else if (key == 38) {
			this.accN = false;
			this.startMoveTime = new Date();
		}
	}

	resetPos() {
		this.position.x = 0;
		this.position.y = 0;
		this.position.z = 0;
		this.translateZ(10);
	}
	
	constructor(x, y, z) {
		super();

		this.top = new THREE.Object3D();
		this.bottom = new THREE.Object3D();

		this.wheelMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true });
		this.ironMaterial = new THREE.MeshBasicMaterial({ color: 0x919191, wireframe: true });
		this.blueMaterial = new THREE.MeshBasicMaterial({ color: 0x007FE1, wireframe: true });

		this.createWheelArm(x, y, z, 0);
		this.createWheelArm(x, y, z, 55);
		this.wheel1 = this.createWheel(x+4.25, y-1.5 ,z, 55);
		this.wheel2 = this.createWheel(x-4.25, y-1.5 ,z, 55);
		this.wheel3 = this.createWheel(x ,y-1.5 ,z+4.25, 55);
		this.wheel4 = this.createWheel(x ,y-1.5 ,z-4.25, 55);
		this.wheel5 = this.createWheel(x ,y-1.5 ,z-4.25, 55);
		this.createStick(x, y+3.75, z);
		this.createSeat(x, y+7.5, z);
		this.createBack(x, y+12.75, z+5);
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

        this.rotP = false;
        this.rotN = false;
        this.accP = false;
        this.accN = false;

        this.rotAngle = Math.PI*2 / 50
        this.absRot=0;
        this.wheelRotTemp = 0;
        this.speed = 0;
        this.accel = 0.0005;
        this.brakeAccel = 0.0005;
        this.lastMove = 1;
        this.wheelsUpdated = false;

        this.translateZ(10)
	}

}