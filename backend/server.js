const express = require('express');
const mongoose = require ('mongoose');
const dotenv = require ('dotenv');
const cors = require ('cors');
const apiLogger = require('./middleware/apiLogger');
const uploadProfile = require('./controllers/uploadProfile');
const passport = require('passport')
require('./config/passport');


// const authroutes = require ('./controllers/auth');

dotenv.config();
console.log("🌍 Environment Mode:", process.env.NODE_ENV);
const app = express();

app.use(apiLogger);

app.use(express.json());
app.use(passport.initialize());

app.use(cors({
  origin:[ "http://localhost:5173", "https://admin-portal-green-zeta.vercel.app"],  // frontend URL
  credentials: true,
  exposedHeaders: ["Authorization"], // ✅ allow frontend to read it
}));



// important if sending token in header instead of body
app.use((_, res, next) => {
    res.header("Access-Control-Expose-Headers", "Authorization");
    next();
  });
  

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log('MongoDB connected'))
.catch(err=> console.error(err));


app.get('/health/check', (req,res,next) =>{
  return res.json({
    success: 1,
    message: 'Yes i am running!',
    response: 200,
    data:{}
  })
})

app.get('/', (req,res,next) =>{
  return res.json({
    success: 1,
    message: 'Yes i am running!',
    response: 200,
    data:{}
  })
})

app.use('/api/auth', require('./routes/authRoutes'));
app.use("/api/admin", require("./routes/adminRoutes")); 
app.use('/api/students', require('./routes/studentRoutes'));
app.use('/api/teachers', require('./routes/teacherRoutes'));
app.use('/api/dashboard-stats', require('./routes/dashboard-stats'))
// app.use('/api/dashboard', require('./routes/adminRoutes'));




// making it public , to be accessed by URL and photo can be viewed on request
app.use('/uploads', express.static("uploads"));

app.use((err, req, res, next) => {
  console.log('errrrrrrrrrrrrrrr', err);
  // console.error(err.stack)
  res.status(500).send('Something broke!')
})

// app.get('/', async(req,res,next) => {
//   res.json('Hello')
// })

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`🚀 Server running on port ${process.env.PORT || 5000}`));
