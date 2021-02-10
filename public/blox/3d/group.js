
export class Group extends Blox {
	constructor() {
		super()
		this.group = new THREE.Group()
	}
	onready() {
		// TODO better type checking - this is not a very good check
		if(!this._parent || !this._parent.group) return
		this._parent.group.add(this.group)
	}
	ondelete() {
		this._parent.group.remove(this.group)
	}
}