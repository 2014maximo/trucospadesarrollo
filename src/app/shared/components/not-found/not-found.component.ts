import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  template: `
    <div class="not-found-container">
      <h1>404</h1>
      <h2>Página no encontrada</h2>
      <p>Lo sentimos, la página que estás buscando no existe.</p>
      <a routerLink="/">Volver al inicio</a>
    </div>
  `,
  styles: [`
    .not-found-container {
      text-align: center;
      padding: 50px;
      h1 {
        font-size: 72px;
        margin: 0;
        color: #e74c3c;
      }
      h2 {
        font-size: 24px;
        margin: 20px 0;
      }
      a {
        display: inline-block;
        margin-top: 20px;
        padding: 10px 20px;
        background-color: #3498db;
        color: white;
        text-decoration: none;
        border-radius: 5px;
        &:hover {
          background-color: #2980b9;
        }
      }
    }
  `],
  standalone: true,
  imports: [RouterLink]
})
export class NotFoundComponent {}