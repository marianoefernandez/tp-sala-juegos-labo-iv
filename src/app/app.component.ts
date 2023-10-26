import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner'
import { AutenticacionService } from './servicios/autenticacion.service';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  template: ` <app-home [emailUsuario]="a"></app-home> `,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'tp-sala-juegos-labo-iv';

  constructor(private router:Router,private spinner:NgxSpinnerService,private autenticador:AutenticacionService) 
  {

  }

  async ngOnInit()
  {
    
  }

  public cargando()
  {
    this.spinner.show();
    setTimeout(()=>
    {
      this.spinner.hide();
    },1000)
  }

  public navigate(url:string)
  {
    this.router.navigateByUrl(url);
  }
}
