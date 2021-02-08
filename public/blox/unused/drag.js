
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.115/build/three.module.js';

export class Drag { //extends THREE.Line {
	constructor(blox,args) {
		//super()
		this.name = args.name
		this.blox = blox

		blox.parent.observe("*",(blox)=>{
			if(!blox.components.length || !blox.components[0].renderer) return

			// ok - stuff
			blox.components[0].renderer.handlers.push(this.handler.bind(this))
		})

	}

	handler(e) {
		// - renderer can publish here in general...
		// - and we can do stuff
		console.log(e)
	}

	// obsolete - listen to the mesh itself
	async oneidea() {
		// find a mesh and attach - todo smarter search helpers
		if(!this.blox.components.length) {
			console.error("none")
			return
		}
		let mesh = this.blox.components[0]
		if(!mesh.handlers) {
			console.error("what")
			return
		}
		mesh.handlers["touch"].push(this.handler.bind(this))
	}

}

// in the current scheme a blox has components

// i could have it so that i have only blox in a hierarchy - everything is a blox

// - then 


// - the general goal of this component is to listen to interesting messages from the renderer
//
// - and then to move some other thing based on that, such as the thing it is a part of

// - how can it connect to renderer?

//		- it could be notified when the renderer comes into existence globally....
//			- this could be a general capability
//
//		- there could be a global message bus that it can listen to for ambient events...
//			(which is kind of what is going on)
//
//
//

// - search for the renderer
// - listen to all events on it
// - if they involve my parent then move my parent around

/*

	- ok, 

	- renderer is getting events... 

	- i could listen to it in general...  it can write them to some global place

	- can i detect down events?

	- i can then just move the obj i guess...

- renderer is watching raw mouse
	and it is sending events to artifacts

	it could also publish in general to anybody who wants to attach to it




*/