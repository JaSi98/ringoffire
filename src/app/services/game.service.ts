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
  private currentPlayerDataSubject = new BehaviorSubject<Player>(null);
  private gameIsOverSubject = new BehaviorSubject<boolean>(false);
  private previousGame: Game;

  startGame() {
    this.game = new Game();
    this.playersSubject.next(this.game.players);
    this.currentPlayerDataSubject.next(this.game.players[this.game.currentPlayer]);
  }

  resetGame() {
    this.previousGame = this.game;
    this.game = new Game;
    this.game.players = this.previousGame.players;
    this.playersSubject.next(this.game.players);
    this.currentPlayerDataSubject.next(this.game.players[this.game.currentPlayer]);
  }

  isGameOver() {
    if (this.game.stack.length == 0) {
      this.gameIsOverSubject.next(true);
    }
  }

  getGame() {
    return this.game;
  }

  getCurrentPlayer() {
    return this.currentPlayerSubject.asObservable();
  }

  getCurrentPlayerData() {
    return this.currentPlayerDataSubject.asObservable();
  }

  getPlayers() {
    return this.playersSubject.asObservable();
  }

  gameIsOver() {
    return this.gameIsOverSubject.asObservable();
  }

  addPlayer(name: string, avatar: string, color: string) {
    let newPlayer = new Player(name, avatar, color);
    this.game.players.push(newPlayer);
  }

  nextPlayer() {
    this.game.currentPlayer++;
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
    this.currentPlayerSubject.next(this.game.currentPlayer);
    this.currentPlayerDataSubject.next(this.game.players[this.game.currentPlayer]);
  }
}
