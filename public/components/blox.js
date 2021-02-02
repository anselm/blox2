
/*

Blox

A blox is the cornerstone of a modular programming framework for defining apps in an easy to understand way.
A blox has these features:

Creation:

	+ blox are anything that implement a set of interfaces, an example blox is provided and it can be subclassed
	+ blox don't need to inherit blox base-class; rather a blox instance just has to implement the interfaces
	+ loader -> there is a parser to help load blox off disk; the file format on disk is javascript object hashes
	+ blox factory -> a blox is an instance of a class, users can define new blox class constructors
	? right now a blox parent force hammers child properties into a child... this is debatable

Organization:

	+ parent -> blox are arranged in a directed acyclic graph similar to a filesystem or DOM or scene graph
	+ children -> this may become a method call that the parent can implement as it wishes
	+ create/add/remove/delete blox capabilities
	+ basic one time search/query

Events:

	+ philosophically events themselves should be flat property buckets/hashes so they can be piped everywhere easily
	+ events are propagated by setters; so the call nomenclature is something like blox.onchange = 1234
	+ any number of listeners can observe an event
	+ events are sent for many common state changes, attach/detach, ready, tick, touch events
	+ basic blox will percolate events to children, but custom children may not implement this (it is up to that programmer)

Wires:

	+ wires are one way way to build explicit ad-hoc relationships between objects at runtime
	+ objects can pipe events to each other using wires
	+ wires can be explicitly declared by users to produce effects such as "sphere.ontouch.add(children.xyz.set)"

Thoughts

- I was thinking about a global factory method so that the outermost blox could be any arbitrary object
	- there are so many ways a file can be laid out
	- it could be a bunch of exports
	- it could be a single hash
	- it could have prototypes in it (i will disallow this now)
	- right now there's no real imposition... it can be multiple objects; they become children of a Blox class


- Also I tried an idea where child blox could implement _digest() themselves...
	one problem was that async is a hassle in a constructor although i can return a promise from constructor...
	it would be nice not to force feed all the fields to a child however... even though it *is* convenient...

*/

let factory = {}

export class Blox {

	constructor(parent=0,key=0,args={}) {
		this._parent=parent
		this._observers={}
	}

	async _digest(scope,key,args=0) {
		for(const [k,v] of Object.entries(args)) {
			await this._digest_property(scope,k,v)
		}
	console.log("*********** done " + key)
		if(scope.onchildren)
		for(const [k,child] of Object.entries(scope.onchildren)) {
			if(child.onparentdone) child.onparentdone(scope)
		}
	}

	async _digest_property(scope,key,args) {

		// examine property
		let isAbstract = args.prototype && args.prototype.constructor ? true : false
		let isArray = args instanceof Array
		let isObject = args instanceof Object
		let isDefined = scope[key]

		if(isDefined) {
			console.warn("field defined " + key)
			console.log(scope)
			return
		}

		// store literals, arrays and hashes as is - however separate out specially marked hashes and return
		if(isAbstract || isArray || !isObject || !args.blox || !args.blox.length) {
			scope[key]=args
			return
		}

		// artifact is a blox prototype - attempt to build it
		let c = factory[args.blox]
		if(!c) {
			let module = await import(args.blox+".js")
			for(const [k,v] of Object.entries(module)) {
				c = factory[args.blox] = v
			}
		}

		if(!c) {
			console.error("PARSER: not found : " + args.blox)
			return
		}

		// make as a child
		console.log("PARSER: Instancing child " + args.blox)
		let child = new c(scope,key,args)

		// force populate
		// TODO this _arguably_ could be done in the constructor...
		// it would work well if "render" was not necessarily a parent component....
		await this._digest(child,key,args)

		// notifications
		if(child.ondone) child.ondone()
		if(scope.onchild) scope.onchild(child,key)
	}

	set onload(filepath) {
		import(filepath+".js").then(module=>{
			this._digest(this,filepath,module)
		})
	}

	get onchildren() {
		if(!this._children) this._children={}
		return this._children
	}

	onchild(obj,key) {
		// TODO prevent key collisions?
		this.onchildren[key]=obj
		this[key]=obj
		if(!this._observers.onchild) return
		this._observers.onchild.forEach(observer=>{observer(obj,key)})
	}

	onparent(obj) {
		this.parent=obj
		if(!this._observers.onparent) return
		this._observers.onparent.forEach(observer=>{observer(obj)})
	}

	ondone() {
		if(!this._observers.ondone) return
		this._observers.ondone.forEach(observer=>{observer()})
	}
}

