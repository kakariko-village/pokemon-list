"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getPokemonList, getPokemonByType } from "@/services/api";
import PokemonImage from "@/components/PokemonImage";
import PokemonPagination from "@/components/PokemonPagination";
import { PokemonType, PokemonTypeResult } from "@/interfaces/pokemon";

const PokemonList: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTypeStr = searchParams.get("type");
  const searchPageStr = parseInt(searchParams.get("page") || "1");
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [pokemonList, setPokemonList] = useState<PokemonType>({
    results: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = parseInt(process.env.NEXT_PUBLIC_ITEM_PER_PAGE || "24");
  const base_url = process.env.NEXT_PUBLIC_API_BASE;

  const offset = (currentPage - 1) * itemsPerPage;
  const currentItems = pokemonList.results.slice(offset, offset + itemsPerPage);

  /**
   *Get Pokemon List without any filter
   *
   */
  const handleGetPokemonList = useCallback(async () => {
    setLoading(true);
    const res = await getPokemonList(
      `${base_url}pokemon?limit=${itemsPerPage}&offset=${offset}`
    );
    setLoading(false);
    if (res && res.results.length > 0) {
      setPokemonList(res);
      setTotalItems(res.count);
    }
  }, [base_url, itemsPerPage, offset]);

  /**
   *Get Pokemon Number based on URL
   *
   * @param {string} url
   * @return {*}
   */
  const getPokemonNumber = (url: string) => {
    const matched = url.match(/\/pokemon\/(\d+)\//);
    if (matched) {
      const id = matched[1];
      return id;
    }
  };
  /**
   *Handle Set Current Page
   *
   * @param {number} value
   */
  const handleSetCurrentPage = (value: number) => {
    setCurrentPage((prevPage) => prevPage + value);
    const params = new URLSearchParams(window.location.search);
    params.set("page", (currentPage + value).toString());
    router.push(`?${params.toString()}`);
  };

  /**
   *Handle Pagination without filter
   *
   * @param {string} value
   */
  const handlePagination = async (value: string, nextIndex: number) => {
    setLoading(true);
    const res = await getPokemonList(`${value}`);
    setLoading(false);
    if (res && res.results.length > 0) {
      setPokemonList(res);
      handleSetCurrentPage(nextIndex);
    }
  };

  /**
   *Handle Get Pokemon List by filter. If there are multiple filters, it will return the common elements
   *
   * @param {array} arr
   * @return {*}
   */
  const handleGetPokemonByType = useCallback(async (arr: string[]) => {
    let allApiResults: PokemonTypeResult[] = [];
    setLoading(true);
    for (const item of arr) {
      const res = await getPokemonByType(item);
      if (res && Array.isArray(res)) {
        if (allApiResults.length === 0) {
          allApiResults = [...allApiResults, ...res];
        } else {
          const commonElements = allApiResults.filter((obj1) =>
            res.some((obj2) => obj1.name === obj2.name)
          );
          allApiResults = [...commonElements];
        }
      }
    }
    setPokemonList({ results: allApiResults });
    setTotalItems(allApiResults.length);
    setLoading(false);
  }, []);

  /**
   *Trigger get Pokemon List or get Pokemon by Type based on search query
   *
   */

  useEffect(() => {
    if (!searchTypeStr) {
      handleGetPokemonList();
    } else {
      const searchTypeStrArr = searchTypeStr.split(",");
      handleGetPokemonByType(searchTypeStrArr);
    }
  }, [searchTypeStr, handleGetPokemonList, handleGetPokemonByType]);

  /**
   *Update Current Page based on search query
   *
   */

  useEffect(() => {
    setCurrentPage(searchPageStr);
  }, [searchPageStr]);

  /**
   *Handle Next Page with filter
   *
   */
  const handleNextPage = () => {
    handleSetCurrentPage(1);
  };

  /**
   *Handle Previous Page with filter
   *
   */
  const handlePreviousPage = () => {
    handleSetCurrentPage(-1);
  };

  return (
    <>
      <p className="gap-4 px-10 absolute top-15">Total Count: {totalItems}</p>
      {loading ? (
        <h3 className="text-center">Loading...</h3>
      ) : (
        <div className="flex flex-col justify-center">
          <div className="grid grid-cols-6 gap-16">
            {searchTypeStr
              ? currentItems.map((pokemon) => (
                  <div
                    key={pokemon.name}
                    className="flex flex-col items-center justify-between"
                  >
                    <h3 className="text-center p-2 capitalize">
                      {pokemon.name}
                    </h3>
                    <PokemonImage url={pokemon.url} />
                    <p>Number: {getPokemonNumber(pokemon.url)}</p>
                  </div>
                ))
              : pokemonList && pokemonList.results
              ? pokemonList.results.map((pokemon) => (
                  <div
                    key={pokemon.name}
                    className="flex flex-col items-center justify-between"
                  >
                    <h3 className="text-center p-2 capitalize">
                      {pokemon.name}
                    </h3>
                    <PokemonImage url={pokemon.url} />
                    <p>Number: {getPokemonNumber(pokemon.url)}</p>
                  </div>
                ))
              : ""}
          </div>
          {pokemonList && pokemonList.next && (
            <PokemonPagination
              next={pokemonList?.next}
              previous={pokemonList?.previous}
              getDataCallback={handlePagination}
            />
          )}

          {searchTypeStr ? (
            <div className="flex justify-center gap-4 py-4">
              {currentPage > 1 && (
                <button
                  className="rounded bg-blue-500 px-4 py-2 text-white cursor-pointer"
                  onClick={handlePreviousPage}
                >
                  Previous
                </button>
              )}
              {itemsPerPage <= currentItems.length && (
                <button
                  className="rounded bg-blue-500 px-4 py-2 text-white cursor-pointer"
                  onClick={handleNextPage}
                >
                  Next
                </button>
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </>
  );
};
export default PokemonList;
