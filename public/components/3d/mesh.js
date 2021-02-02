
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.115/build/three.module.js';

export class Mesh extends THREE.Mesh {
	constructor(parent,key,args) {
		super()

		let mesh = this.mesh = this

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
	}
}

/*
		// test idea on getter/setter event listeners
		// register event handlers used by this system architecture
		this.handlers={
			xyz:[(v) => {mesh.position.set(v.x,v.y,v.z)}],
			size:[(v) => {mesh.scale.set(v.x,v.y,v.z)}],
			touch:[],
		}
	}

}

// a getter setter pair for on_xyz - manually built as a test - todo maybe automate this entire builder
Object.defineProperty(Mesh.prototype, "xyz", {
	get:function() { return this.mesh.position },
	set:function(v) { this.handlers.xyz.forEach(h=>{h(v)})}
})

// a getter setter pair for on_xyz - manually built as a test
Object.defineProperty(Mesh.prototype, "size", {
	get:function() { return this.mesh.scale },
	set:function(v) { this.handlers.size.forEach(h=>{h(v)})}
})

// a getter setter pair for on_touch also - manually built as a test
Object.defineProperty(Mesh.prototype, "touch", {
	get:function() { return 0 },
	set:function(v) {this.handlers.touch.forEach(h=>{h(v)})}
})
*/

