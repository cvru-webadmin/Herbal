import apiInstance from "../api/api.instance";

export interface HerbDetails {
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

export interface OtherDetails {
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
}

export const handleSubmit = async ({
  herbData,
  otherData,
}: {
  herbData: HerbDetails;
  otherData: OtherDetails;
}) => {
  const formData = new FormData();
  if (herbData._id) {
    formData.append("_id", herbData._id);
  }
  formData.append("name", herbData.name);
  formData.append("synonyms", JSON.stringify(herbData.synonyms));
  formData.append("biologicalSource", herbData.biologicalSource);
  formData.append("geographicalSource", herbData.geographicalSource);
  formData.append("description", herbData.description);
  formData.append(
    "cultivationAndCollection",
    herbData.cultivationAndCollection
  );
  formData.append("chemicalConstituents", herbData.chemicalConstituents);
  formData.append("uses", JSON.stringify(herbData.uses));

  // Append otherData fields
  if (otherData.thumbnail) {
    formData.append("thumbnail", otherData.thumbnail as File);
  }
  formData.append(
    "macroScopiccharacters",
    JSON.stringify(otherData.macroScopiccharacters)
  );
  formData.append("otherDetails", otherData.otherDetails);

  const response = await apiInstance.post("/addHerb", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
