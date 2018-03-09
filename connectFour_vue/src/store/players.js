import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		activePlayer: 0,
		started: false,
		players: [
			{
				name: null,
				color: 'red'
			},
			{
				name: null,
				color: 'black'
			}
		]
	},
	getters: {
		activePlayer: state => state.players[state.activePlayer],
		gameStarted: state => state.started
	},
	mutations: {
		nextPlayer(state) {
			state.activePlayer === 0 ? state.activePlayer = 1 : state.activePlayer = 0
		},
		startGame(state, players) {
			state.players[0].name = players[0];
			state.players[1].name = players[1];
			state.started = true;
		},
		finishGame(state) {
			state.started = false;
			state.activePlayer = 0;
		},
		resetActivePlayer: state => state.activePlayer = 0
	}
})