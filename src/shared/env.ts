if (!process.env.DATABASE_URL) throw new Error('Ошибка, не найден url подключения к базе данных');
if (!process.env.SERVER_PORT) throw new Error('Ошибка, не найден порт');

export const { DATABASE_URL } = process.env;
export const { SERVER_PORT } = process.env;
