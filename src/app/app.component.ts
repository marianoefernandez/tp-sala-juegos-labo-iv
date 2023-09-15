import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tp-sala-juegos-labo-iv';

  constructor(private router:Router) 
  {
    
  }

  public navigate(url:string)
  {
    this.router.navigateByUrl(url);
  }
}