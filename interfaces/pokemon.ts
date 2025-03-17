export interface PokemonTypeResult {
    name: string;
    url: string;
}
export interface PokemonType {
    count?: number;
    next?: string;
    previous?: string;
    results: PokemonTypeResult[];
}

export interface PokemonListByType {
    pokemon: PokemonTypeResult;
    slot: number;
}