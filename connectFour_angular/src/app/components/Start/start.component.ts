import {Component} from '@angular/core';
import {PlayerService} from '../../services/Player/player.service';

@Component({
	selector: 'app-start',
	templateUrl: './start.component.html',
	styleUrls: ['./start.component.css']
})
export class StartComponent {
	playerOne: string;
	playerTwo: string;

	constructor(private playerService: PlayerService) {}

	handleClick(): void {
		const regTest: RegExp = /\w/g;
		if (!regTest.test(this.playerOne) || !regTest.test(this.playerTwo)) {
			alert('PLEASE ENTER YOUR NAMES BEFORE PROCEEDING');
			return;
		}
		if (this.playerOne === this.playerTwo) {
			alert('YOU CAN NOT HAVE THE SAME NAME AS PLAYER 1, PLEASE CHANGE YOUR NAME');
			return;
		}
		this.playerService.startGame([this.playerOne, this.playerTwo]);
	}

}

