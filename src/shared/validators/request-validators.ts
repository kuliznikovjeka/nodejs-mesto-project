import { celebrate, Joi, Segments } from 'celebrate';

export const validateLoginSchema = celebrate({
  [Segments.BODY]: Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

export const validateCreateUserSchema = celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string().uri(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

export const validateUserIdSchema = celebrate({
  [Segments.PARAMS]: Joi.object({
    userId: Joi.string().length(24).hex().required(),
  }),
});

export const validateUpdateUserProfileSchema = celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
  }),
});

export const validateAvatarUpdateSchema = celebrate({
  [Segments.BODY]: Joi.object({
    avatar: Joi.string().uri(),
  }),
});

export const validateCreateCardSchema = celebrate({
  [Segments.BODY]: Joi.object({
    link: Joi.string().required().uri(),
    name: Joi.string().required().min(2).max(30),
  }),
});

export const validateCardIdSchema = celebrate({
  [Segments.PARAMS]: Joi.object({
    cardId: Joi.string().length(24).hex().required(),
  }),
});
