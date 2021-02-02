
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.115/build/three.module.js';

export class Render {

	constructor(parent=0,key=0,args={}) {

		// make canvas
		let canvas = this.canvas = document.body.appendChild(document.createElement("canvas"))
		canvas.width = 400
		canvas.height = 400

		// make renderer
		let renderer = this.renderer = new THREE.WebGLRenderer({canvas})
		renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = THREE.PCFSoftShadowMap;

		// make a scene for now
		this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color('blue');

		// a resize helper
		function resizeRendererToDisplaySize(renderer) {
			const canvas = renderer.domElement;
			const width = canvas.clientWidth;
			const height = canvas.clientHeight;
			const needResize = canvas.width !== width || canvas.height !== height;
			if (needResize) {
				renderer.setSize(width, height, false);
			}
			return needResize;
		}

		// render helper
		let render = () => {
			if(this.camera) {
				for(let i = 0; i < this.scene.children.length;i++) {
					let obj = this.scene.children[i]
					if(obj.on_tick) obj.on_tick()
				}
				if (resizeRendererToDisplaySize(renderer)) {
					const canvas = renderer.domElement;
					this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
					this.camera.updateProjectionMatrix();
				}
				renderer.render(this.scene, this.camera);
			}
			requestAnimationFrame(render);
		}

		// go
		requestAnimationFrame(render)
	}

	onchild(obj) {
		if(obj.matrix) {
			this.scene.add(obj)
			if(obj.camera) {
				this.camera = obj.camera
			}
		}
	}

	ondone() {
		console.log("render done")
	}

	onparentdone() {
		console.log("parentscopedone")
		this.scene.children.forEach(child=>{
			console.log(child)
			if(child.onparentdone) child.onparentdone(this)
		})
	}
}




