export type IHerbsSchema = {
  _id: string;
  name: string;
  thumbnail: string;
  synonyms: string[];
  biologicalSource: string;
  geographicalSource: string;
  cultivationAndCollection: string;
  chemicalConstituents: string;
  uses: string[];
  macroScopiccharacters: {
    colour?: string;
    stems?: string;
    odour?: string;
    taste?: string;
    size?: string;
    shape?: string;
  };
  otherDetails: string;
};
