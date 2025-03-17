"use server";

import { getAllPokemonTypes } from "@/services/api";
import { PokemonTypeResult } from "@/interfaces/pokemon";
import PokemonFilterItem from "@/components/PokemonFilterItem";

const PokemonTypeFilter = async () => {
  const pokemonTypes = (await getAllPokemonTypes()) as PokemonTypeResult[];
  return (
    <div className="flex flex-wrap items-center gap-4 px-10 pt-10">
      <>
        Types:
        {pokemonTypes && pokemonTypes.length > 0
          ? pokemonTypes.map((type) => (
              <PokemonFilterItem key={type.name} {...type} />
            ))
          : ""}
      </>
    </div>
  );
};

export default PokemonTypeFilter;
