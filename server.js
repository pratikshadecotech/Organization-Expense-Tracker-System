import express from "express";
import colors from "colors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoute.js"
import cors from "cors";



//configure env
dotenv.config();  //.env file it is root folder so not need to define path,it automatically get connect to .env file

//database config
connectDB();

//rest object
const app = express()

//middlewares 
//help of morgan error log shows on console
app.use(express.json())
app.use(morgan('dev'))


app.use(cors()); // Enable CORS for all origins


// Or configure CORS with specific options
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your React app’s origin
    methods: ['GET', 'POST'], // Allow specific methods
    allowedHeaders: ['Content-Type'], // Allow specific headers
}));


//routes
app.use('/api/v1/', authRoutes);

//rest api
app.get('/', (req, res) => {
    res.send("<h1>Welcome To Organization Finance Tracking System Project</h1>");
})


//PORT
const PORT = process.env.PORT || 8080;


//run listen
app.listen(PORT, () => {
    console.log(`server running on ${PORT}`.bgCyan.white)
});