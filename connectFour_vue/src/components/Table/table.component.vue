<template>
    <div class="game">
        <h1>It's Your Turn, <span class="activePlayer" :style="{fontSize: '40px', color: activePlayer.color === 'red' ? '#D0021B' : '#000000'}">{{activePlayer.name}}</span></h1>
        <div class="table">
            <div class="row">
                <div class="col" v-for="i of 7" :key="i">
                    <div class="peg-drop" @click="onClick(i-1)">
                        <svg class="arrow" width="28px" height="50px" viewBox="0 0 28 50" version="1.1"
                             xmlns="http://www.w3.org/2000/svg">
                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <g transform="translate(-74.000000, -150.000000)" fill="#2B5C95" fill-rule="nonzero">
                                    <g transform="translate(87.223611, 173.223611) rotate(-45.000000) translate(-87.223611, -173.223611) translate(68.223611, 153.723611)">
                                        <g transform="translate(-0.000000, 0.000000)">
                                            <g>
                                                <polygon
                                                        points="0.790530585 38.4035037 3.9486367 15.9466409 10.2670824 22.3638596 31.632318 0.664632402 37.9485302 7.07958269 16.5855281 28.7810782 22.9017403 35.1960285"></polygon>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </svg>
                        <peg-component :color="activePlayer.color" :invisible="true" :ref="i"/>
                    </div>
                </div>
            </div>
            <img class="overlay" src="../../assets/overlayAlt.png">
            <div class="row" v-for="(row, i) of table" :key="i">
                <div class="col" v-for="(col, k) of table[i]" :key="k">
                    <div class="peg" v-if="!col.player"></div>
                    <peg-component :color="col.player.color" v-if="col.player"/>
                </div>
            </div>
        </div>
        <div class="player-info">
            <div class="player" v-for="player of players" :key="player.name">
                <div class="player-name">{{player.name}}</div>
                <peg-component :color="player.color"/>
            </div>
        </div>
        <div class="menu">
            <svg width="45px" height="45px" viewBox="0 0 45 45" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 @click="reset()">
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g transform="translate(-104.000000, -607.000000)" fill="#FFFFFF" fill-rule="nonzero">
                        <g transform="translate(104.000000, 607.000000)">
                            <g>
                                <path d="M22.5,0.191742353 C10.0735934,0.191742353 0,10.1468229 0,22.4270365 C0,34.7072501 10.0735934,44.6623306 22.5,44.6623306 C34.9264066,44.6623306 45,34.7072501 45,22.4270365 C45,10.1468229 34.9264066,0.191742353 22.5,0.191742353 Z M22.5,9.72115412 C25.5974577,9.72115412 28.4626018,10.8032824 30.6863839,12.6163747 C31.1189041,12.9702971 31.1951909,13.6779141 30.8370536,14.1053453 C30.4789163,14.5327765 29.7461363,14.5916206 29.3136161,14.2376982 C27.4632589,12.7290653 25.0967266,11.8388012 22.5,11.8388012 C16.5699707,11.8388012 11.7857143,16.5667659 11.7857143,22.4270365 C11.7857143,28.2873071 16.5699707,33.0152718 22.5,33.0152718 C28.3064304,33.0152718 33.0038904,28.48131 33.1975446,22.7910071 L31.2723214,24.61086 C30.9942045,24.8709284 30.5968174,24.9646134 30.2298519,24.8566249 C29.8628863,24.7486363 29.5820933,24.4553802 29.4932447,24.0873234 C29.4043961,23.7192665 29.5209902,23.3323254 29.7991071,23.0722571 L33.5491071,19.5318159 C33.7101535,19.3802481 33.9149309,19.281955 34.1350446,19.2505659 C34.4587302,19.2056753 34.7854487,19.3092389 35.0223214,19.5318159 L38.7723214,23.0722571 C39.0504384,23.3323254 39.1670325,23.7192665 39.0781839,24.0873234 C38.9893353,24.4553802 38.7085422,24.7486363 38.3415767,24.8566249 C37.9746112,24.9646134 37.577224,24.8709284 37.2991071,24.61086 L35.3404018,22.7744629 C35.1505907,29.6169115 29.4687755,35.1329188 22.5,35.1329188 C15.4118866,35.1329188 9.64285714,29.4317365 9.64285714,22.4270365 C9.64285714,15.4223047 15.4118866,9.72115412 22.5,9.72115412 Z"
                                      id="Shape"></path>
                            </g>
                        </g>
                    </g>
                </g>
            </svg>
            <svg width="45px" height="45px" viewBox="0 0 45 45" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 @click="finishGame()">
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g transform="translate(-226.000000, -607.000000)" fill="#FFFFFF" fill-rule="nonzero">
                        <g transform="translate(226.000000, 607.000000)">
                            <path d="M22.5,0 C10.0935,0 0,10.0935 0,22.5 C0,34.9065 10.0935,45 22.5,45 C34.9065,45 45,34.9065 45,22.5 C45,10.0935 34.9065,0 22.5,0 Z M33.3189,32.0454 C33.6708,32.3973 33.6708,32.9661 33.3189,33.318 C33.1434,33.4935 32.913,33.5817 32.6826,33.5817 C32.4522,33.5817 32.2218,33.4935 32.0463,33.318 L22.5,23.7726 L12.9546,33.3189 C12.7791,33.4944 12.5487,33.5826 12.3183,33.5826 C12.0879,33.5826 11.8575,33.4944 11.682,33.3189 C11.3301,32.967 11.3301,32.3982 11.682,32.0463 L21.2274,22.5 L11.6811,12.9546 C11.3292,12.6027 11.3292,12.0339 11.6811,11.682 C12.033,11.3301 12.6018,11.3301 12.9537,11.682 L22.5,21.2274 L32.0463,11.682 C32.3982,11.3301 32.967,11.3301 33.3189,11.682 C33.6708,12.0339 33.6708,12.6027 33.3189,12.9546 L23.7726,22.5 L33.3189,32.0454 Z"
                                  id="Shape"></path>
                        </g>
                    </g>
                </g>
            </svg>
        </div>
    </div>

