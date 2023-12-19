import { Component, Input } from '@angular/core';
import { GameService } from '../services/game.service';
import { Subscription } from 'rxjs';
import { Player } from 'src/models/player';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';

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

  getVisiblePlayers(): Player[] {
    if (this.players.length <= 5) {
      return this.players;
    }

    const visiblePlayers = [];
    const startIndex = this.currentPlayer - 1 < 0 ? this.players.length - 1 : this.currentPlayer - 1;
    for (let i = 0; i < 5; i++) {
      const index = (startIndex + i) % this.players.length;
      visiblePlayers.push(this.players[index]);
    }
    return visiblePlayers;
  }

  trackByPlayers(index: number, player: Player): any {
    return player.id;
  }
}
