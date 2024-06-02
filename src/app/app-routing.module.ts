import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LoginComponent } from './components/welcome/login/login.component';
import { RegisterComponent } from './components/welcome/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ActivateComponent } from './components/welcome/activate/activate.component';
import { AuthGUard } from './helpers/auth.guard';
import { RegisterProductComponent } from './components/dashboard/register-product/register-product.component';
import { MainComponent } from './components/dashboard/main/main.component';
import { MyproductsComponent } from './components/dashboard/myproducts/myproducts.component';
import { ProductComponent } from './components/dashboard/product/product.component';
import { EditproductComponent } from './components/dashboard/myproducts/editproduct/editproduct.component';
import { EditUserComponent } from './components/dashboard/edit-user/edit-user.component';
import { ResetPasswordComponent } from './components/welcome/reset-password/reset-password.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'welcome',
    component: WelcomeComponent,

    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'activate/:url',
        component: ActivateComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      
      {
        path:"reset-password/:url",
        component:ResetPasswordComponent
      },

      {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'dashboard',
    canActivate: [AuthGUard],
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: MainComponent,
      },
      {
        path: 'edituser',
        component: EditUserComponent,
      },
      {
        path: 'sell',
        component: RegisterProductComponent,
      },
      {
        path: 'myproducts',

        children: [
          {
            path: '',
            component: MyproductsComponent,
          },
          {
            path: 'myproduct/:id',
            component: EditproductComponent,
          },
          {
            path: '**',
            pathMatch: 'full',
            redirectTo: '/dashboard/myproducts',
          },
        ],
      },
      {
        path: 'product/:id',
        component: ProductComponent,
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },

  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
