export const VALIDATION_MESSAGES = {
  password: {
    min: 'Минимальная длина пароля - ',
    required: 'Поле пароля должно быть заполнено',
  },
  email: {
    required: 'Поле почты должно быть заполнено',
    incorrectFormat: 'Некорректный формат почты',
  },
  name: {
    min: 'Минимальная длина имени - ',
    max: 'Максимальная длина имени - ',
    required: 'Поле названия должно быть заполнено',
  },
  about: {
    min: 'Минимальная длина описания - ',
    max: 'Максимальная длина описания - ',
  },
  avatar: {
    incorrectFormat: 'Некорректный URL аватара. Введите правильный URL',
  },
  userId: {
    incorrectFormat: 'Некорректный id пользователя',
    length: 'ID пользователя должен состоять из длины, равной ',
  },
  cardId: {
    incorrectFormat: 'Некорректный id карточки',
    length: 'ID карточки должен состоять из длины, равной ',
  },
  link: {
    incorrectFormat: 'Некорректный URL. Введите правильный URL',
    required: 'Поле ссылки должно быть заполнено',
  },
  owner: {
    required: 'Поле владелец должно быть заполнено',
  },
};
