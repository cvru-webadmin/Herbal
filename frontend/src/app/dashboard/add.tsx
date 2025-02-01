import { Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { getAllHerbs } from "../../api/herbs.api";
import HerbCard from "../../component/cards/herb";
import { useIntersection } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";

const AddPage = () => {
  const navigate = useNavigate();
  const [formInput, setInput] = useState<{
    synonyms: string;
    uses: string;
  }>({
    synonyms: "",
    uses: "",
  });

  const defaultFormValues = {
    name: "",
    synonyms: [],
    biologicalSource: "",
    geographicalSource: "",
    cultivationAndCollection: "",
    chemicalConstituents: "",
    uses: [],
    description: "",
  };

  const [formValues, setFormValues] = useState<{
    name: string;
    synonyms: string[];
    biologicalSource: string;
    geographicalSource: string;
    cultivationAndCollection: string;
    chemicalConstituents: string;
    uses: string[];
    description: string;
    // macroScopiccharacters: {
    //   colour?: string;
    //   stems?: string;
    //   odour?: string;
    //   taste?: string;
    //   size?: string;
    //   shape?: string;
    // };
  }>(() => {
    const savedData = localStorage.getItem("herbs");
    return savedData ? JSON.parse(savedData) : defaultFormValues;
  });

  const handleRemove = (index: number, type: "synonyms" | "uses") => {
    if (type === "synonyms") {
      setFormValues((prevValues) => ({
        ...prevValues,
        synonyms: prevValues.synonyms.filter((_, i) => i !== index),
      }));
    }

    if (type === "uses") {
      setFormValues((prevValues) => ({
        ...prevValues,
        uses: prevValues.uses.filter((_, i) => i !== index),
      }));
    }
  };

  const {
    data: herbs,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
  } = getAllHerbs({
    name: formValues.name,
    synonyms: formValues.synonyms,
    uses: formValues.uses,
  });

  const lastPostRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting) fetchNextPage();
  }, [entry]);

  const handleSave = () => {
    localStorage.setItem("herbs", JSON.stringify(formValues));
    navigate("/post");
  };

  return (
    <div className="flex gap-5">
      <div className="p-2 md:p-5 space-y-5 max-w-[600px] w-full sticky top-0">
        <div>
          <h1 className="text-lg font-medium">Add new herbs</h1>
        </div>
        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <div className="space-y-1">
            <input
              placeholder="Name of the herb."
              type="text"
              name="name"
              required
              value={formValues.name}
              className="px-2 py-1 border-[1px] rounded-lg w-full focus-visible:outline-0"
              onChange={({ target }) => {
                setFormValues({
                  ...formValues,
                  name: target.value,
                });
              }}
            />
            <p className="text-gray-500 ml-1">
              Do not include any kind of special character.
            </p>
          </div>
          <div className="transition-all space-y-1">
            <div className="max-h-24 py-1 overflow-y-auto transition-all opacity-90 flex gap-2 text-white font-medium rounded-lg flex-wrap">
              {formValues.synonyms.map((synonym, index) => (
                <span
                  key={index}
                  className="bg-gray-500 px-2 py-0.5 rounded-lg flex items-center gap-0.5"
                >
                  {synonym}
                  <span
                    className="cursor-pointer"
                    onClick={() => handleRemove(index, "synonyms")}
                  >
                    <Plus className="rotate-45" />
                  </span>
                </span>
              ))}
            </div>
            <input
              placeholder="Synonyms of the herb."
              name="synonyms"
              // required
              value={formInput.synonyms}
              className="px-2 py-1 border-[1px] rounded-lg w-full focus-visible:outline-0 transition-all"
              onChange={({ target }) => {
                setInput({ ...formInput, synonyms: target.value });
              }}
              onKeyDown={(e) => {
                if (e.key === ",") {
                  e.preventDefault();
                  setFormValues({
                    ...formValues,
                    synonyms: [
                      ...formValues.synonyms,
                      formInput.synonyms.trim(),
                    ],
                  });
                  setInput({ ...formInput, synonyms: "" });
                }
              }}
            />
            <p className="text-gray-500 ml-1">
              Each synonyms should be comma-separated.
            </p>
          </div>
          <div>
            <textarea
              className="resize-none h-24 border-[1px] w-full rounded-lg px-2 py-1"
              placeholder="Biological Source."
              name="biologial-source"
              required
              value={formValues.biologicalSource}
              onChange={({ target }) => {
                setFormValues({
                  ...formValues,
                  biologicalSource: target.value,
                });
              }}
            />
            <p className="text-gray-500 ml-1">Biological source of the herb.</p>
          </div>
          <div>
            <textarea
              className="resize-none h-24 border-[1px] w-full rounded-lg px-2 py-1"
              placeholder="Geographical Source."
              name="geographical-source"
              required
              value={formValues.geographicalSource}
              onChange={({ target }) => {
                setFormValues({
                  ...formValues,
                  geographicalSource: target.value,
                });
              }}
            />
            <p className="text-gray-500 ml-1">
              Geographical source of the herb.
            </p>
          </div>
          <div>
            <textarea
              className="resize-none h-24 border-[1px] w-full rounded-lg px-2 py-1"
              placeholder="Cultivation & Collection."
              required
              name="Cultivation & Collection"
              value={formValues.cultivationAndCollection}
              onChange={({ target }) => {
                setFormValues({
                  ...formValues,
                  cultivationAndCollection: target.value,
                });
              }}
            />
            <p className="text-gray-500 ml-1">
              Cultivation and collection of the herb.
            </p>
          </div>
          <div>
            <textarea
              className="resize-none h-24 border-[1px] w-full rounded-lg px-2 py-1"
              placeholder="Chemical Constituents."
              required
              name="Chemical Constituents."
              value={formValues.chemicalConstituents}
              onChange={({ target }) => {
                setFormValues({
                  ...formValues,
                  chemicalConstituents: target.value,
                });
              }}
            />
            <p className="text-gray-500 ml-1">
              Chemical constituents of the herb.
            </p>
          </div>
          <div className="space-y-1">
            <div className="max-h-40 py-1 overflow-y-auto transition-all opacity-90 flex gap-2 text-white font-medium rounded-lg flex-col">
              {formValues.uses.map((use, index) => (
                <span
                  key={index}
                  className="bg-gray-500 px-2 py-0.5 rounded-lg flex items-center gap-0.5 w-fit"
                >
                  {use}
                  <span
                    className="cursor-pointer"
                    onClick={() => handleRemove(index, "uses")}
                  >
                    <Plus className="rotate-45" />
                  </span>
                </span>
              ))}
            </div>
            <input
              placeholder="Use of the herb."
              name="Uses"
              // required
              value={formInput.uses}
              className="px-2 py-1 border-[1px] rounded-lg w-full focus-visible:outline-0 transition-all"
              onChange={({ target }) => {
                setInput({ ...formInput, uses: target.value });
              }}
              onKeyDown={(e) => {
                if (e.key === ",") {
                  e.preventDefault();
                  setFormValues({
                    ...formValues,
                    uses: [...formValues.uses, formInput.uses.trim()],
                  });
                  setInput({ ...formInput, uses: "" });
                }
              }}
            />
            <p className="text-gray-500 ml-1">
              Each use case should be comma-separated.
            </p>
          </div>
          <div>
            <textarea
              className="resize-none h-24 border-[1px] w-full rounded-lg px-2 py-1"
              placeholder="Description of the herb."
              required
              name="description"
              value={formValues.description}
              onChange={({ target }) => {
                setFormValues({
                  ...formValues,
                  description: target.value,
                });
              }}
            />
            <p className="text-gray-500 ml-1">Description of the herb.</p>
          </div>
          <div className="space-x-5">
            <button
              className="px-4 py-2 bg-green-100 text-green-600 rounded-lg font-semibold hover:bg-green-500 hover:text-white"
              type="submit"
            >
              Save
            </button>
            <button
              className="px-4 py-2 bg-red-100 text-red-600 rounded-lg font-semibold hover:bg-red-400 hover:text-white"
              onClick={() => {
                localStorage.removeItem("otherDetails");
                localStorage.removeItem("herbs");
                navigate("/all");
              }}
            >
              Clear Form
            </button>
          </div>
        </form>
      </div>
      <div className="p-2 md:p-5 space-y-5 w-full">
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
        {isFetchingNextPage && (
          <div className="mx-auto bg-gray-500 py-5 text-white text-center font-medium rounded-lg text-2xl">
            Loading
          </div>
        )}
      </div>
    </div>
  );
};

export default AddPage;
