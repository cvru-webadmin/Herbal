import mongoose, { model, Schema } from "mongoose";

type IHerbsSchema = {
  name: string;
  thumbnail: string;
  synonyms: string[];
  biologicalSource: string;
  geographicalSource: string;
  cultivationAndCollection: string;
  chemicalConstituents: string;
  uses: string[];
  description: string;
  macroScopiccharacters: {
    colour?: string;
    stems?: string;
    odour?: string;
    taste?: string;
    size?: string;
    shape?: string;
  };
  otherDetails: string;
  auther: mongoose.Types.ObjectId;
};

const macroScopicCharactersSchema = new Schema({
  colour: { type: String, required: false },
  stems: { type: String, required: false },
  odour: { type: String, required: false },
  taste: { type: String, required: false },
  size: { type: String, required: false },
  shape: { type: String, required: false },
});

const HerbsSchema = new Schema({
  name: {
    type: String,
    require: true,
  },

  thumbnail: {
    type: String,
    require: true,
  },

  synonyms: [{ type: String }],

  biologicalSource: {
    type: String,
    require: true,
  },

  geographicalSource: {
    type: String,
    require: true,
  },

  cultivationAndCollection: {
    type: String,
    require: true,
  },

  chemicalConstituents: {
    type: String,
    require: true,
  },

  uses: [{ type: String }],

  description: {
    type: String,
    require: true,
  },

  auther: { type: mongoose.Types.ObjectId, required: true },

  macroScopiccharacters: macroScopicCharactersSchema,

  otherDetails: { type: String, required: true },
});

export const Herbs = model<IHerbsSchema>("herb", HerbsSchema);
