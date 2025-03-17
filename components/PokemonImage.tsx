"use client";
import { useEffect, useState } from "react";
import { getImageUrl } from "@/services/api";
import Image from "next/image";

interface Props {
  url: string;
}

const PokemonImage = ({ url }: Props) => {
  const [imgSrc, setImgSrc] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const res = await getImageUrl(url);
      setImgSrc(res);
    };
    fetchData();
  }, [url]);
  return (
    <div>
      {imgSrc && imgSrc !== "" ? (
        <Image src={imgSrc} alt="pokemon" width={100} height={53} />
      ) : (
        ""
      )}
    </div>
  );
};
export default PokemonImage;
