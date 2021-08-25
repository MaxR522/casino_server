import { Document } from 'mongoose';

interface IUser extends Document {
  username: string;
  email: string;
  age: number;
  password: string;

  // to store score
  score: number;
}

export default IUser;
