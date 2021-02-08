const express = require('express')
const path = require('path')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const port = 5000

app.use(express.static('public'))

let cache = {
	"/root/chat/1":{path:"/root/chat/1",blox:"message",event:"update",value:"This is some example data"},
	"/root/chat/2":{path:"/root/chat/2",blox:"message",event:"update",value:"It is delivered to all new connections"},
	"/root/chat/3":{path:"/root/chat/3",blox:"message",event:"update",value:"Delete this on the server"}
}

let channel = 'all'

io.on('connection', (socket) => {
	socket.on(channel, (data) => {
		switch(data.event) {
			case "refresh":
				for (const [key, datacached] of Object.entries(cache)) socket.emit(channel,datacached)
				break
			case "update":
				cache[data.path||data.uuid]=data
				io.emit(channel,data)
				break
			case "delete":
				delete cache[data.path||data.uuid]
				io.emit(channel,data)
				break
		}
	})
})

http.listen(port, () => {
	console.log('listening on *:5000')
})
