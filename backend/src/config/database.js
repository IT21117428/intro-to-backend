import mongoose from 'mongoose'

const connectDB = async () => {
    if (!process.env.MONGODB_URI) {
        console.log("MONGODB_URI not set. Skipping database connection.")
        return null
    }

    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
        })
        console.log(`\nMongoDB connected !!! ${connectionInstance.connection.host}`)
        return connectionInstance
    } catch (error) {
        console.log("MongoDB connection failed. Continuing without database.", error.message)
        return null
    }
}

export default connectDB;