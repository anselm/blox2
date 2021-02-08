
export class Net {
	constructor() {
		this.observers = []
		this.socket = io()
		this.socket.on('all', (blob) => {
			this.observers.forEach(observer => {
				observer(blob)
			})
		})
		this.socket.on('disconnect', () => {
			console.log('user disconnected')
		})
	}
	observe(query,observer) {
		this.observers.push(observer)
	}
	publish(blob,channel='all') {
		this.socket.emit(channel,blob)		
	}
}

