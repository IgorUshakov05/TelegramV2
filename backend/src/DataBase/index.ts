import mongoose from "mongoose";

export async function connectDB(): Promise<void> {
  const mongoURI: string = process.env.MONGO_URI || "";

  try {
    await mongoose.connect(mongoURI);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
}
