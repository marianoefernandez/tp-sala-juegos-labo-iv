import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.css']
})
export class JuegosComponent {

  constructor(private router:Router)
  {

  }
  
  public navigate(url:string)
  {
    this.router.navigateByUrl(url);
  }
}
