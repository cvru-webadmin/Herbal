import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const dbInstance = await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}?authSource=${process.env.DB_AUTH_SOURCE}`);
    if (dbInstance.STATES.connected) {
      console.log("DB connected");
    }
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
