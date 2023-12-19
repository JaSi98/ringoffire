export class Player {
    public id: number;
    public name: string;
    public avatar: string;
    public color: string;

    private static counter = 0;

    constructor(name: string, avatar: string, color: string) {
        this.id = Player.generateId();
        this.name = name;
        this.avatar = avatar;
        this.color = color;
    }

    private static generateId(): number {
        return Date.now() + Player.counter++;
    }
}