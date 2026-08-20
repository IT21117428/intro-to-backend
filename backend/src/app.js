import express from 'express';
import cors from 'cors';

const app = express(); // create an express app

app.use(cors({
    origin: '*', // For simplicity during learning, allow all origins
    credentials: true,
}));

app.use(express.json());

//import routes
import userRouter from './routes/user.route.js';
import postRouter from './routes/post.route.js';

//routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/posts", postRouter)

//example route: http://localhost:4000/api/v1/users/register

export default app;