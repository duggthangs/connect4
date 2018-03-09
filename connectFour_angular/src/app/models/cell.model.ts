import {PlayerModel} from './player.model';

export interface CellModel {
	left: CellModel;
	right: CellModel;
	bottom: CellModel;
	top: CellModel;
	topLeft: CellModel;
	topRight: CellModel;
	bottomLeft: CellModel;
	bottomRight: CellModel;
	player: PlayerModel;
}