</template>
<script>
	import {mapGetters, mapMutations, mapState} from 'vuex'
    import PegComponent from '../Peg/peg.component.vue'

	export default {
		data() {
			return {
				table: [],
                animation: false
			}
		},
		computed: {
			...mapState([
				'players'
			]),
			...mapGetters([
				'activePlayer'
			])
		},
		methods: {
			...mapMutations([
				'nextPlayer',
				'finishGame',
				'resetActivePlayer'
			]),
			onClick(col) {
				if(this.animation){
					return
                }
				this.addPeg(col)
			},
			async addPeg(col) {
				let lastIndexOfTable = this.table.length - 1;
				for (let row = lastIndexOfTable; row >= 0; row--) {
					if (this.table[row][col].player === null) {
                        await this.animatePeg(col, row);
						this.table[row][col].player = this.activePlayer;
						if (this.checkWin(this.activePlayer.name, this.table[row][col])) {
							setTimeout(() => {
								let msg = `Congratulations, ${this.activePlayer.name}. Would you like to play again?`;
								if (window.confirm(msg)) {
									this.table = this.createTable();
									this.resetActivePlayer()
								} else {
									this.finishGame()
								}
							}, 100);
							return
						}
						return
					}
				}
			},
            animatePeg(col, row){
				return new Promise((res)=>{
					this.animation = true;
					let el = this.$refs[col+1][0].$el;
					let animationDuration = (((row+1)/6)/1.5).toFixed(2);
					let yPos = (row + 1) * 55;
					row === 0 ? yPos += 4 : null;
					let showDisplay = "display:block;";
					let transition = `transition: all ${animationDuration}s ease-in;`;
					let transform = `transform: translate(-1px, ${yPos}px)`;
					el.setAttribute('style', showDisplay + transition + transform);
					setTimeout(()=>{
						el.removeAttribute('style');
						this.animation = false;
						res(true)
					}, (animationDuration * 1000))
                })
            },
			checkWin(player, cell) {
				let count = 0;
				if (it(player, cell, 'left', 'right')) {
					return true
				}
				if (it(player, cell, 'top', 'bottom')) {
					return true
				}
				if (it(player, cell, 'topLeft', 'bottomRight')) {
					return true
				}
				if (it(player, cell, 'topRight', 'bottomLeft')) {
					return true
				}
				this.nextPlayer();

				function it(p, c, pos, opPos) {
					if (count === 4) {
						return true
					}
					if (!c || !c.player || c.player.name !== p) {
						if (opPos === null) {
							count = 0;
							return false
						}
						return it(p, cell[opPos], opPos, null)
					} else {
						count++;
						return it(p, c[pos], pos, opPos)
					}
				}
			},
			reset() {
				this.table = this.createTable();
				this.resetActivePlayer()
			},
			createTable() {
				let table = [];
				let totalRows = 6;
				let totalCols = 7;
				for (let row = 0; row < totalRows; row++) {
					table.push([]);
					for (let col = 0; col < totalCols; col++) {
						table[row].push({})
					}
				}
				for (let row = 0; row < totalRows; row++) {
					for (let col = 0; col < totalCols; col++) {
						table[row][col].left = col > 0 ? table[row][col - 1] : null;
						table[row][col].right = col < totalCols - 1 ? table[row][col + 1] : null;
						table[row][col].bottom = row < totalRows - 1 ? table[row + 1][col] : null;
						table[row][col].top = row > 0 ? table[row - 1][col] : null;
						table[row][col].topLeft = row > 0 && col > 0 ? table[row - 1][col - 1] : null;
						table[row][col].topRight = row > 0 && col < totalCols - 1 ? table[row - 1][col + 1] : null;
						table[row][col].bottomLeft = row < totalRows - 1 && col > 0 ? table[row + 1][col - 1] : null;
						table[row][col].bottomRight = row < totalRows - 1 && col < totalCols - 1 ? table[row + 1][col + 1] : null;
						table[row][col].player = null;
					}
				}
				return table
			}
		},
		created() {
			this.table = this.createTable()
		},
        components: {
			PegComponent
        }
	}
