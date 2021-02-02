
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.115/build/three.module.js';

export class Ground extends THREE.Mesh {
	constructor(blox,args) {
		super()

		this.mesh = this
		this._bloxcomponent = this

		const planeSize = 40;
		const loader = new THREE.TextureLoader();
		let texture = loader.load('https://threejsfundamentals.org/threejs/resources/images/checker.png');
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.magFilter = THREE.NearestFilter;
		const repeats = planeSize / 2;
		texture.repeat.set(repeats, repeats);

		this.geometry = new THREE.PlaneBufferGeometry(planeSize, planeSize);
		this.material = new THREE.MeshPhongMaterial({
			//map: texture,
			color: 0xe0a0a0,
			side: THREE.DoubleSide,
		});
		this.receiveShadow = true;

		this.rotation.x = Math.PI/2

		// soup support - listen for events and add self to renderer
		blox.parent.listen((e)=>{
			if(e.behaviors.renderer) e.behaviors.renderer.scene.add(this)
		})

	}
}

