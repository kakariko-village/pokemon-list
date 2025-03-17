// import Image from "next/image";
import PokemonFilter from "@/components/PokemonFilter";
import PokemonList from "@/components/PokemonList";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 px-10">
      <h1 className="text-center p-4">Welcome to Pokemon world</h1>
      <PokemonFilter />
      <PokemonList />
    </div>
  );
}
