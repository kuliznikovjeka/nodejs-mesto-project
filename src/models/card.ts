import mongoose, { Schema, Types } from 'mongoose';
// shared
import { VALIDATION_MESSAGES } from '../shared/validators/validation-messages';

type TCard = {
  name: string;
  link: string;
  owner: Types.ObjectId;
  likes: Types.ObjectId[];
  createdAt: Date;
};

const cardSchema = new Schema<TCard>(
  {
    name: {
      type: String,
      required: [true, VALIDATION_MESSAGES.name.required],
      minLength: [2, `${VALIDATION_MESSAGES.name.min}2`],
      maxlength: [30, `${VALIDATION_MESSAGES.name.max}30`],
    },
    link: {
      type: String,
      required: [true, VALIDATION_MESSAGES.link.required],
      validate: {
        validator(link: string) {
          const regexp = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/;
          return regexp.test(link);
        },
        message: VALIDATION_MESSAGES.link.incorrectFormat,
      },
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, VALIDATION_MESSAGES.owner.required],
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        default: [],
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
);

export const Card = mongoose.model<TCard>('Card', cardSchema);
