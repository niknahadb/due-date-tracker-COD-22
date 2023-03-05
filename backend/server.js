const express = require("express");
require("dotenv").config();
const cors = require("cors");


const connectDB = require("./db/connectDb")
const userRouter = require('./routes/user/user')
const canvasRouter = require('./routes/Canvas/Canvas')

const corsOptions = {
   origin: '*',
   credentials: true,
   optionSuccessStatus: 200,
}

const app = express();

app.use(express.json())
app.use(cors(corsOptions))

app.get('/', (req, res) => {
  res.send('jobs api');
});

app.use('/api/v1/user', userRouter)
app.use('/api/v1/canvas', canvasRouter)

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_DB_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};
start(port);