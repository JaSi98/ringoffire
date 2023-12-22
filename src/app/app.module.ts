import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { GameComponent } from './game/game.component';
import { PlayerComponent } from './player/player.component';
import { TextInputComponent } from './components/text-input/text-input.component';
import { ButtonComponent } from './components/button/button.component';
import { TextareaInputComponent } from './components/textarea-input/textarea-input.component';
import { CardComponent } from './components/card/card.component';
import { EditmodalComponent } from './components/editmodal/editmodal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

@NgModule({
  declarations: [
    AppComponent,
    StartScreenComponent,
    GameComponent,
    PlayerComponent,
    TextInputComponent,
    ButtonComponent,
    TextareaInputComponent,
    EditmodalComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp({"projectId":"ring-of-fire-7868e","appId":"1:781575756973:web:04ea747ba0cd7d7b3dba24","databaseURL":"https://ring-of-fire-7868e-default-rtdb.europe-west1.firebasedatabase.app","storageBucket":"ring-of-fire-7868e.appspot.com","apiKey":"AIzaSyDPctkqY7WAp8DBAV4c4b2zHvthQjgq5j4","authDomain":"ring-of-fire-7868e.firebaseapp.com","messagingSenderId":"781575756973"})),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
