

import {Group} from './group.js'

////////////////////////////////////////////////////////////////////////////////////////////
// Hack - make a reasonably persistent avatar
// Later user would have some kind of picker ux

function generateUID() {
    var firstPart = (Math.random() * 46656) | 0;
    var secondPart = (Math.random() * 46656) | 0;
    firstPart = ("000" + firstPart.toString(36)).slice(-3);
    secondPart = ("000" + secondPart.toString(36)).slice(-3);
    return firstPart + secondPart;
}

let color = "0x" + Math.floor(Math.random()*16777215).toString(16);
let xyz = {x:Math.random()*10-5,y:0,z:Math.random()*10-5}

let name = localStorage.getItem('playeruuid')
if(!name) {
	name = generateUID()
	localStorage.setItem('playeruuid',name)
	console.log("Setting local player id "  + name)
}

let shape = localStorage.getItem('playershape')
if(!shape) {
	shape = "./meshes/woman1.glb"
	switch(Math.floor(Math.random()*4)) {
		default:
		case 0: shape = "./meshes/woman1.glb"; break
		case 1: shape = "./meshes/man1.glb"; break
		case 2: shape = "./meshes/stacy.glb"; break
	}
	localStorage.setItem('playershape',shape)
	console.log("Setting local player shape "  + shape)
}
////////////////////////////////////////////////////////////////////////////////////////////


///
/// An all in one controller to control avatar and picking - basically a game control
///

export class WalkGrab extends Group {

	async onready() {

		// TODO arguably doesn't have to send to self... but it is not a big deal if it does
		// TODO arguably avatar creation should be a separate blox exposed in userland - not here at all
		this.avatar = await this._parent.onchild({blox:"/blox/3d/mesh",name:name,shape:shape,color:color,xyz:xyz})
		this.avatar.local = 1 // TODO improve
		this.avatar.publish(this.avatar.toJSON())    

		// TODO should search not just assume that parent is a renderer
		let render = this._parent
		let scene = render.scene
		let camera = render.camera
		let canvas = render.canvas
		let renderer = render.renderer

		// This is a way that the renderer can chase the target... TODO later it should be an explicit userland wire
	    camera.idealtarget = this.avatar.group

	    // Picking and dragging support
		let raycaster = new THREE.Raycaster()
		let mouse = new THREE.Vector2()
		let plane = new THREE.Plane( new THREE.Vector3( 0, 0, 1 ), 0 );
		let offset = new THREE.Vector3()
		let intersection = new THREE.Vector3()
		let selected = 0

		let events = (e) => {
			// set flags based on event
			e.preventDefault()
			let down = false
			switch(e.type) {
				case "mousedown":
				case "touchstart":
					down = true
				case "mouseout":
				case "mouseleave":
				case "mouseup":
				case "touchend":
					selected = 0
				case "mousemove":
				case "touchmove":
				default:
					break
			}
			// get mouse position in 3d
			const rect = canvas.getBoundingClientRect()
			e.renderx = mouse.x = (e.clientX-rect.left) * 2.0 / rect.width - 1.0
			e.rendery = mouse.y = (e.clientY-rect.top) * -2.0 / rect.height + 1.0
			raycaster.setFromCamera(mouse,camera)
			// continue to drag existing selection if any
			if(selected && selected.blox) {
				if(!raycaster.ray.intersectPlane(plane,intersection)) return
				selected.position.copy(intersection.sub(offset))
				selected.blox.publish_update_others_volatile_throttled(selected.blox.toJSON())
				return
            }
            // try intersect candidates
            let objects = []
			scene.traverse(o=>{if(o.isMesh)objects.push(o)})
			const intersects = raycaster.intersectObjects(objects)
			if(!intersects.length) return
			// pick selection?
			if(!down) return
			selected = intersects[0].object
			while(selected && !selected.blox) selected = selected.parent
			if(selected && selected.blox) {
				plane.setFromNormalAndCoplanarPoint(camera.getWorldDirection(plane.normal),selected.position)
				offset.set(0,0,0)
				if(!raycaster.ray.intersectPlane(plane,intersection)) return
				offset.copy(intersection).sub(selected.position)
				selected.blox.publish_update_others_volatile_throttled(selected.blox.toJSON())
			}
		}

		// listen to a pile of events
		let names = ["mousedown","mousemove","mouseout","mouseleave","mouseup","touchstart","touchmove","touchend"]
		names.forEach(s=>{
			canvas.addEventListener(s,events)
		})

		// intercept two finger drag or mousewheel
		let onwheel = (e) => {
			e.preventDefault()

			// turn sideways drag into rotation
			this.avatar.group.rotation.y += e.deltaX / 100.0

			// turn forward drag into translation along current heading
			let v = this.avatar.group.getWorldDirection(new THREE.Vector3()).multiplyScalar(e.deltaY/10)
			this.avatar.group.position.add(v)

			// publish changes
			this.avatar.publish_update_others_volatile_throttled(this.avatar.toJSON())

		}
		canvas.addEventListener("wheel",onwheel,{passive:false,capture:true})

	}
}

