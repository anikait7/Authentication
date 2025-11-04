import dotenv from 'dotenv';
import app from './app.js';
import connectDb from "./db/index.js";
import { connect } from 'mongoose';
dotenv.config();
const port = process.env.PORT || 3000;

connectDb()
      .then(() => {
        app.listen(port, () => {
          console.log(`Server is running on port ${port}`);
        });
      })
      .catch((err) => {
        console.error("Failed to connect to the database", err);
        process.exit(1);
      })
