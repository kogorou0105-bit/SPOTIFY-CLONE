import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const url = process.env.MONGODB_URL;
    if (!url) {
      throw new Error(
        "MongoDB connection URL is missing in environment variables."
      );
    }
    const connection = await mongoose.connect(url);
    const adminDb = connection.connection.db.admin();
    const serverInfo = await adminDb.serverInfo();
    const mongodbVersion = serverInfo.version;
    console.log(
      "MongoDB connected successfully.",
      `\n- Host: ${connection.connection.host}`,
      `\n- Database: ${connection.connection.name}`,
      `\n- MongoDB Server: ${mongodbVersion}`, // 这才是真正的服务器版本
      `\n- Mongoose: ${mongoose.version}`
    );
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.stack);
    throw error; // 抛出错误，由调用方决定是否终止进程
  }
};
