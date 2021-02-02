
import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/build/three.module.js';

export class Camera extends THREE.Group {

	constructor(parent,key,args) {
		super()

		const fov = 45;
		const aspect = 2;
		const near = 0.1;
		const far = 500;
		const camera = this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);


		// be at origin, look down z
		camera.position.set(0,0,0)
		camera.lookAt(new THREE.Vector3(0,0,-1))

// move back and up a bit
this.position.set(0,3,10)

		// add a light to camera
		let pointLight = new THREE.PointLight( 0xffffff );
		camera.add(pointLight)

		this.add(camera)
	}
}

