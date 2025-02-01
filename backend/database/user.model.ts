import { model, Schema } from "mongoose";

export type IUser = {
  email: string;
  password: string;
  name: string;
};

const UserSchema = new Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },

  password: {
    type: String,
    require: true,
  },

  name: {
    type: String,
    require: true,
  },
});

export const User = model<IUser>("user", UserSchema);
