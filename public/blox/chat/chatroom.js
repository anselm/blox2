
export class ChatRoom extends HTMLElement {

	constructor() {
		super()
		document.body.appendChild(this)
	}

	connectedCallback() {
		this.innerHTML=`
			<style>
			#form > button { background: #333; border: none; padding: 0 1rem; margin: 0.25rem; border-radius: 3px; outline: none; color: #fff; }
			#messages { list-style-type: none; margin: 0; padding: 0; }
			</style>
			<div style="border:3px solid blue;width:100%;height:100%">
			<form id="form" action="">
			<input style="border:2px solid green;width:80%" id="input" autocomplete="off" />
			<button style="width:15%">Send</button>
			</form>
			<ul id="messages"></ul>
			</div>
			`

		var messages = this.querySelector('#messages');
		var form = this.querySelector('form');
		var input = this.querySelector('input');

		form.addEventListener('submit', function(e) {
			e.preventDefault()
			if(!input.value || !input.value.length)return
			let blob = {
				event:"update",
				proto:"message",
				value:input.value
			}
			net.publish(blob)
			input.value = ''
			return 0
		})

		// TODO clearly would be better to have the query filtering work here
		net.observe("*",(blob)=>{
			if(blob.kind!="message") return
			if(blob.command=="delete") {
				// handld delete
				return
			}
			var item = document.createElement('li')
			item.textContent = blob.value
			messages.prepend(item)
		})
	}
}

customElements.define('blox-chat-room', ChatRoom )




