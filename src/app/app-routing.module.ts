import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TabletopCenterComponent } from './tabletop-center/tabletop-center.component';
import { ToolsComponent } from './tools/tools.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home',     component: HomeComponent},
  {path: 'tabletop', component: TabletopCenterComponent/*, canActivate: [AuthGuard]*/},
  {path: 'tools',    component: ToolsComponent,          canActivate: [AuthGuard]},
  {path: 'login',    component: LoginComponent},
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
