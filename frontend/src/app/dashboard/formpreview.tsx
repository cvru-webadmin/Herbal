import type React from "react";
import { Plus, X, Check, ChevronRight, Microscope } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAddHerbs } from "../../api/herbs.api";
import type { HerbDetails, OtherDetails } from "../../utils/addherbs.utility";

const HerbPreview: React.FC<{
  herbData: HerbDetails;
  otherData: OtherDetails;
  onClose: () => void;
  thumbnailPreview: string;
}> = ({ herbData, otherData, onClose, thumbnailPreview }) => {
  const navigate = useNavigate();
  const { mutate: AddHerbs } = useAddHerbs();

  if (!herbData || Object.values(herbData).some((value) => !value)) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-md w-full transform transition-all duration-300 ease-in-out scale-95 hover:scale-100">
          <h1 className="font-extrabold text-3xl text-green-600 mb-4">
            Oops! No Data Yet
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Please add some basic herb information before previewing.
          </p>
          <button
            className="px-6 py-3 bg-green-500 text-white rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-green-600 transition-colors duration-300 w-full"
            onClick={() => navigate("/add")}
          >
            <Plus size={20} />
            Add Herb Data
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = () => {
    if (herbData && otherData) {
      AddHerbs({ herbData, otherData });
      alert("Herb data submitted successfully!");
      onClose();
      navigate("/all");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl md:text-3xl font-bold text-green-600 flex items-center">
            <span className="bg-green-100 rounded-full p-2 mr-3">
              <ChevronRight size={24} className="text-green-600" />
            </span>
            {herbData.name} Preview
          </h2>
          <button
            className="text-gray-400 hover:text-gray-600 transition-colors duration-300"
            onClick={onClose}
          >
            <X size={24} />
          </button>
        </div>
        <div className="overflow-y-auto flex-grow p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-green-600 mb-2">
                Basic Details
              </h3>
              <PreviewItem
                label="Synonyms"
                value={herbData.synonyms.join(", ")}
              />
              <PreviewItem
                label="Biological Source"
                value={herbData.biologicalSource}
              />
              <PreviewItem
                label="Geographical Source"
                value={herbData.geographicalSource}
              />
              <PreviewItem
                label="Cultivation & Collection"
                value={herbData.cultivationAndCollection}
              />
              <PreviewItem
                label="Chemical Constituents"
                value={herbData.chemicalConstituents}
              />
              <PreviewItem label="Uses" value={herbData.uses.join(", ")} />
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-green-600 mb-2">
                Additional Details
              </h3>
              {thumbnailPreview && (
                <img
                  src={thumbnailPreview || "/placeholder.svg"}
                  alt="Herb Thumbnail"
                  className="w-full h-48 object-cover rounded-lg shadow-md mb-4"
                />
              )}
              {otherData.otherDetails && (
                <PreviewItem
                  label="Other Details"
                  value={otherData.otherDetails}
                />
              )}
              <PreviewItem label="Description" value={herbData.description} />
            </div>
          </div>
          {otherData.macroScopiccharacters && (
            <div>
              <h3 className="text-xl font-semibold text-green-600 mb-2 flex items-center">
                <Microscope size={20} className="mr-2" />
                Microscopic Characters
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  {Object.entries(otherData.macroScopiccharacters).map(
                    ([key, value]) => (
                      <li key={key} className="text-gray-800">
                        <span className="font-semibold">{key}:</span> {value}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>
        <div className="p-6 border-t border-gray-200 flex justify-end gap-4">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-full font-semibold flex items-center gap-2 hover:bg-green-600 transition-colors duration-300 text-sm"
            onClick={handleSubmit}
          >
            <Check size={16} />
            Submit
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-full font-semibold flex items-center gap-2 hover:bg-red-600 transition-colors duration-300 text-sm"
            onClick={onClose}
          >
            <X size={16} />
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const PreviewItem: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div className="bg-gray-50 p-3 rounded-lg">
    <h4 className="text-xs font-semibold text-gray-600 mb-1">{label}</h4>
    <p className="text-sm text-gray-800">{value}</p>
  </div>
);

export default HerbPreview;
