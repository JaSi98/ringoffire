import { Component, Input } from '@angular/core';
import { GameService } from '../services/game.service';
import { Subscription } from 'rxjs';
import { Player } from 'src/models/player';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {
  constructor(private gameService: GameService) {

    this.subscription = this.gameService.getPlayers().subscribe(players => {
      this.players = players;
    });

    this.subscription = this.gameService.getCurrentPlayer().subscribe(currentPlayer => {
      this.currentPlayer = currentPlayer;
    });
  }
  private subscription: Subscription;
  players: Player[] = [];
  currentPlayer: number;


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
