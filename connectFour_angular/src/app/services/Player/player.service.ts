import {Injectable} from '@angular/core';
import {PlayerModel} from '../../models/player.model';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class PlayerService {
	private _activePlayerPosition: number = 0;
	private _players: PlayerModel[] = [{name: null, color: 'red'}, {name: null, color: 'black'}];

	$started: Subject<boolean> = new Subject();
	$activePlayer: Subject<PlayerModel> = new Subject();

	get activePlayer(): any { return this._players[this._activePlayerPosition]; }
	set activePlayer(value: any) {
		this._activePlayerPosition = value;
		this.$activePlayer.next(this._players[this._activePlayerPosition]);
	}

	nextPlayer(): void {
		if (this._activePlayerPosition === 0) {
			this._activePlayerPosition = 1;
		} else {
			this._activePlayerPosition = 0;
		}
		this.$activePlayer.next(this._players[this._activePlayerPosition]);
	}

	startGame(playerNames: string[]) {
		this._players[0].name = playerNames[0];
		this._players[1].name = playerNames[1];
		this.$started.next(true);

	}
  getPlayers(): PlayerModel[] {
	  return this._players;
  }

	finishGame(): void {
		this.$started.next(false);
		this.activePlayer = 0;
	}

	resetActivePlayer(): void {
		this.activePlayer = 0;
	}
}
