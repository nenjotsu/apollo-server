import mongoose from 'mongoose';

import User from './user';
import Message from './message';
import Payment from './payment';
import Unit from './unit';

const connectDb = () => {
  if (process.env.TEST_DATABASE_URL) {
    return mongoose.connect(process.env.TEST_DATABASE_URL, {
      useNewUrlParser: true,
    });
  }

  if (process.env.DATABASE_URL) {
    return mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
};

const models = { User, Message, Payment, Unit };

export { connectDb };

export default models;
