import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {PlayerService} from './services/Player/player.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
	gameStarted: boolean;

	constructor(private playerService: PlayerService) {}

	ngOnInit() {
		this.gameStartedSubscriber();
	}

	gameStartedSubscriber(): void {
		this.playerService.$started
			.subscribe(gameStarted => this.gameStarted = gameStarted);
	}
}
