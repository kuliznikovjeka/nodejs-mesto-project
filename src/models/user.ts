import mongoose from "mongoose";

export type TUser = {
  name: string;
  about: string;
  avatar: string;
}

const userSchema = new mongoose.Schema<TUser>({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  about: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 200,
  },
  avatar: {
    type: String,
    required: true
  }
});

export const User = mongoose.model<TUser>('User', userSchema);