import { Component} from "@angular/core";
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'app';

  constructor(public _authService: AuthService) { }

  changeHeader(size = 50) {
    const header = <HTMLDivElement>document.querySelector('.top-bar');
    const logo = <HTMLImageElement>header.querySelector('.menu img');
    header.style.maxHeight = size + 'px';
    logo.style.height = size + 'px';
  }
}
