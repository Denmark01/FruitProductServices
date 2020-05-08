import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule, isDevMode } from '@angular/core';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavHeaderComponent } from './containers/nav-header/nav-header.component';
import { NavFooterComponent } from './containers/nav-footer/nav-footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataComponent } from './components/data/data.component';
import { ItemsFruitComponent } from './components/items-fruit/items-fruit.component';
import { GrdFilterPipe } from './grd-filter.pipe';
import { CarouselComponent } from './containers/carousel/carousel.component';
import {SelectModule} from 'ng2-select';
import { SearchBarComponent } from './containers/search-bar/search-bar.component';
import { LoginComponent } from './containers/login/login.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { NgDatepickerModule } from 'ng2-datepicker';
import { DataShareService } from './services/data-share.service';
import { AddCartComponent } from './components/add-cart/add-cart.component';
import { ItemUploadComponent } from './components/item-upload/item-upload.component';
import {AuthGuard} from './auth.guard';
import { AuthInterceptor } from './utils/auth-interceptor';
import {ErrorPageComponent} from './containers/error-page/error-page.component';
import { ServerErrorComponent } from './containers/server-error/server-error.component';
import { FeedbackComponent } from './containers/feedback/feedback.component';
import {NgRedux, NgReduxModule, DevToolsExtension} from 'ng2-redux';
import { IAppState, rootReducer, InitialState } from './store';
import { AngularSvgIconModule } from 'angular-svg-icon';
import {SpinnerComponent} from './containers/spinner/spinner.component';
import { NavHeaderOnlyComponent } from './containers/nav-header-only/nav-header-only.component';

@NgModule({
  declarations: [
    AppComponent,

    NavHeaderComponent,
    NavFooterComponent,
    DataComponent,
    ItemsFruitComponent,
    GrdFilterPipe,
    CarouselComponent,
    SearchBarComponent,
    LoginComponent,
    AddCartComponent,
    ItemUploadComponent,
    ErrorPageComponent,
    ServerErrorComponent,
    FeedbackComponent,
    SpinnerComponent,
    NavHeaderOnlyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    SelectModule,
    NgxFileDropModule,
    HttpClientModule,
    NgReduxModule,
    AngularSvgIconModule,
    CommonModule
    // NgDatepickerModule
  ],
  providers: [AuthGuard,
    DataShareService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
       ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    ngRedux: NgRedux<IAppState>,
    devTools: DevToolsExtension) {
    const enhancers = isDevMode() ? [devTools.enhancer()] : [devTools.enhancer()] ;
    ngRedux.configureStore(rootReducer, InitialState, [], enhancers);
  }
}
