<template>
    <div class="begin">
        <div class="player-wrapper">
            <h1 class="red">PLAYER 1</h1>
            <div class="input-control">
                <input type="text" v-model="playerOne" placeholder="Name:">
            </div>
            <div class="peg-position">
                <peg-component :color="'red'"/>
            </div>
        </div>
        <div class="player-wrapper">
            <h1 class="black">PLAYER 2</h1>
            <div class="input-control">
                <input type="text" v-model="playerTwo" placeholder="Name:">
            </div>
            <peg-component class="peg-position" :color="'black'"/>
        </div>
        <button class="start" @click="handleClick">
            <svg width="40px" height="62px" viewBox="0 0 40 62" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g transform="translate(-59.000000, -522.000000)" fill="#ffffff">
                        <path d="M97.1853019,556.56757 L67.233629,581.964116 C65.1274288,583.75 61.9722711,583.490333 60.1863871,581.384132 C59.4204251,580.480787 59,579.334872 59,578.150503 L59,527.35741 C59,524.595986 61.2385763,522.35741 64,522.35741 C65.184369,522.35741 66.330284,522.777835 67.233629,523.543797 L97.1853019,548.940344 C99.2915021,550.726228 99.5511698,553.881385 97.7652858,555.987586 C97.588168,556.196471 97.3941875,556.390452 97.1853019,556.56757 Z"></path>
                    </g>
                </g>
            </svg>
        </button>
    </div>
</template>
<script>
	import {mapMutations} from 'vuex'
    import PegComponent from '../Peg/peg.component.vue'

	export default {
		data() {
			return {
				playerOne: "",
				playerTwo: ""
			}
		},
		methods: {
			...mapMutations([
				'startGame'
			]),
			handleClick() {
				let regTest = /\w/g;
				if (!regTest.test(this.playerOne) || !regTest.test(this.playerTwo)) {
					alert("PLEASE ENTER YOUR NAMES BEFORE PROCEEDING");
					return
				}
				if (this.playerOne === this.playerTwo) {
					alert("YOU CAN NOT HAVE THE SAME NAME AS PLAYER 1, PLEASE CHANGE YOUR NAME");
					return
				}
				this.startGame([this.playerOne, this.playerTwo])

			}
		},
        components: {
			PegComponent
        }
	}
</script>
<style scoped>
    h1 {
        margin: 0 55px 10px 0
    }

    h1.red {
        color: #d1021b
    }

    h1.black {
        color: black
    }

    .begin {
        width: 500px;
        margin: auto;
    }

    .peg-position {
        position: absolute;
        right: 132px;
        top: 24px;
    }

    input {
        box-sizing: border-box;
        width: 300px;
        border: 1px solid rgba(0, 0, 0, 0.4);
        font-size: 25px;
        border-radius: 25px;
        padding: 5px 15px;
        text-align: center;
        font-weight: bold;
        color: rgba(0, 0, 0, 0.7);
        transition: all 0.5s ease
    }
    input::placeholder {
        color: rgba(0,0,0,0.2);
    }
    input:focus {
        outline: none;
        box-shadow: 0px 0px 0px 3px rgba(44, 91, 149, 0.8);
    }

    .player-wrapper {
        position: relative;
        background-color: white;
        box-shadow: 0px 1px 15px 1px rgba(0, 0, 0, 0.3);
        padding: 25px 0;
        box-sizing: border-box;
    }

    .player-wrapper:first-child {
        margin-bottom: 25px;
    }

    button.start {
        margin-top: 25px;
        background: none;
        height: 100px;
        width: 200px;
        position: relative;
        border: 3px solid white;
        border-radius: 54px;
        cursor: pointer;
        transition: all 0.5s ease
    }

    button.start:hover {
        background-color: white
    }

    button.start:hover svg g {
        fill: #2c5b95;
    }

    button svg {
        position: absolute;
        top: 15px;
        right: 67px;
    }
</style>