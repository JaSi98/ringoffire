import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Game } from 'src/models/game';
import { GameService } from '../services/game.service';
import { EditModalService } from '../components/editmodal/editmodal.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  constructor(private gameService: GameService, private editModalService: EditModalService) { }
  @ViewChild('newPlayerTemplate', { static: true }) newPlayerTemplate: TemplateRef<any>;
  pickCardAnimation = false;
  currentCard: string = '';
  newPlayerName: string;
  newPlayerAvatar: string;
  newPlayerColor: string;
  public game!: Game;
  choosableAvatars: string[] = ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png'];
  choosableColors = [
    '#FF5733', // Rot
    '#33FF57', // Grün
    '#3357FF', // Blau
    '#FF33F6', // Magenta
    '#F6FF33', // Gelb
    '#33FFF6', // Cyan
    '#FF8333', // Orange
    '#8333FF'  // Violett
  ];
  rules = [
    {
      "title": "Wasserfall",
      "description": "Alle Spieler beginnen zu trinken, und niemand darf aufhören, bis die Person zu ihrer Rechten aufhört."
    },
    {
      "title": "Fragemeister",
      "description": "Der Spieler wird zum Fragemeister. Wer ihm antwortet, muss trinken."
    },
    {
      "title": "Daumenmeister",
      "description": "Der Spieler wird zum Daumenmeister. Wenn er seinen Daumen auf den Tisch legt, müssen alle folgen. Der Letzte trinkt."
    },
    {
      "title": "Kategorien",
      "description": "Der Spieler wählt eine Kategorie, und jeder muss abwechselnd ein Beispiel nennen. Wer zögert oder falsch antwortet, trinkt."
    },
    {
      "title": "Reim",
      "description": "Der Spieler sagt ein Wort, und die anderen müssen reimen. Wer nicht kann, trinkt."
    },
    {
      "title": "Partner",
      "description": "Der Spieler wählt einen Trinkpartner. Wenn einer trinkt, trinkt der andere auch."
    },
    {
      "title": "Himmel",
      "description": "Alle Spieler strecken die Hand in die Luft. Der Letzte trinkt."
    },
    {
      "title": "Schlangen",
      "description": "Alle Spieler müssen auf dem Boden kriechen. Der Letzte trinkt."
    },
    {
      "title": "Jungs",
      "description": "Alle männlichen Spieler trinken."
    },
    {
      "title": "Mädels",
      "description": "Alle weiblichen Spieler trinken."
    },
    {
      "title": "Trinken",
      "description": "Der Spieler trinkt."
    },
    {
      "title": "Verteilen",
      "description": "Der Spieler darf zwei Schlücke an jemanden verteilen."
    },
    {
      "title": "Regel",
      "description": "Der Spieler darf eine Regel aufstellen, die für den Rest des Spiels gilt."
    }
  ];
  currentRule: { title: string; description: string };
  startForbidden: boolean = true;
  showNameError: boolean = false;
  showColorError: boolean = false;
  showAvatarError: boolean = false;
  preventAddPlayer: boolean = true;

  ngOnInit(): void {
    this.newGame();
    this.checkZeroPlayer();
  }

  newGame() {
    this.gameService.startGame();
    this.game = this.gameService.getGame();
  }

  takeCard() {
    if (!this.startForbidden) {
      if (!this.pickCardAnimation) {
        this.currentCard = this.game.stack.pop() ?? '';
        this.pickCardAnimation = true;
        this.getRule();
        this.gameService.nextPlayer();
        setTimeout(() => {
          this.game.playedCards.push(this.currentCard)
          this.pickCardAnimation = false;
        }, 1000);
      }
    }
    else {
      this.checkZeroPlayer();
    }
  }

  getRule() {
    let cardNumber = +this.currentCard.split('_')[1];
    this.currentRule = this.rules[cardNumber - 1];
  }

  checkZeroPlayer() {
    if (this.game.players.length === 0) {
      this.startForbidden = true; // Keine Spieler, Spielstart verboten
      this.openAddPlayer();
    }
    else {
      this.startForbidden = false; // Spieler vorhanden, Spielstart erlaubt
    }
  }


  openAddPlayer() {
    this.editModalService.open(
      'Füge einen neuen Spieler hinzu',
      this.newPlayerTemplate,
      () => this.addPlayer(),
    );
  }

  findActive(arr, val) {
    return arr.find(element => element === val);
  }

  setActive(type, value) {
    let active = this.findActive(type, value);

  }

  selectColor(color) {
    this.newPlayerColor = color;
    this.setActive(this.choosableColors, color)
  }

  selectAvatar(avatar) {
    this.newPlayerAvatar = avatar;
    this.setActive(this.choosableAvatars, avatar)
  }

  addPlayer() {
    if (this.isFormValid()) {
      this.gameService.addPlayer(this.newPlayerName, this.newPlayerAvatar, this.newPlayerColor);
      this.newPlayerName = '';
      this.newPlayerAvatar = '';
      this.newPlayerColor = '';
      this.startForbidden = false;
    }
    else {
      this.openAddPlayer();
    }
  }

  isFormValid() {
    const isNameValid = this.newPlayerName && this.newPlayerName.trim() !== '';
    const isColorValid = !!this.newPlayerColor;
    const isAvatarValid = !!this.newPlayerAvatar

    this.showNameError = !isNameValid;
    this.showColorError = !isColorValid;
    this.showAvatarError = !isAvatarValid;

    if (isNameValid && isColorValid && isAvatarValid) {
      this.preventAddPlayer = false;
      return true;
    } else {
      this.preventAddPlayer = true;
      return false;
    }
  }
}