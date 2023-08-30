import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LoginComponent } from './components/welcome/login/login.component';
import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { LoadingspinnerComponent } from './components/shared/loadingspinner/loadingspinner.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ProgressBarComponent } from './components/shared/progress-bar/progress-bar.component';
import { ProgressBarModule } from 'primeng/progressbar';
import { RegisterComponent } from './components/welcome/register/register.component';
import { FieldsetModule } from 'primeng/fieldset';
import { DropdownModule } from 'primeng/dropdown';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddTokenInterceptor } from './helpers/add-token.interceptor';
import { ActivateComponent } from './components/welcome/activate/activate.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmdioalogComponent } from './components/shared/confirmdioalog/confirmdioalog.component';
import { HeaderComponent } from './components/dashboard/header/header.component';
import { BadgeModule } from 'primeng/badge';
import { MainComponent } from './components/dashboard/main/main.component';
import { DataViewModule, DataViewLayoutOptions } from 'primeng/dataview';
import { InputNumberModule } from 'primeng/inputnumber';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { RegisterProductComponent } from './components/dashboard/register-product/register-product.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import { SkeletonModule } from 'primeng/skeleton';
import { MyproductsComponent } from './components/dashboard/myproducts/myproducts.component';
import { ImageModule } from 'primeng/image';
import { AccordionModule } from 'primeng/accordion';
import { ProductComponent } from './components/dashboard/product/product.component';
import { EditproductComponent } from './components/dashboard/myproducts/editproduct/editproduct.component';
import { FileSaverModule } from 'ngx-filesaver';
@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    LoadingspinnerComponent,
    ProgressBarComponent,
    RegisterComponent,
    DashboardComponent,
    ActivateComponent,
    ConfirmdioalogComponent,
    HeaderComponent,
    MainComponent,
    RegisterProductComponent,
    MyproductsComponent,
    ProductComponent,
    EditproductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    CalendarModule,
    BrowserAnimationsModule,
    FormsModule,
    InputTextModule,
    MenubarModule,
    CardModule,
    DividerModule,
    CheckboxModule,
    RadioButtonModule,
    PasswordModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    ProgressBarModule,
    FieldsetModule,
    DropdownModule,
    HttpClientModule,
    ToastModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    BadgeModule,
    DataViewModule,
    RatingModule,
    TagModule,
    InputNumberModule,
    InputTextareaModule,
    FileUploadModule,
    SkeletonModule,
    ImageModule,
    AccordionModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi: true },
    ConfirmationService,
    MessageService,
    DataViewLayoutOptions,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
