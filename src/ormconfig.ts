// import { ConnectionOptions } from 'typeorm';

// // You can load you .env file here synchronously using dotenv package (not installed here),
// // import * as dotenv from 'dotenv';
// // import * as fs from 'fs';
// // const environment = process.env.NODE_ENV || 'development';
// // const data: any = dotenv.parse(fs.readFileSync(`${environment}.env`));
// // You can also make a singleton service that load and expose the .env file content.
// // ...


// // Check typeORM documentation for more information.
// // const config: ConnectionOptions = {
//     //   host: process.env.POSTGRES_HOST,
//     //   port: parseInt(<string>process.env.POSTGRES_PORT),
//     //   username: process.env.POSTGRES_USER,
//     //   password: process.env.POSTGRES_PASSWORD,
//     //   database: process.env.POSTGRES_DATABASE,
//     //   autoLoadEntities: true,
//     //   synchronize: true,
//     // entities: ["../submodules/Portfolio-Platform-Entities/*.ts"],

//     // // We are using migrations, synchronize should be set to false.
//     // synchronize: true,

//     // Run migrations automatically,
//     // you can disable this if you prefer running migration manually.
//     migrationsRun: false,
//     logging: true,
//     logger: 'file',

//     // Allow both start:prod and start:dev to use migrations
//     // __dirname is either dist or src folder, meaning either
//     // the compiled js in prod or the ts in dev.
//     migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
//     cli: {
//         // Location of migration should be inside src folder
//         // to be compiled into dist/ folder.
//         migrationsDir: 'src/migrations',
//     },
// };

// export = config