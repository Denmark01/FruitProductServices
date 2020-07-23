import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DataComponent } from './components/data/data.component';
import { ItemsFruitComponent } from './components/items-fruit/items-fruit.component';
import { LoginComponent } from './containers/login/login.component';
import { AddCartComponent } from './components/add-cart/add-cart.component';
import { ItemUploadComponent } from './components/item-upload/item-upload.component';
import { AuthGuard } from './auth.guard';
import { ErrorPageComponent } from './containers/error-page/error-page.component';
import { ServerErrorComponent } from './containers/server-error/server-error.component';
import { FeedbackComponent } from './containers/feedback/feedback.component';

const routes: Routes = [
  {
    path: '',
    component: ItemsFruitComponent,
    // canActivate: [AuthGuard]
  },
          { path: 'login', component: LoginComponent },
          { path: 'data', component: DataComponent },
          { path: 'login', component: LoginComponent },
          { path: 'signup', component: LoginComponent },
          { path: 'cart', component: AddCartComponent },
          { path: 'upload', component: ItemUploadComponent },
          { path: 'error', component: ErrorPageComponent },
          { path: 'server/:code', component: ServerErrorComponent},
           { path: 'feedback', component: FeedbackComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})


export class AppRoutingModule { }
