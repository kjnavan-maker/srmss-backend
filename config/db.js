const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    if (process.env.ENABLE_DB !== "true") {
      console.log("MongoDB connection disabled for local development");
      return;
    }

    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    console.log("Server will continue without database connection");
  }
};

module.exports = connectDB;