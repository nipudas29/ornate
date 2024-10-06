import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import session from 'express-session';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes';
import configurePassport from './config/passport';

import profileRoutes from './routes/profileRoutes';
import postRoutes from './routes/postRoutes';
import transactionRoutes from './routes/transactionRoutes';

dotenv.config();
configurePassport();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Database Connection
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Routes
app.use('/auth', authRoutes);

// Default Route
app.get('/', (_req, res) => {
  res.send('Hello World!');
});

app.use('/api/profile', profileRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/transactions', transactionRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
