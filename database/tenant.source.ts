import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  database: 'blog',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '73-55-608Cyka',
  entities: ['./dist/entities/tenant/**/*.entity.js'],
  migrations: ['./dist/database/tenant/*'],
};

const tenantSource = new DataSource(dataSourceOptions);

export default tenantSource;
