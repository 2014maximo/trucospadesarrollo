import { Component, Input } from '@angular/core';

@Component({
  selector: 'go-up',
  imports: [],
  templateUrl: './go-up.component.html',
  styleUrl: './go-up.component.css'
})
export class GoUpComponent {

  @Input() target!: HTMLElement;

  scroll() {
    this.target.scrollIntoView();
  }

}
