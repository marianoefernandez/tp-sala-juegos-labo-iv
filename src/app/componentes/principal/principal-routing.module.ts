import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

const routes: Routes = 
[
  {
    path:'',
    component:NavbarComponent,
    children:
    [
      {
        path:'',
        redirectTo:'home',
        pathMatch:"full"
      },      
      {
        path:'home',
        loadChildren: () => import('../home/home.module').then(modelos => modelos.HomeModule),
      },
      {
        path:'chat',
        loadChildren: () => import('../chat/chat.module').then(modelos => modelos.ChatModule),
      },
      {
        path:'juegos',
        loadChildren: () => import('../juegos/juegos.module').then(modelos => modelos.JuegosModule),
      },
      {
        path:'quien-soy',
        loadChildren: () => import('../quien-soy/quien-soy.module').then(modelos => modelos.QuienSoyModule),
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrincipalRoutingModule { }
