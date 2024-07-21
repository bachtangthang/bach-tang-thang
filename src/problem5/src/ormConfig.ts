
import { DataSourceOptions, DataSource } from 'typeorm';

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: Number(process.env.POSTGRES_PORT || 5432),
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'thangbach5217113',
  database: process.env.POSTGRES_DB || 'postgres',
  entities: [
    __dirname + '/../**/*.entity{.ts,.js}',
  ],
  migrations: [
    'src/migrations/*.ts',
  ],
  migrationsRun: true, // If you want to run migrations automatically on each application launch
  logging: true, // Enable logging for debugging purposes
  synchronize: true, // Don't use synchronize in production, use migrations instead
};

const dataSource = new DataSource(dataSourceOptions);

dataSource.initialize()
.then(() => {
  console.log('Data Source has been initialized!');
  // Your application initialization logic here
})
.catch((err) => {
  console.error('Error during Data Source initialization:', err);
});

export { dataSource };
