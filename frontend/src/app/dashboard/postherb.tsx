import { CloudUpload, Pencil, Plus } from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import HerbPreview from "./formpreview";

const PostHerb = () => {
  const imgRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const savedData = localStorage.getItem("herbs");
  const [preview, setPreview] = useState<boolean>(false);

  const checkHerbFields = (herb: any, fallback: () => void) => {
    const requiredFields = [
      "name",
      "synonyms",
      "biologicalSource",
      "geographicalSource",
      "cultivationAndCollection",
      "chemicalConstituents",
      "description",
      "uses",
    ];

    const hasMissingFields = requiredFields.some(
      (field) => !herb[field] || herb[field].length === 0
    );

    if (hasMissingFields) {
      fallback();
      return false;
    }
    return true;
  };

  const defaultFormValues = {
    thumbnail: undefined,
    macroScopiccharacters: {
      colour: "",
      stems: "",
      odour: "",
      taste: "",
      size: "",
      shape: "",
    },
    otherDetails: "",
  };

  const [formValues, setFormValues] = useState<{
    thumbnail: File | undefined | string;
    macroScopiccharacters: {
      colour: string;
      stems: string;
      odour: string;
      taste: string;
      size: string;
      shape: string;
    };
    otherDetails: string;
  }>(() => {
    const savedData = localStorage.getItem("otherDetails");
    return savedData ? JSON.parse(savedData) : defaultFormValues;
  });
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string,
    subField?: string
  ) => {
    if (subField) {
      setFormValues((prev: any) => ({
        ...prev,
        macroScopiccharacters: {
          ...prev.macroScopiccharacters,
          [subField]: e.target.value,
        },
      }));
    } else {
      setFormValues((prev: any) => ({ ...prev, [field]: e.target.value }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Save the File object
      setFormValues((prev: any) => ({
        ...prev,
        thumbnail: file,
      }));

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        const previewUrl = reader.result as string;
        setThumbnailPreview(previewUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const fallbackFunction = () => {
    alert("Some required fields are missing in the herb data!");
  };

  if (!savedData) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-gray-500 text-center items-center gap-3 flex flex-col">
          <h1 className="font-extrabold text-4xl">Please add data first</h1>
          <p className="text-xl">
            Please add the basic data first then come here
          </p>
          <button
            className="flex gap-3 items-center rounded-lg bg-green-500 text-white px-4 py-2 font-semibold w-fit"
            onClick={() => navigate("/add")}
          >
            Add Data
            <Plus />
          </button>
        </div>
      </div>
    );
  }

  const herb = JSON.parse(savedData);

  if (!checkHerbFields(herb, fallbackFunction)) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-gray-500 text-center items-center gap-3 flex flex-col">
          <h1 className="font-extrabold text-4xl">Incomplete Data</h1>
          <p className="text-xl">
            Some required fields are missing in the herb data. Please complete
            it first.
          </p>
          <button
            className="flex gap-3 items-center rounded-lg bg-green-500 text-white px-4 py-2 font-semibold w-fit"
            onClick={() => navigate("/add")}
          >
            Edit Data
            <Pencil />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-2 md:px-5 py-2 space-y-4">
      <h1 className="text-3xl font-bold text-green-700">
        {herb.name ? herb.name : "Name is not available"}
      </h1>
      {preview && (
        <HerbPreview
          herbData={herb}
          otherData={formValues}
          onClose={() => setPreview(false)}
          thumbnailPreview={typeof formValues.thumbnail === "string"
            ? formValues.thumbnail
            : thumbnailPreview}
        />
      )}

      <div className="space-y-6">
        {/* Thumbnail Upload */}
        <div>
          <div
            className="aspect-video rounded-lg w-[300px] bg-center bg-cover cursor-pointer overflow-hidden bg-gray-500"
            style={{
              backgroundImage: `url(${
                // @ts-ignore
                typeof formValues.thumbnail === "string"
                  ? formValues.thumbnail
                  : thumbnailPreview
              })`,
            }}
          ></div>
          <div
            className="bg-gray-500 w-fit px-5 rounded-lg py-3 text-white font-bold flex gap-3 items-center justify-center cursor-pointer mt-5"
            onClick={() => imgRef.current?.click()}
          >
            Upload Image <CloudUpload size={25} />
          </div>
          <input
            type="file"
            name="thumbnail"
            id="thumbnail"
            hidden
            ref={imgRef}
            onChange={handleImageUpload}
          />
        </div>

        {/* Macroscopic Characters */}
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Macroscopic Characters
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Colour"
            className="px-2 py-1 border-[1px] rounded-lg focus-visible:outline-0 w-full"
            value={formValues.macroScopiccharacters.colour}
            onChange={(e) =>
              handleInputChange(e, "macroScopiccharacters", "colour")
            }
          />
          <input
            type="text"
            placeholder="Stems"
            className="px-2 py-1 border-[1px] rounded-lg focus-visible:outline-0 w-full"
            value={formValues.macroScopiccharacters.stems}
            onChange={(e) =>
              handleInputChange(e, "macroScopiccharacters", "stems")
            }
          />
          <input
            type="text"
            placeholder="Odour"
            className="px-2 py-1 border-[1px] rounded-lg focus-visible:outline-0 w-full"
            value={formValues.macroScopiccharacters.odour}
            onChange={(e) =>
              handleInputChange(e, "macroScopiccharacters", "odour")
            }
          />
          <input
            type="text"
            placeholder="Taste"
            className="px-2 py-1 border-[1px] rounded-lg focus-visible:outline-0 w-full"
            value={formValues.macroScopiccharacters.taste}
            onChange={(e) =>
              handleInputChange(e, "macroScopiccharacters", "taste")
            }
          />
          <input
            type="text"
            placeholder="Size"
            className="px-2 py-1 border-[1px] rounded-lg focus-visible:outline-0 w-full"
            value={formValues.macroScopiccharacters.size}
            onChange={(e) =>
              handleInputChange(e, "macroScopiccharacters", "size")
            }
          />
          <input
            type="text"
            placeholder="Shape"
            className="px-2 py-1 border-[1px] rounded-lg focus-visible:outline-0 w-full"
            value={formValues.macroScopiccharacters.shape}
            onChange={(e) =>
              handleInputChange(e, "macroScopiccharacters", "shape")
            }
          />
        </div>

        {/* Other Details */}
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Other Details
        </h2>
        <textarea
          placeholder="Other Details"
          className="px-2 py-1 border-[1px] rounded-lg focus-visible:outline-0 w-full"
          rows={4}
          value={formValues.otherDetails}
          onChange={(e) => handleInputChange(e, "otherDetails")}
        ></textarea>

        <div className="space-x-5">
          <button
            className="px-4 py-2 bg-green-100 text-green-600 rounded-lg font-semibold hover:bg-green-600 hover:text-white"
            onClick={() => setPreview(true)}
          >
            Preview
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
      </div>
    </div>
  );
};

export default PostHerb;
