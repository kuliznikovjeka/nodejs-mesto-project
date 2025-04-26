import { z } from 'zod';
// local
import { VALIDATION_MESSAGES } from './validation-messages';

export const validateLoginSchema = z.object({
  body: z.object({
    email: z.string().email(VALIDATION_MESSAGES.email.incorrectFormat),
    password: z.string().min(8, `${VALIDATION_MESSAGES.password.min}8`),
  }),
});

export const validateCreateUserSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, `${VALIDATION_MESSAGES.name.min}2`)
      .max(30, `${VALIDATION_MESSAGES.name.max}30`)
      .optional(),
    about: z
      .string()
      .min(2, `${VALIDATION_MESSAGES.about.min}2`)
      .max(200, `${VALIDATION_MESSAGES.about.max}200`)
      .optional(),
    avatar: z.string().url(VALIDATION_MESSAGES.avatar.incorrectFormat).optional(),
    email: z.string().email(VALIDATION_MESSAGES.email.incorrectFormat),
    password: z.string().min(8, `${VALIDATION_MESSAGES.password.min}8`),
  }),
});

export const validateUserIdSchema = z.object({
  params: z.object({
    userId: z
      .string()
      .length(24, `${VALIDATION_MESSAGES.userId.length}24`)
      .regex(/^[a-f0-9]+$/, VALIDATION_MESSAGES.userId.incorrectFormat),
  }),
});

export const validateUpdateUserProfileSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, `${VALIDATION_MESSAGES.name.min}2`)
      .max(30, `${VALIDATION_MESSAGES.name.max}30`)
      .optional(),
    about: z
      .string()
      .min(2, `${VALIDATION_MESSAGES.about.min}2`)
      .max(200, `${VALIDATION_MESSAGES.about.max}200`)
      .optional(),
  }),
});

export const validateAvatarUpdateSchema = z.object({
  body: z.object({
    avatar: z.string().url(VALIDATION_MESSAGES.avatar.incorrectFormat),
  }),
});

export const validateCreateCardSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, `${VALIDATION_MESSAGES.name.min}2`)
      .max(30, `${VALIDATION_MESSAGES.name.max}30`),
    link: z.string().url(VALIDATION_MESSAGES.link.incorrectFormat),
  }),
});

export const validateCardIdSchema = z.object({
  params: z.object({
    cardId: z
      .string()
      .length(24, `${VALIDATION_MESSAGES.userId.length}24`)
      .regex(/^[a-f0-9]+$/, VALIDATION_MESSAGES.userId.incorrectFormat),
  }),
});