</script>
<style scoped>
    .game {
        margin: auto;
    }

    .table {
        position: relative;
        width: 390px;
        margin: auto;
        box-shadow: 2px 4px 15px -3px rgba(0,0,0,0.75)
    }

    .overlay {
        position: absolute;
        bottom: -145px;
        left: -16px;
        z-index: 10;
    }

    .row {
        justify-content: center;
        display: flex;
    }

    .col {
        padding: 0 5px 5px 0;
        width: 50px;
        height: 50px;
        background-color: #1B0EA4;
    }

    .row > .col:first-child {
        padding-left: 5px;
    }

    .table .row:nth-child(2) > .col {
        padding-top: 5px;
    }
    .table .row:first-child .col {
        background-color: transparent;
    }
    .table .row:first-child {
        background-image: linear-gradient(-180deg, #615AAB 0%, #1B0EA4 100%);
    }
    .peg-drop {
        width: 49px;
        height: 49px;
        border-radius: 100%;
        border: 1px dashed black;
        position: relative;
        cursor: pointer;
    }

    .arrow {
        position: absolute;
        right: 10px;
        top: -14px;
        animation-name: arrow-animate;
        animation-duration: 0.8s;
        animation-iteration-count: infinite;
        animation-direction: alternate;
        animation-timing-function: ease;
    }

    .peg-player {
        display: none;
        position: absolute;
        z-index: 2
    }

    .peg-drop:hover .peg-player {
        display: block;
    }

    .player-info {
        max-width: 390px;
        margin: 40px auto;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        align-items: center
    }

    .player {
        display: flex;
        align-items: center;
        font-weight: bold;
        color: white;
        font-size: 29px;
    }

    .player-name {
        margin-right: 15px
    }

    .activePlayer {
        padding: 10px 15px;
        background-color: white
    }

    .menu {
        display: flex;
        justify-content: space-between;
        position: absolute;
        width: 100px;
        margin: auto;
        right: 40px;
        top: 40px;
    }

    .menu > svg {
        cursor: pointer;
    }

    .menu > svg:hover > g > g {
        fill: #6caaf7;
        transition: all 0.3s ease;
    }

    @keyframes arrow-animate {
        from {
            transform: translateY(0)
        }
        to {
            transform: translateY(2px)
        }
    }
</style>