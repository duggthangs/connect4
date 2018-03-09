import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CellModel} from '../../models/cell.model';
import {PlayerService} from '../../services/Player/player.service';
import {PlayerModel} from '../../models/player.model';

@Component({
	selector: 'app-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.css'],
	encapsulation: ViewEncapsulation.None
})

export class TableComponent implements OnInit {
	table: CellModel[][];
	animation: boolean = false;
	activePlayer: PlayerModel;
	players: PlayerModel[];

	constructor(private playerService: PlayerService) {}

	ngOnInit() {
		this.table = this.createTable();
		this.activePlayer = this.playerService.activePlayer;
		this.activePlayerSubscriber();
		this.players = this.playerService.getPlayers();
	}

	activePlayerSubscriber(): void {
		this.playerService.$activePlayer.asObservable()
			.subscribe(player => this.activePlayer = player);
	}

	onClick(el: Element, col: number): void {
		if (!this.animation) {
			this.addPeg(el, col);
		}
	}

	async addPeg(el: Element, col: number) {
		const lastIndexOfTable: number = this.table.length - 1;
		for (let row: number = lastIndexOfTable; row >= 0; row--) {
			if (this.table[row][col].player === null) {
				await this.animatePeg(el, col, row);
				this.table[row][col].player = this.activePlayer;
				if (this.checkWin(this.activePlayer.name, this.table[row][col])) {
					setTimeout(() => {
						const msg: string = `Congratulations, ${this.activePlayer.name}. Would you like to play again?`;
						if (window.confirm(msg)) {
							this.table = this.createTable();
							this.playerService.resetActivePlayer();
						} else {
							this.playerService.finishGame();
						}
					}, 100);
					break;
				}
				break;
			}
		}
	}

	animatePeg(el: Element, col: number, row: number): Promise<boolean> {
		return new Promise((res) => {
			this.animation = true;
			const animationDuration: string = (((row + 1) / 6) / 1.5).toFixed(2);
			let yPos = (row + 1) * 55;
			if (row === 0) {
				yPos += 4;
			}
			const showDisplay: string = 'display:block;';
			const transition: string = `transition: all ${animationDuration}s ease-in;`;
			const transform: string = `transform: translate(-1px, ${yPos}px)`;
			el.setAttribute('style', showDisplay + transition + transform);
			setTimeout(() => {
				el.removeAttribute('style');
				this.animation = false;
				res(true);
			}, (Number(animationDuration) * 1000));
		});
	}

	checkWin(player: string, cell: CellModel): boolean {
		let count: number = 0;
		if (it(player, cell, 'left', 'right')) {
			return true;
		}
		if (it(player, cell, 'top', 'bottom')) {
			return true;
		}
		if (it(player, cell, 'topLeft', 'bottomRight')) {
			return true;
		}
		if (it(player, cell, 'topRight', 'bottomLeft')) {
			return true;
		}
		this.playerService.nextPlayer();
		return false;

		function it(p: string, c: CellModel, pos: string, opPos: string): boolean {
			if (count === 4) {
				return true;
			}
			if (!c || !c.player || c.player.name !== p) {
				if (opPos === null) {
					count = 0;
					return false;
				}
				return it(p, cell[opPos], opPos, null);
			} else {
				count++;
				return it(p, c[pos], pos, opPos);
			}
		}
	}

	reset(): void {
		this.table = this.createTable();
		this.playerService.resetActivePlayer();
	}

	exit(): void {
    this.playerService.finishGame();
  }

	createTable(): CellModel[][] {
		const table: CellModel[][] = [];
		const totalRows: number = 6;
		const totalCols: number = 7;
		for (let row: number = 0; row < totalRows; row++) {
			table.push([]);
			for (let col = 0; col < totalCols; col++) {
				table[row].push({
					left: null,
					right: null,
					bottom: null,
					top: null,
					topLeft: null,
					topRight: null,
					bottomLeft: null,
					bottomRight: null,
					player: null
				});
			}
		}
		for (let row: number = 0; row < totalRows; row++) {
			for (let col: number = 0; col < totalCols; col++) {
				table[row][col].left = col > 0 ? table[row][col - 1] : null;
				table[row][col].right = col < totalCols - 1 ? table[row][col + 1] : null;
				table[row][col].bottom = row < totalRows - 1 ? table[row + 1][col] : null;
				table[row][col].top = row > 0 ? table[row - 1][col] : null;
				table[row][col].topLeft = row > 0 && col > 0 ? table[row - 1][col - 1] : null;
				table[row][col].topRight = row > 0 && col < totalCols - 1 ? table[row - 1][col + 1] : null;
				table[row][col].bottomLeft = row < totalRows - 1 && col > 0 ? table[row + 1][col - 1] : null;
				table[row][col].bottomRight = row < totalRows - 1 && col < totalCols - 1 ? table[row + 1][col + 1] : null;
			}
		}
		return table;
	}
}
