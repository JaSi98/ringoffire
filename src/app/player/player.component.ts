import { Component, Input } from '@angular/core';
import { GameService } from '../services/game.service';
import { Subscription } from 'rxjs';
import { Player } from 'src/models/player';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  animations: [
    trigger('playerAnimation', [
      transition('* <=> *', [
        query(':enter', [
          style({ transform: 'translateY(100%)', opacity: 0 }),
          stagger('100ms', animate('300ms ease-out', style({ transform: 'translateY(0)', opacity: 1 })))
        ], { optional: true }),
        query(':leave', [
          stagger('100ms', animate('300ms ease-out', style({ transform: 'translateY(-100%)', opacity: 0 })))
        ], { optional: true })
      ])
    ])
  ]
})
export class PlayerComponent {
  constructor(private gameService: GameService) {

    this.subscription = this.gameService.getGame().subscribe(game => {
      this.game = game;
    });
  }
  game: Game;
  private subscription: Subscription;


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getVisiblePlayers(): Player[] {
    if (this.game?.players?.length <= 5) {
      return this.game.players;
    }

    const visiblePlayers = [];
    const startIndex = this.game?.currentPlayer - 1 < 0 ? this.game?.players.length - 1 : this.game?.currentPlayer - 1;
    for (let i = 0; i < 5; i++) {
      const index = (startIndex + i) % this.game?.players.length;
      visiblePlayers.push(this.game?.players[index]);
    }
    return visiblePlayers;
  }

  trackByPlayers(index: number, player: Player): any {
    return player?.id;
  }
}
