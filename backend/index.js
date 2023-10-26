import express, { request, response } from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

// Middleware for parsing request bodyy
app.use(express.json());

// Middleware for parsing CORS POLICY
// Option 1: Allow all origins with default of cors(*)
app.use(cors());

// Option 2: allow custom
// cors({
//   origin: 'http://localhost:3000',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type'],
// });

app.get('/', (request, response) => {
  console.log(request);
  return response
    .status(234)
    .send('Welcome to MERN Stack - Book Store API by Shehan Maxwell');
});

app.use('/books', booksRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to the database');
    app.listen(PORT, () => {
      console.log(`App is listening to port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
