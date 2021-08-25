import * as mongoose from 'mongoose';
import IUser from '../interfaces/user_interface';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    default: 0,
  },
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
