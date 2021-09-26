import { Util } from "../util/Util";
import { Ability } from "./ability";
import { FlavorText } from "./flavorText";
import { Genera } from "./genera";
import { PokemonType } from "./pokemonType";
import { State } from "./state";

export class Pokemon {
    name: string;
    id: number;
    evolution_id?: number | string | null;
    order?: number;

    desc_type?: string;
    types: any[] = [];
    text_decoration: string = '';

    url_image: string;
    url_image_mini: string;

    atributes: any[] = [];
    abilities: any[] = [];
    biology: any = {};

    alt_forms?: any[] = [];

    constructor(pokemon: any) {
        this.name = pokemon.name;
        this.id = pokemon.id;

        this.types = (<PokemonType[]>pokemon.types).sort((a, b) => (a.slote || 0) - (b.slote || 0));
        // TODO: image default
        this.url_image = pokemon.sprites.other.dream_world.front_default || pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default || '';
        this.url_image_mini = pokemon.sprites.front_default || '';

        this.atributes = pokemon.stats.map((state:State) => new Object({'base': state.base_stat || 0, 'effort': state.effort || 0, 'name': state.stat?.name || ''}));
        this.abilities = pokemon.abilities.map((abi:Ability) => new Object({'name': abi.ability?.name || '', 'hidden': abi.is_hidden || false, 'alot': abi.slot || 0}));

        this.biology.height = pokemon.height;
        this.biology.weight = pokemon.weight;
    }

    setSpecies(species: any) {
        this.evolution_id = Util.getIdFromUrl(species.evolution_chain.url);
        this.order = species.order;
        this.desc_type = species.genera.find((gen: Genera) => gen.language?.name === 'en').genus;

        let flavors = species.flavor_text_entries.filter((fla: FlavorText) => fla.language?.name === 'en');
        this.text_decoration = this.formatTextDecoration(flavors[Math.floor(flavors.length * Math.random())].flavor_text);

        this.biology.color = species.color.name;
        this.biology.shape = species.shape.name;
        this.biology.habitat = species.habitat.name;

        this.alt_forms = species.varieties.map(((variety: { pokemon: { url: string; }; }) => Util.getIdFromUrl(variety.pokemon.url)));
    }

    hasSpecies(): boolean {
        return this.desc_type? true : false;
    }

    formatTextDecoration(text: string): string {
        if (text) {
            return text.replace(/\n/g, ' ').replace(/\f/g, ' ').toLowerCase();
        }

        return '';
    }
}
