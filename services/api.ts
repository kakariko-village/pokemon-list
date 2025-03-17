import axios from 'axios';
import {PokemonListByType} from '@/interfaces/pokemon';

export const getAllPokemonTypes = async() => {
    const BASE_URL = process.env.NEXT_PUBLIC_API_BASE;
    try {
        const response = await axios.get(`${BASE_URL}type`);
        if(response) {
            return response.data.results;
        }
        return;
    }
    catch (err) {
        console.log(err)
    }
}

export const getPokemonList = async (url: string) => {
    try {
        const response = await axios.get(url);
        if(response) {
            return response.data;
        }
        return;
    }
    catch (err) {
        console.log(err)
    }
}

export const getImageUrl = async ( url: string) => {
    try {
        const response = await axios.get(url);
        if(response) {
            return response.data?.sprites?.other?.showdown?.front_default;
        }
        return;
    }
    catch (err) {
        console.log(err)
    }
}

export const getPokemonByType = async (type: string) => {
    const BASE_URL = process.env.NEXT_PUBLIC_API_BASE;
    try {
        const response = await axios.get(`${BASE_URL}type/${type}`);
        if(response) {
            const pokemonList = response.data?.pokemon as PokemonListByType[];  
            const newArr = pokemonList.map((item)  => {
                return {
                  "name": item.pokemon.name,
                  "url": item.pokemon.url
                };
              });
            return newArr;
        }
        return;
    }
    catch (err) {
        console.log(err)
    }
}