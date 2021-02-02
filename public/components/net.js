
// TODO may be able to just remove

export class Net {
	constructor() {

		// query observers
		this.observers = []

		// start networking
		this.socket = io()

		// incoming traffic
		this.socket.on('blob', (blob) => {
			this.observers.forEach(observer => { observer(blob) })
		})

		this.socket.on('disconnect', () => {
			console.log('user disconnected')
		})
	}
	observe(query,observer) {
		this.observers.push(observer)
	}
	publish(blob) {
		this.socket.emit('blob',blob)		
	}
}
