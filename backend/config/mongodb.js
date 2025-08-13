import mongoose from "mongoose";

const connectdb = async () => {
    mongoose.connection.on('connected', () => {
        console.log("Database Connected");
    });
    await mongoose.connect(`${process.env.MONGO_URI}`);
}

export default connectdb;
