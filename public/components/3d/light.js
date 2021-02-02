
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.115/build/three.module.js';

export class Light extends THREE.Group {
	constructor(parent,key,args) {
		super()

		let group = this

		// a light for now
		{
		const skyColor = 0xB1E1FF;  // light blue
		const groundColor = 0xB97A20;  // brownish orange
		const intensity = 1;
		const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
		group.add(light);
		}

		// a light for now
		{
		const light = new THREE.DirectionalLight(0xffffff,1,100);
		light.position.set(3, 5, 3);
		light.target.position.set(0, 0, 0);
		light.castShadow = true
		group.add(light);

		//scene.add(light.target);
		//Set up shadow properties for the light
		light.shadow.mapSize.width = 2048; // default
		light.shadow.mapSize.height = 2048; // default
		light.shadow.camera.near = 0.1; // default
		light.shadow.camera.far = 500; // default
		}



	}

}