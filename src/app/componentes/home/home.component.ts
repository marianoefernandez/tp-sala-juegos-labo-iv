import { Component, OnInit} from '@angular/core';
import {AutenticacionService} from '../../servicios/autenticacion.service'
import { Router } from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']  
})
export class HomeComponent implements OnInit{

  constructor(private router:Router,private autenticador:AutenticacionService,private spinner:NgxSpinnerService)
  {  

  }

  async ngOnInit() 
  {

  }

  public usuarioLogueado = this.autenticador.obtenerUsuarioLogueado();

  public navigate(url:string)
  {
    this.router.navigateByUrl(url);
  }
}
