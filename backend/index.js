import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for parsing CORS POLICY
// Option 1: Allow all origins with the default of cors(*)
app.use(cors());

app.get('/', (request, response) => {
  console.log(request);
  return response
    .status(234)
    .send('Welcome to MERN Stack - Book Store API by Shehan Maxwell');
});

app.use('/books', booksRoute);

const defaultPort = 5555;
const port = process.env.PORT || defaultPort;

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to the database');
    app.listen(port, () => {
      console.log(`App is listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
