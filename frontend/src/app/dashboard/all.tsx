import { useEffect, useRef, useState } from "react";
import { getAllHerbs } from "../../api/herbs.api";
import { Search } from "lucide-react";
import { useIntersection } from "@mantine/hooks";
import HerbCard from "../../component/cards/herb";

const All = () => {
  const [formInput, setInput] = useState("");

  const {
    data: herbs,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = getAllHerbs({
    name: formInput,
    synonyms: formInput,
    uses: formInput,
  });

  const lastPostRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting) fetchNextPage();
  }, [entry]);

  return (
    <div className="px-2 md:px-5 py-2">
      <div className="my-5">
        <div className="min-w-[300px] max-w-[500px] rounded-md px-2 flex items-center justify-center mx-auto gap-2 border-[1px]">
          <input
            placeholder="Search"
            className="w-full py-1 focus-visible:outline-0"
            onChange={({ target }) => setInput(target.value)}
          />
          <Search size={25} />
        </div>
      </div>
      {isLoading ? (
        <div className="mx-auto bg-gray-500 py-5 text-white text-center font-medium rounded-lg text-2xl">
          Loading
        </div>
      ) : !herbs || !herbs.totalCount ? (
        <div className="mx-auto bg-gray-500 py-5 text-white text-center font-medium rounded-lg text-2xl">
          No result found
        </div>
      ) : (
        <div
          className="grid"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "rem(16)",
          }}
        >
          {herbs.data.map((herb: any, index: number) => {
            const isLastItem = index === herbs.data.length - 1;
            return (
              <HerbCard
                herb={herb}
                key={herb._id}
                ref={isLastItem ? ref : undefined}
              />
            );
          })}
        </div>
      )}
      {!hasNextPage && (
        <div className="mx-auto bg-gray-500 py-5 text-white text-center font-medium rounded-lg text-2xl my-5">
          No more herbs
        </div>
      )}
      {isFetchingNextPage && (
        <div className="mx-auto bg-gray-500 py-5 text-white text-center font-medium rounded-lg text-2xl">
          Loading
        </div>
      )}
    </div>
  );
};

export default All;
