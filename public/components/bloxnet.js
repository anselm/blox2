

class BloxNetwork {
	constructor(root,net) {
		this.root = root
		this.flat = {}
		this.updated = {}
		this.net = net
		this.net.observe("*",this.inbound.bind(this))
	}
	inbound(blob) {
		if(!blob.blox) return
		let blox = this.flat[blox.path]
		if(blox.delete) {
			// delete it somehow
			return
		}
		if(!blox) {
			// make it?
			// insert in the right place
		}
		if(blox && blox.deserialize) {
			blox.deserialize(blob)
		}
	}
	update() {
		this.update_section(this.root,"root")
	}
	update_section(node,path) {
		if(!node) return
		this.flat[path]=node
		if(node.dirty && node.serialize) {
			node.dirty=false
			net.publish({
				path:path,
				blox:node.serialize()
			})
		}
		if(!node.onchildren) return
		for(const [name,child] of Object.entries(node.children)) {
			if(!child.name) return
			this.update_section(child,path+"/"+child.name)
		}
	}
}


TODO - children must implement serialize
TODO - children should implement onchildren
TODO - the updater must be called often
TODO - children must mark as dirty

	- still need to inject new things that are created
	- it is arguable that ALL things that are created should pass through this mechanic

TODO anybody wanting serialization needs to do this:

Mesh.prototype.serialize() {
	return ...
}
Mesh.prototype.deserialize() {
	...
}

