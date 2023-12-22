import { Injectable } from '@angular/core';
import { onSnapshot, doc, Firestore, updateDoc, addDoc, collection } from '@angular/fire/firestore';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject, Subject, filter, map } from 'rxjs';
import { Game } from 'src/models/game';
import { Player } from 'src/models/player';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  constructor(private router: Router, private firestore: Firestore, private activatedRoute: ActivatedRoute) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let route = this.activatedRoute;
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      filter(route => route.outlet === 'primary'),
      map(route => route.snapshot.params['id'])
    ).subscribe(gameId => this.gameId = gameId);
  }
  private game: any;
  private gameSubject = new Subject<Game>();
  private gameIdSubject = new Subject<string>();
  private playersSubject = new BehaviorSubject<Player[]>([]);
  private currentPlayerSubject = new BehaviorSubject<number>(0);
  private currentPlayerDataSubject = new BehaviorSubject<Player>(null);
  private gameIsOverSubject = new BehaviorSubject<boolean>(false);
  private previousGame: Game;
  private gameId = this.getActualRouteID();
  private unsubGame;

  getActualRouteID() {
    const urlSegment = this.router.url.split('/');
    // Angenommen, die URL-Struktur ist "/game/:id"
    const idIndex = urlSegment.indexOf('game') + 1;
    return idIndex < urlSegment.length ? urlSegment[idIndex] : null;
  }

  async startGame() {
    this.game = new Game();
    await this.newGame(this.game);
    this.loadGame();
    this.playersSubject.next(this.game.players);
    this.currentPlayerDataSubject.next(this.game.players[this.game.currentPlayer]);
  }

  getGameId() {
    return this.gameIdSubject.asObservable();
  }

  async loadGame() {
    if (this.gameId) {
      this.unsubGame = await this.subGame(this.gameId);
    }
  }

  resetGame() {
    this.previousGame = this.game;
    this.game = new Game;
    this.game.players = this.previousGame.players;
    this.updateGame(this.game);
    this.playersSubject.next(this.game.players);
    this.currentPlayerDataSubject.next(this.game.players[this.game.currentPlayer]);
  }

  isGameOver() {
    if (this.game.stack.length == 0) {
      this.gameIsOverSubject.next(true);
    }
  }


  async updateGame(updatedGame) {
    this.game = updatedGame;
    const gameRef = doc(this.firestore, 'games', this.gameId);
    await updateDoc(gameRef, this.getCleanJson(this.game));
    this.gameSubject.next(this.game);
    this.currentPlayerSubject.next(this.game.currentPlayer);
    this.currentPlayerDataSubject.next(this.game.players[this.game.currentPlayer]);
  }


  getGame() {
    return this.gameSubject.asObservable();
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
    this.updateGame(this.game)
  }

  nextPlayer() {
    this.game.currentPlayer++;
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
    this.updateGame(this.game)
  }

  subGame(gameId) {
    return onSnapshot(doc(this.firestore, 'games', gameId), (game) => {
      let loadedGame = this.setGameObject(game.data());
      this.game = loadedGame;
      this.gameSubject.next(this.game);
      this.playersSubject.next(this.game.players);
      this.currentPlayerDataSubject.next(this.game.players[this.game.currentPlayer]);
    });
  }

  async newGame(game: Game) {
    try {
      const gameRef = await addDoc(collection(this.firestore, 'games'), this.getCleanJson(game));
      this.gameIdSubject.next(gameRef.id)
    } catch (err) {
      console.error(err);
    }
  }

  getCleanJson(game: Game): {} {
    return {
      players: game.players.map(player => this.convertPlayerToJson(player)),
      stack: game.stack,
      playedCards: game.playedCards,
      currentPlayer: game.currentPlayer,
      displayStack: game.displayStack,
      currentRule: game.currentRule,
      pickCardAnimation: game.pickCardAnimation,
      currentCard: game.currentCard
    };
  }

  convertPlayerToJson(player: Player): {} {
    return {
      name: player.name,
      avatar: player.avatar,
      color: player.color
    };
  }

  setGameObject(obj: any): Game {
    return {
      players: obj.players,
      stack: obj.stack,
      playedCards: obj.playedCards,
      currentPlayer: obj.currentPlayer,
      displayStack: obj.displayStack,
      currentRule: obj.currentRule,
      pickCardAnimation: obj.pickCardAnimation,
      currentCard: obj.currentCard
    }
  }
}
