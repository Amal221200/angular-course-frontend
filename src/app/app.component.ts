import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent], // Import your Component and pass it inside this imports array
  templateUrl: './app.component.html', // Link to your html file
  styleUrl: './app.component.scss' // Link to yoyr css file
})
export class AppComponent {
  title = 'tutorial';
}
