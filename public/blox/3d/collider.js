
import {Group} from './group.js'

let collidants = []
let latches = []

export class Collider extends Group {
	constructor(props) {
		super()
		if(!props.hasOwnProperty("layer")) props.layer = 1
		if(!props.hasOwnProperty("filter")) props.filter = 1
		if(!props.hasOwnProperty("proximity")) props.proximity = 1
		collidants.push({props:props,blox:this})
		latches = new Array(collidants.length * collidants.length) // TODO needs to persist existing data
	}
	ontick() {
		let posa = new THREE.Vector3()
		let posb = new THREE.Vector3()
		for(let i = 0; i < collidants.length; i++) {
			for(let j = i+1; j < collidants.length; j++) {
				let a = collidants[i]
				let b = collidants[j]
				// TODO it is fragile code wise to look specifically for a mesh - should use blox.findByProperty("isObject3D")
				if(!a.blox.group || !b.blox.group) continue
				// Each object can set filters on what it will respond to
				let msga = a.props.filter & b.props.layer
				let msgb = b.props.filter & a.props.layer
				if(!msga && !msgb) continue
				a.blox.group.getWorldPosition(posa)
				b.blox.group.getWorldPosition(posb)
				let dist = posa.distanceTo( posb )
				let near = a.props.proximity + b.props.proximity
				let latch = collidants.length*j+i
				let latched = latches[latch]
				if(dist < near) {
					//if(msga && a.blox.oncollide) {
					//	a.blox.oncollide({name:"on_overlap",blox:a.blox,other:b.blox})
					//}
					//if(msgb && b.blox.oncollide) {
					//	b.blox.oncollide({name:"on_overlap",blox:b.blox,other:a.blox})
					//}
					if(!latched) {
						latches[latch] = true
						if(msga && a.blox.oncollide) {
							a.blox.oncollide({name:"on_enter",blox:a.blox,other:b.blox})
						}
						if(msgb && b.blox.oncollide) {
							b.blox.oncollide({name:"on_enter",blox:b.blox,other:a.blox})
						}
					}
				} else if(dist > near + 1 && latched) { // TODO change this latch to be programmable
					latches[latch] = false
					if(msga && a.blox.oncollideexit) {
						a.blox.oncollideexit({name:"on_exit",blox:a.blox,other:b.blox})
					}
					if(msgb && b.blox.oncollideexit) {
						b.blox.oncollideexit({name:"on_exit",blox:b.blox,other:a.blox})
					}
				}
			}
		}
	}
}

