import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../services/game.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent {
  subscription = new Subscription;


  constructor(private router: Router, private gameService: GameService) {
    this.subscription = this.gameService.getGameId().subscribe(gameId => {
      this.router.navigateByUrl('game/' + gameId)
    });
  }

  newGame() {
    this.gameService.startGame();
  }
}
