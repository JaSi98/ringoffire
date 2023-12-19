import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Game } from 'src/models/game';
import { Player } from 'src/models/player';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private game: any;
  private playersSubject = new BehaviorSubject<Player[]>([]);
  private currentPlayerSubject = new BehaviorSubject<number>(0);

  startGame() {
    this.game = new Game();
    this.playersSubject.next(this.game.players);
  }

  getGame() {
    return this.game;
  }

  getCurrentPlayer() {
    return this.currentPlayerSubject.asObservable();
  }

  getPlayers() {
    return this.playersSubject.asObservable();
  }

  addPlayer(name: string, avatar: string, color: string) {
    let newPlayer = new Player(name, avatar, color);
    this.game.players.push(newPlayer);
  }

  nextPlayer() {
    this.game.currentPlayer++;
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
    this.currentPlayerSubject.next(this.game.currentPlayer);
  }
}
