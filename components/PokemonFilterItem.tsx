"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PokemonTypeResult } from "@/interfaces/pokemon";

const PokemonFilterItem: React.FC<PokemonTypeResult> = ({ name }) => {
  const [selected, setSelected] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTypeStr = searchParams.get("type");

  /**
   *Check selected types when page loaded to add selected state to button
   */
  useEffect(() => {
    if (searchTypeStr && searchTypeStr !== "") {
      if (searchTypeStr.split(",").includes(name)) {
        setSelected(true);
      } else {
        setSelected(false);
      }
    } else {
      setSelected(false);
    }
  }, [name, searchTypeStr]);

  /**
   *Handle add or remove type from query string
   *
   * @param {string} str
   */
  const handleAddRemoveType = (str: string) => {
    const strArr = str.split(",");
    if (strArr.includes(name)) {
      if (strArr.length === 1 && strArr[0] === name) {
        // If there is only one type in the query string and it is the same as the button clicked, remove the type from the query string
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.delete("type");
        newSearchParams.delete("page");
        router.push(`?${newSearchParams.toString()}&page=1`);
      } else {
        router.push(
          `?type=${strArr.filter((type) => type !== name).join(",")}&page=1`
        );
      }
    } else {
      router.push(`?type=${[...strArr, name].join(",")}&page=1`);
    }
  };

  const handleClick = () => {
    setSelected(!selected);
    if (searchTypeStr && searchTypeStr !== "") {
      handleAddRemoveType(searchTypeStr);
    } else {
      router.push(`?type=${name}&page=1`);
    }
  };
  return (
    <button
      className={`p-4 cursor-pointer mx-2  border border-solid border-gray-300 mb-2 ${
        selected ? "bg-blue-300 text-white" : "bg-transparent text-black"
      }`}
      onClick={handleClick}
    >
      {name}
    </button>
  );
};

export default PokemonFilterItem;
