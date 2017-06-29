/**
 * Information about the player.
 * All player variables need to be saved.
 */

class Player {


    private static _money: KnockoutObservable<number> = ko.observable(0);
    private static _dungeonTokens: number = 0;
    private static _caughtPokemonList: CaughtPokemon[] = [];
    private static _route: KnockoutObservable<number> = ko.observable(2);
    private static _routeKills: KnockoutObservable<number[]> = ko.observable(Array.apply(null, Array(GameConstants.AMOUNT_OF_ROUTES)).map(Number.prototype.valueOf, 0));
    private static _routeKillsNeeded: KnockoutObservable<number> = ko.observable(10);
    private static _region: GameConstants.Region = GameConstants.Region.kanto;
    private static _gymBadges: GameConstants.Badge[] = [GameConstants.Badge.Boulder];
    private static _pokeballs: number[] = [0, 0, 0, 0];
    private static _shinyList: boolean[] =  Array.apply(null, Array(GameConstants.AMOUNT_OF_POKEMONS)).map(Boolean.prototype.valueOf, false);

    private static _notCaughtBallSelection: GameConstants.Pokeball = GameConstants.Pokeball.Masterball;
    private static _alreadyCaughtBallSelection: GameConstants.Pokeball = GameConstants.Pokeball.Pokeball;

    public static clickAttackObservable: KnockoutComputed<number> = ko.computed(function () {
        return Player.calculateClickAttack()
    });

    public static pokemonAttackObservable: KnockoutComputed<number> = ko.computed(function () {
        return Player.calculatePokemonAttack(GameConstants.PokemonType.None, GameConstants.PokemonType.None);
    });

    public static routeKillsObservable: KnockoutComputed<number> = ko.computed(function () {
        return Player.routeKills()[Player.route()];
    });

    public static addRouteKill(){
        Player.routeKills()[Player.route()]++
    }

    /**
     * Calculate the attack of all your Pokémon
     * @param type1
     * @param type2 types of the enemy we're calculating damage against.
     * @returns {number} damage to be done.
     */
    public static calculatePokemonAttack(type1: GameConstants.PokemonType, type2: GameConstants.PokemonType): number {
        // TODO Calculate pokemon attack by checking the caught list, upgrades and multipliers.
        // TODO factor in types
        return 1;
    }

    public static calculateClickAttack(): number {
        // TODO Calculate click attack by checking the caught list size, upgrades and multipliers.
        return 2;
    }

    public static calculateMoneyMultiplier(): number {
        // TODO Calculate money multiplier by checking upgrades and multipliers.
        return 1;
    }

    public static calculateExpMultiplier(): number {
        // TODO Calculate exp multiplier by checking upgrades and multipliers.
        return 1;
    }

    public static calculateDungeonTokenMultiplier(): number {
        // TODO Calculate dungeon token multiplier by checking upgrades and multipliers.
        return 1;
    }

    public static calculateCatchTime(): number {
        // TODO Calculate catch time by checking upgrades and multipliers.
        return 2000;
    }

    /**
     * Checks the players preferences to see what pokéball needs to be used on the next throw.
     * Checks from the players pref to the most basic ball to see if the player has any.
     * @param alreadyCaught if the pokémon is already caught.
     * @returns {GameConstants.Pokeball} pokéball to use.
     */
    public static calculatePokeballToUse(alreadyCaught: boolean): GameConstants.Pokeball {
        let pref: GameConstants.Pokeball;
        if (alreadyCaught) {
            pref = this._alreadyCaughtBallSelection;
        } else {
            pref = this._notCaughtBallSelection;
        }

        let use: GameConstants.Pokeball.Pokeball;

        for (let i: number = pref; i >= 0; i--) {
            if (this._pokeballs[i] > 0) {
                use = i;
                break;
            }
        }
        return use;
    }


    /**
     * Loops through the caughtPokemonList to check if the pokémon is already caight
     * @param pokemonName name to search for.
     * @returns {boolean}
     */
    public static alreadyCaughtPokemon(pokemonName: string) {
        for (let i: number = 0; i < this.caughtPokemonList.length; i++) {
            if (this.caughtPokemonList[i].name == pokemonName) {
                return true;
            }
        }
        return false;
    }

    public static capturePokemon(pokemonName:string, shiny:boolean = false){
        if(!this.alreadyCaughtPokemon(pokemonName)){
            let caughtPokemon: CaughtPokemon = new CaughtPokemon(pokemonName, false, 0, 0);
            this.caughtPokemonList.push(caughtPokemon);
        }
    }

    public static hasBadge(badge: GameConstants.Badge) {
        if (badge == undefined || GameConstants.Badge.None) {
            return true;
        }
        for (let i = 0; i < this._gymBadges.length; i++) {
            if (this._gymBadges[i] == badge) {
                return true;
            }
        }
        return false;
    }

    static gainMoney(money: number) {
        // TODO add money multipliers
        this._money(Math.floor(this._money() + money));
    }

    static gainExp(exp: number) {
        // TODO add exp multipliers
    }

    static get routeKills(): KnockoutObservable<number[]> {
        return this._routeKills;
    }

    static set routeKills(value: KnockoutObservable<number[]>) {
        this._routeKills = value;
    }

    static usePokeball(pokeBall:GameConstants.Pokeball) : void{
        this._pokeballs[pokeBall]--;
    }

    static get routeKillsNeeded(): KnockoutObservable<number> {
        return this._routeKillsNeeded;
    }

    static set routeKillsNeeded(value: KnockoutObservable<number>) {
        this._routeKillsNeeded = value;
    }

    static get route(): KnockoutObservable<number> {
        return this._route;
    }

    static set route(value: KnockoutObservable<number>) {
        this._route = value;
    }

    public static get money(): number {
        return this._money();
    }

    public static get dungeonTokens(): number {
        return this._dungeonTokens;
    }

    public static get caughtPokemonList() {
        return this._caughtPokemonList;
    }

    static get region(): GameConstants.Region {
        return this._region;
    }

    static set region(value: GameConstants.Region) {
        this._region = value;
    }

    static get pokeballs(): number[] {
        return this._pokeballs;
    }

    static set pokeballs(value: number[]) {
        this._pokeballs = value;
    }

    static get gymBadges(): GameConstants.Badge[] {
        return this._gymBadges;
    }

    static set gymBadges(value: GameConstants.Badge[]) {
        this._gymBadges = value;
    }

    static get shinyList(): boolean[] {
        return this._shinyList;
    }

    static set shinyList(value: boolean[]) {
        this._shinyList = value;
    }
}

