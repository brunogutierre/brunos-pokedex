import { Ability } from "./ability";
import { FlavorText } from "./flavorText";
import { Genera } from "./genera";
import { PokemonType } from "./pokemonType";
import { State } from "./state";

export class Pokemon {
    name?: string;
    id?: number;
    order?: number;

    desc_type?: string;
    types?: any[] = [];
    text_decoration?: string;

    url_image?: string;

    atributes?: any[] = [];
    abilities?: string[] = [];
    biology?: any[] = [];

    evolution?: any[] = [];
    alt_forms?: any[] = [];

    setPokemonBase(pokemon: any) {
        this.name = pokemon.name;
        this.id = pokemon.id;

        this.types = (<PokemonType[]>pokemon.types).sort((a, b) => (a.slote || 0) - (b.slote || 0));
        // TODO: image default
        this.url_image = pokemon.sprites.other.dream_world.front_default || pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default || '';

        this.atributes = pokemon.stats.map((state:State) => new Object({'base': state.base_stat || 0, 'effort': state.effort || 0, 'name': state.stat?.name || ''}));
        this.abilities = pokemon.abilities.map((abi:Ability) => new Object({'name': abi.ability?.name || '', 'hidden': abi.is_hidden || false, 'alot': abi.slot || 0}));
    };

    setSpecies(species: any) {
        this.order = species.order;
        this.desc_type = species.genera.find((gen: Genera) => gen.language?.name === 'en').genus;

        const flavors = species.flavor_text_entries.filter((fla: FlavorText) => fla.language?.name === 'en');
        this.text_decoration = flavors[Math.floor(flavors.lenght * Math.random())];
    };
}