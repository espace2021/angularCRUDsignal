import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CategoryComponent } from './categories/category/category.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CategoryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  title = 'angular-project';
}
