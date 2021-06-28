import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './main/login/login.component';
import { ProfileComponent } from './main/profile/profile.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorServiceService } from './services/interceptor-service.service';
import { RegisterComponent } from './main/register/register.component';
import { DashboardComponent } from './main/dashboard/dashboard.component'
import { NavbarComponent } from './components/navbar/navbar.component';
import { ChatComponent } from './main/chat/chat.component';
import { ChatInputComponent } from './main/chat/components/chat-input/chat-input.component';
import { ChatMessageComponent } from './main/chat/components/chat-message/chat-message.component';
import { ChatroomListComponent } from './main/chat/components/chatroom-list/chatroom-list.component';
import { ChatroomTitlebarComponent } from './main/chat/components/chatroom-titlebar/chatroom-titlebar.component';
import { ChatroomWindowComponent } from './main/chat/components/chatroom-window/chatroom-window.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    DashboardComponent,
    NavbarComponent,
    ChatComponent,
    ChatInputComponent,
    ChatMessageComponent,
    ChatroomListComponent,
    ChatroomTitlebarComponent,
    ChatroomWindowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorServiceService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
