import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDeleteHerb, useGetHerb } from "../../api/herbs.api";

interface MacroScopicCharacters {
  colour: string;
  stems: string;
  odour: string;
  taste: string;
  size: string;
  shape: string;
}

interface IHerb {
  _id: string;
  name: string;
  thumbnail: string;
  synonyms: string[];
  biologicalSource: string;
  geographicalSource: string;
  cultivationAndCollection: string;
  chemicalConstituents: string;
  uses: string[];
  macroScopiccharacters: MacroScopicCharacters;
  otherDetails: string;
  auther: string;
  description: string;
  authorDetails: {
    name: string;
    email: string;
  };
}

interface HerbDetails {
  _id?: string;
  name: string;
  synonyms: string[];
  biologicalSource: string;
  geographicalSource: string;
  cultivationAndCollection: string;
  chemicalConstituents: string;
  description: string;
  uses: string[];
}

interface OtherDetails {
  thumbnail: File | undefined | string;
  macroScopiccharacters: MacroScopicCharacters;
  otherDetails: string;
}

const HerbDetail = () => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const navigate = useNavigate();
  const id: string = useParams().id as string;

  const { isLoading, data } = useGetHerb(id);
  const { mutate: deleteFunction } = useDeleteHerb();

  if (isLoading) return <SkeletonLoader />;

  const herb = data as IHerb;

  const handleEdit = () => {
    const herbDetails: HerbDetails = {
      _id: herb._id,
      name: herb.name,
      synonyms: herb.synonyms,
      biologicalSource: herb.biologicalSource,
      geographicalSource: herb.geographicalSource,
      cultivationAndCollection: herb.cultivationAndCollection,
      chemicalConstituents: herb.chemicalConstituents,
      description: herb.description,
      uses: herb.uses,
    };

    const otherDetails: OtherDetails = {
      thumbnail: herb.thumbnail, // We can't convert the string URL to a File object here
      macroScopiccharacters: herb.macroScopiccharacters,
      otherDetails: herb.otherDetails,
    };

    // Store the data in localStorage
    localStorage.setItem("herbs", JSON.stringify(herbDetails));
    localStorage.setItem("otherDetails", JSON.stringify(otherDetails));
    // Call the onEdit function passed as prop
    // onEdit(herb._id);
    navigate("/add");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-600 to-green-800 py-8 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        {/* Header Section with Thumbnail */}
        <div className="p-6 flex flex-col md:flex-row gap-6 items-center bg-green-50">
          <div className="w-full md:w-1/3">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src={herb.thumbnail || "/placeholder.svg"}
                alt={herb.name}
                className="w-full h-64 object-cover"
              />
            </div>
          </div>
          <div className="w-full md:w-2/3 space-y-4">
            <div className="flex justify-between items-start">
              <h1 className="text-4xl font-bold text-green-700">{herb.name}</h1>
              <div className="space-x-4">
                <button
                  onClick={handleEdit}
                  className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => setShowConfirmDelete(true)}
                  className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
            <p className="text-gray-600 text-lg">{herb.description}</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <section className="bg-green-50 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-green-700 mb-3">
                Biological Source
              </h2>
              <p className="text-gray-700">{herb.biologicalSource}</p>
            </section>

            <section className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold text-green-700 mb-3">
                Geographical Source
              </h2>
              <p className="text-gray-700">{herb.geographicalSource}</p>
            </section>

            <section className="bg-green-50 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-green-700 mb-3">
                Cultivation & Collection
              </h2>
              <p className="text-gray-700">{herb.cultivationAndCollection}</p>
            </section>

            <section className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold text-green-700 mb-3">
                Chemical Constituents
              </h2>
              <p className="text-gray-700">{herb.chemicalConstituents}</p>
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <section className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold text-green-700 mb-3">
                Synonyms
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                {herb.synonyms.map((synonym, index) => (
                  <li key={index}>{synonym}</li>
                ))}
              </ul>
            </section>

            <section className="bg-green-50 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-green-700 mb-3">
                Uses
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                {herb.uses.map((use, index) => (
                  <li key={index}>{use}</li>
                ))}
              </ul>
            </section>

            <section className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold text-green-700 mb-3">
                Macroscopic Characters
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(herb.macroScopiccharacters).map(
                  ([key, value]) =>
                    value &&
                    key !== "_id" && (
                      <div key={key} className="bg-green-50 p-3 rounded-lg">
                        <span className="font-medium text-green-700 capitalize">
                          {key}:{" "}
                        </span>
                        <span className="text-gray-700">{value}</span>
                      </div>
                    )
                )}
              </div>
            </section>
          </div>
        </div>

        {/* Footer Section */}
        <div className="bg-green-50 p-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-medium text-green-700 mb-2">
                Other Details
              </h3>
              <p className="text-gray-700">{herb.otherDetails}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Author</p>
              <p className="text-green-700 font-medium">
                {herb.authorDetails.name}
              </p>
              <p className="text-green-700 font-medium text-sm">
                {herb.authorDetails.email}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showConfirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-xl font-semibold mb-4">Confirm Delete</h3>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete {herb.name}? This action cannot be
              undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowConfirmDelete(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteFunction(herb._id);
                  setShowConfirmDelete(false);
                }}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SkeletonLoader = () => (
  <div className="min-h-screen bg-gradient-to-b from-green-600 to-green-800 py-8 px-4">
    <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden animate-pulse">
      <div className="p-6 flex flex-col md:flex-row gap-6 items-center bg-green-50">
        <div className="w-full md:w-1/3">
          <div className="rounded-lg overflow-hidden shadow-lg bg-gray-300 h-64"></div>
        </div>
        <div className="w-full md:w-2/3 space-y-4">
          <div className="h-10 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
        </div>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-100 p-6 rounded-lg">
              <div className="h-6 bg-gray-300 rounded w-1/2 mb-3"></div>
              <div className="h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded mt-2"></div>
            </div>
          ))}
        </div>
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-gray-100 p-6 rounded-lg">
              <div className="h-6 bg-gray-300 rounded w-1/2 mb-3"></div>
              <div className="h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded mt-2"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default HerbDetail;
