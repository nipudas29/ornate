import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
import mongoose from 'mongoose'
dotenv.config();

export const config = {
  mongoURI: process.env.MONGO_URI || '',
  port: process.env.PORT || 3333,
};

// MongoDB connection
mongoose.connect(config.mongoURI)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(process.env.PORT, () => {
    console.log('Server is running at 3333')
})