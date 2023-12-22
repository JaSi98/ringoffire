import { Player } from "./player";
export class Game {
    public players: Player[] = [];
    public stack: string[] = [];
    public playedCards: string[] = [];
    public currentPlayer: number = 0;
    public displayStack: string[] = [];
    public currentRule: { title: string; description: string } = { 'title': '', 'description': '' };
    public pickCardAnimation: boolean = false;
    public currentCard: string = '';

    constructor() {
        for (let i = 1; i < 14; i++) {
            this.stack.push('ace_' + i);
            this.stack.push('clubs_' + i);
            this.stack.push('diamonds_' + i);
            this.stack.push('hearts_' + i);
        }
        this.stack = shuffleArray(this.stack)
        this.displayStack = removeLastFromDisplayStack(this.stack);
    }
}

function shuffleArray<T>(array: T[]): T[] {
    // Kopie des Arrays erstellen, um das Original-Array nicht zu verändern
    let shuffledArray = [...array];

    // Durch das Array gehen und Elemente zufällig tauschen
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        // Zufälligen Index erzeugen
        let j = Math.floor(Math.random() * (i + 1));

        // Elemente an den Indizes i und j tauschen
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}

function removeLastFromDisplayStack(stack: string[]): string[] {
    let newStack = [...stack];

    if (newStack.length > 0) {
        newStack.pop(); // Entfernt das letzte Element aus dem Stapel
    }
    return newStack; // Gibt das aktualisierte Array zurück
}

