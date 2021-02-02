
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.115/build/three.module.js';

export class Control extends THREE.Group {

	onparentdone(parent) {

		let scene = parent.scene
		let camera = parent.camera
		let canvas = parent.canvas
		let renderer = parent.renderer
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
			if(selected) {
				if(!raycaster.ray.intersectPlane(plane,intersection)) return
				selected.position.copy(intersection.sub(offset))
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
			plane.setFromNormalAndCoplanarPoint(camera.getWorldDirection(plane.normal),selected.position)
			offset.set(0,0,0)
			if(!raycaster.ray.intersectPlane(plane,intersection)) return
			offset.copy(intersection).sub(selected.position)
		}

		// listen to a pile of events
		let names = ["mousedown","mousemove","mouseout","mouseleave","mouseup","touchstart","touchmove","touchend"]
		names.forEach(s=>{
			canvas.addEventListener(s,events)
		})

		// intercept two finger drag or mousewheel
		let onwheel = (e) => {
			e.preventDefault()
			let avatar = camera.parent
			// turn sideways drag into rotation
			avatar.rotation.y += e.deltaX / 100.0
			// turn forward drag into translation along current heading
			let v = avatar.getWorldDirection(new THREE.Vector3()).multiplyScalar(e.deltaY/10)
			avatar.position.add(v)
		}
		canvas.addEventListener("wheel",onwheel,{passive:false,capture:true})

	}

}
