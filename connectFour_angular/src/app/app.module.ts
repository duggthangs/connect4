import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {AppComponent} from './app.component';
import {StartComponent} from './components/Start/start.component';
import {PegComponent} from './components/Peg/peg.component';
import {PlayerService} from './services/Player/player.service';
import {TableComponent} from './components/Table/table.component';



@NgModule({
	declarations: [
		AppComponent,
		StartComponent,
		PegComponent,
		TableComponent
	],
	imports: [
		BrowserModule,
		FormsModule
	],
	providers: [
		PlayerService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
