
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.115/build/three.module.js';

/// a test wire - move to a sepaarate module

export class wire { //extends THREE.Line {
	constructor(parent,key,args) {
		//super()
		this.name = args.name
		let blox = this.blox = parent

/*
//create a blue LineBasicMaterial
this.material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
this.geometry = new THREE.BufferGeometry();
var positions = new Float32Array( 3 * 3 ); // 3 vertices per point
this.geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
this.geometry.setDrawRange(0,2);
positions = this.geometry.attributes.position.array;
*/
		let from = args.from.split(".")
		let to = args.to.split(".")
		let helper = args.helper
		let work = (v)=>{

/*
    positions[0] = 0
    positions[1] = 0
    positions[2] = 0
    positions[3] = v.x * 0.5
    positions[4] = v.y * 0.5
    positions[5] = v.z * 0.5
this.geometry.attributes.position.needsUpdate = true;
*/
			blox[to[0]][to[1]] = helper ? helper(v) : v;

		}
		blox[from[0]].handlers[from[1]].push(work)
	}
}

