
export class ChatRoom extends Blox {

	constructor() {
		super()

		// build ux
		this.elem = document.createElement("div")

		// arguably this should insert itself more intelligently TODO
		document.body.appendChild(this.elem)

		this.elem.innerHTML=`
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

		this.messages = this.elem.querySelector('#messages');
		this.form = this.elem.querySelector('form');
		this.input = this.elem.querySelector('input');

		form.addEventListener('submit',this.submit.bind(this))
	}

	submit(e) {
		e.preventDefault()
		if(!this.input.value || !this.input.value.length)return

		net.publish({
			name:this.name,
			path:this.path,
			event:"update_all",
			message:input.value
		})
		input.value = ''
		return 0
	}

	onprops(props) {
		if(!props.message)return
		var item = document.createElement('li')
		item.textContent = blob.name + ": " + blob.value
		this.messages.prepend(item)
	}

// xxx persistent user name TODO

}

customElements.define('chat-room', ChatRoom )




