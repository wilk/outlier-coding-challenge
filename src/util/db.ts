import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

export const sequelize = new Sequelize(
  process.env.POSTGRES_NAME as string,
  process.env.POSTGRES_USERNAME as string,
  process.env.POSTGRES_PASSWORD,
  {
    dialect: 'postgres',
    logging: false,
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT as string)
  }
);

export const init = async () => {
  await sequelize.authenticate();
  await sequelize.sync({ force: false });
};
