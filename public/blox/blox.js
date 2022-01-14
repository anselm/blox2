
let factory = {}

export class Blox {

	///
	/// update fields from a file
	///

	async onload(filename) {
		let module = await import(filename+".js")
		await this.onprops(module)
	}

	///
	/// update fields from a hash
	///

	async onprops(props) {

		if(!this._children) this._children={}

		for(const [k,v] of Object.entries(props)) {

			let isAbstract = v.prototype && v.prototype.constructor ? true : false
			let isArray = v instanceof Array
			let isObject = v instanceof Object

			// update a field
			if(isAbstract || isArray || !isObject || !v.blox || !v.blox.length) {
				this[k]=v
			}

			// update a child
			else {
				v.name = k
				await this.onchild(v)
			}
		}

		// TODO hack - notify self of completion the first time
		if(!this.isbuilt && this.onready) await this.onready()
		this.isbuilt = 1

	}

	///
	/// virtual method to allow custom subclasses to do work on completion
	///

	onready() {
	}

	///
	/// Create a child from properties
	///

	async onchild(props) {

		// force a valid name and path for now
		if(!props.name) {
			console.error("must have a name")
			return 0
		}
		props.path = this.path+"/"+props.name

		// find child
		let child = this._children[props.name]

		// or build child
		if(!child) {
			let c = factory[props.blox]
			if(!c) {
				let module = await import(props.blox+".js")
				for(const [k,v] of Object.entries(module)) {
					c = factory[props.blox] = v
					break
				}
			}
			if(!c) {
				console.error("PARSER: not found : " + props.blox)
				return
			}
			child = await new c(props)

			// for now force some fields
			child._parent = this
			this._children[props.name] = child
			child.name = props.name
			child.path = props.path
			child.blox = props.blox
		}

		// allow child to fill itself from props - it should be attached before this happens because this recursively builds children
		if(child.onprops) await child.onprops(props)

		return child
	}

	///
	/// export self as json - best not to serialize children as a practice
	///

	toJSON() {
		console.error("subclass me")
		return {error:"subclassme"}
	}

	async fromJSON(props) {
		return await this.onprops(props)
	}

	ondelete() {}

	onchilddelete(child) {
		console.log("blox removing")
		console.log(child)
		delete this._children[child.name]
	}

	onreceive(blob) {
		if(!blob.blox) return

		// find the node by tracing down and inserting stubs above
		let segments = blob.path.split("/")
		let parent = this
		let leaf = 0

		for(let i = 1; i < segments.length;i++) {
			let segment = segments[i]
			leaf = parent._children[segment]
			if(i<segments.length-1) {
				if(!leaf) {
					// hmm branch not found... later inject
					console.error("branch not found " + segment)
					console.log(segments)
					console.log(i)
					console.log(parent)
					return
				}
				parent = leaf
				continue
			}
		}

		// delete - act on parent
		if(blob.event=="delete") {
			if(!leaf) return
			if(leaf.ondelete) leaf.ondelete()
			if(parent.onchilddelete) parent.onchilddelete(leaf)
			return
		}

		// update or make - act on parent
		if(!leaf) {
			if(parent.onchild) parent.onchild(blob)
			return
		}

		// just send props to child
		if(leaf.onprops) leaf.onprops(blob)
	}

	ontick() {
		for(const [k,v] of Object.entries(this._children)) {
			if(v.ontick) v.ontick()
		}
	}

}

window.Blox = factory["blox"] = Blox


