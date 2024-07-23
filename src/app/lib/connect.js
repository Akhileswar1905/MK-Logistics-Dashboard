import mongoose from "mongoose";

export const connectDB = async () => {
  const connections = {};
  try {
    if (connections.isConnected) {
      console.log("Using existing connection");
      return;
    }
    const db = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    connections.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.log(error.message);
  }
};
