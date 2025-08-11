/**
 * @copyright Nomaan Faruki - 2025
 */


import express from "express" //with type module
import { connectDB } from "./config/db.js"
import dotenv from "dotenv"
import formRoutes from "./routes/formRoutes.js" // 
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001

connectDB();

app.use(express.json()); 
app.use(cors());

app.use("/api/forms", formRoutes); 

app.listen(PORT, () => {
  console.log("Server started on PORT: ", PORT);  
});


// import express from "express" //with type module
// // const express= require("express")
// import notesRoutes from "./routes/notesRoutes.js"
// import { connect } from "mongoose";
// import { connectDB } from "./config/db.js";

// import dotenv from "dotenv";

// dotenv.config();



// const app= express();
// const PORT= process.env.PORT || 5001

// connectDB();

// app.use("/api/notes", notesRoutes);



// app.listen(PORT, () => {
//   console.log("Server started on PORT: ", PORT);  
// });

