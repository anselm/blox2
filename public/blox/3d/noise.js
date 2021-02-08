
import {Group} from './group.js'

export class Noise extends Group {

	constructor() {
		let button = document.body.appendChild(document.createElement("button"))
		button.innerHTML = "allow sound"
		button.onclick = () => {
			this.start()
			console.log("noise")
			button.innerHTML = "stop"
			button.onclick = () => {
				this.stop()
			}
		}
	}

	stop() {		
		this.player.stop()
	}

	async start() {
		await Tone.start()

		let player = this.player = new Tone.Player({
			url: "chant.mp3", //https://tonejs.github.io/audio/berklee/gurgling_theremin_1.mp3",
			loop: true,
			autostart: true,
		})

		this.pitch = new Tone.PitchShift().toDestination()
		this.delay = new Tone.FeedbackDelay("8n", 0.5).connect(this.pitch)  //toDestination();

		//const distortion = new Tone.Distortion(0.4).toDestination();

		player.connect(this.delay);

	}

}

