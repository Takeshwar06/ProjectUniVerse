
require('dotenv').config();
const express=require("express")
const mongoose=require("mongoose");
const cors=require("cors");
const studentRoutes=require("./routes/studentRoutes");
const projectRoutes=require("./routes/projectRoutes");
const commentRoutes=require("./routes/commentRoutes");
const documentationRoutes=require("./routes/documentationRoutes");
const notificationRoutes=require("./routes/notificationRoutes");
const connectionRoutes=require("./routes/connectionRoutes");

const app=express();
app.use(express.json()); // for JSON requests
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("Projects"))

// api for fetching data
app.use("/api/students",studentRoutes);
app.use("/api/projects",projectRoutes);
app.use("/api/comments",commentRoutes);
app.use("/api/documentations",documentationRoutes);
app.use("/api/notifications",notificationRoutes);
app.use("/api/connections",connectionRoutes);


// Set up the MongoDB connection pool
const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,  
    // Adjust the pool size as needed
  };
  
  mongoose.connect(process.env.MONGO_URL, mongoOptions);
  
  const db = mongoose.connection;
  
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.once('open', () => {
    console.log('Connected to MongoDB');
  });

const server=app.listen(process.env.PORT,()=>{
    console.log(`sever started on port ${process.env.PORT}`)
})
