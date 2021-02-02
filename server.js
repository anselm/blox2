const express = require('express')
const path = require('path')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const port = 5000

app.use(express.static('public'))

let cache = {
	1:{uuid:1,command:"update",kind:"message",value:"hello"},
	2:{uuid:2,command:"update",kind:"message",value:"how"},
	3:{uuid:3,command:"update",kind:"message",value:"goes"}
}

io.on('connection', (socket) => {
	socket.on('blob', (blob) => {
		switch(blob.command) {
			case "refresh":
				for (const [key, value] of Object.entries(cache)) socket.emit('blob',value)
				break
			case "update":
				cache[blob.uuid]=blob
				io.emit('blob',blob)
				break
			case "delete":
				delete cache[msg.uuid]
				break
		}
	})
})

http.listen(port, () => {
	console.log('listening on *:3000')
})