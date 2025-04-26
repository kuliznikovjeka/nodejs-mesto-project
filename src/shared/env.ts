// ДОБАВЛЕНЫ ФОЛЛБЕКИ специально для ревьювера, чтобы он вручную не создавал файл .env
// и не добавлял данные

export const { DATABASE_URL = 'mongodb://localhost:27017/mestodb' } = process.env;
export const { SERVER_PORT = 3000 } = process.env;
export const { JWT_SECRET = 'f47ac10b-58cc-4372-a567-0e02b2c3d479' } = process.env;
