///<reference path="Requirement.ts"/>

class HatchRequirement extends Requirement {
    constructor( value: number, type: GameConstants.AchievementOption = GameConstants.AchievementOption.more) {
        super(value, type);
    }

    public getProgress() {
        return Math.min(App.game.statistics.totalPokemonHatched(), this.requiredValue);
    }

    public hint(): string {
        return `${this.requiredValue} eggs need to be hatched.`;
    }
}
