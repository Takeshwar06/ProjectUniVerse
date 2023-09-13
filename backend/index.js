const PORT=process.env.PORT||5000;
const MONGO_URL=process.env.MONGO_URL||'mongodb://localhost:27017/hackathon';

const express=require("express")
const mongoose=require("mongoose");
const studentRoutes=require("./routes/studentRoutes");
const projectRoutes=require("./routes/projectRoutes");
const commentRoutes=require("./routes/commentRoutes");
const documentationRoutes=require("./routes/documentationRoutes");
const notificationRoutes=require("./routes/notificationRoutes");
const connectionRoutes=require("./routes/connectionRoutes");

const app=express();
app.use(express.json()); // for JSON requests
app.use(express.urlencoded({ extended: true }));

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
  
  mongoose.connect(MONGO_URL, mongoOptions);
  
  const db = mongoose.connection;
  
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.once('open', () => {
    console.log('Connected to MongoDB');
  });

const server=app.listen(PORT,()=>{
    console.log(`sever started on port ${PORT}`)
})
