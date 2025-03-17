"use client";
interface Props {
  next: string | null | undefined;
  previous: string | null | undefined;
  getDataCallback: (value: string, nextIndex: number) => void;
}

const PokemonPagination = ({ next, previous, getDataCallback }: Props) => {
  return (
    <div className="flex justify-center gap-4 py-4">
      {previous && (
        <button
          className="rounded bg-blue-500 px-4 py-2 text-white cursor-pointer"
          onClick={() => getDataCallback(previous, -1)}
        >
          Previous
        </button>
      )}
      {next && (
        <button
          className="rounded bg-blue-500 px-4 py-2 text-white cursor-pointer"
          onClick={() => getDataCallback(next, 1)}
        >
          Next
        </button>
      )}
    </div>
  );
};
export default PokemonPagination;
