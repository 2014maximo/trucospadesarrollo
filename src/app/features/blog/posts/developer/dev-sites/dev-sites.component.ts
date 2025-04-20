import { Component } from '@angular/core';
import { FooterHomeComponent } from 'src/app/shared/components/footer-home/footer-home.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';

@Component({
  selector: 'app-dev-sites',
  imports: [
    FooterHomeComponent,
    HeaderComponent],
  templateUrl: './dev-sites.component.html',
  styleUrl: './dev-sites.component.css'
})
export class DevSitesComponent {

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

}
