import {Component, ElementRef, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';

@Component({
	selector: 'app-peg',
	templateUrl: './peg.component.html',
	styleUrls: ['./peg.component.css'],
	encapsulation: ViewEncapsulation.None
})

export class PegComponent {
	@Input() color: string;
	@Input() invisible: boolean = false;
	@Output() passElement = new EventEmitter<Element>();

	passToParent(el: Element) {
	  this.passElement.emit(el);
  }
}
