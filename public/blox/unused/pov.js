
import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/build/three.module.js';




function generateUID() {
    // I generate the UID from two parts here 
    // to ensure the random number provide enough bits.
    var firstPart = (Math.random() * 46656) | 0;
    var secondPart = (Math.random() * 46656) | 0;
    firstPart = ("000" + firstPart.toString(36)).slice(-3);
    secondPart = ("000" + secondPart.toString(36)).slice(-3);
    return firstPart + secondPart;
}

let name = generateUID()

let latch = 0


export class pov extends Blox {

onreceive(blob) {
	// GETS ITS OWN TRAFFIC TODO FIX
	let x = blob.xyz.x
	let y = blob.xyz.y
	let z = blob.xyz.z
	this.mesh.position.set(x,y,z)
	console.log(this.name + " at " + x)
}


// ANNYHING TODO REPEATS EARLIER LOGIC
// 
	toJSON() {
		return {
			name:this.name,
			path:this.path,
			blox:this.blox,
			shape:this.shape,
			color:this.color,
			xyz:this.mesh.position,
			event:"update",
		}
	}


	constructor(parent,key,args) {
		super(parent,key,args)


		let mesh = this.mesh = new THREE.Mesh()

		let color = args.color || 0xff00ff

		mesh.material = new THREE.MeshPhongMaterial({
			color,
			opacity: 0.6,
			transparent: true,
		});

		switch(args.shape) {
			case "box": mesh.geometry = new THREE.BoxGeometry(2,2,2); break
			default: mesh.geometry = new THREE.SphereGeometry( 1, 32, 32 ); break;
		}

		if(args.size) {
			mesh.scale.set(args.size.x,args.size.y,args.size.z)
		}
		if(args.xyz) {
			mesh.position.set(args.xyz.x,args.xyz.y,args.xyz.z)
		}


if(latch) return
latch = 1

		const fov = 45;
		const aspect = 2;
		const near = 0.1;
		const far = 500;
		const camera = this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

// BAD TODO
delete parent._children[key]
this.name = generateUID()
this.path = 0; for(let node = this; node; node=node._parent) { this.path = node.name + (this.path ? "/" + this.path : "") }
parent._children[this.name]=this

		// be at origin, look down z
		camera.position.set(0,0,0)
		camera.lookAt(new THREE.Vector3(0,0,-1))

// move back and up a bit
mesh.position.set(0,3,10)

		// add a light to camera
		let pointLight = new THREE.PointLight( 0xffffff );
		camera.add(pointLight)

		mesh.add(camera)

// BAD FIX TODO
camera.pov = this


	}
}

