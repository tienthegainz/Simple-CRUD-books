import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

// Import firebase-admin
// import * as admin from 'firebase-admin';
// import { ServiceAccount } from "firebase-admin";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  // Set the config options
  // const adminConfig: ServiceAccount = {
  //   "projectId": configService.get<string>('FIREBASE_PROJECT_ID'),
  //   "privateKey": configService.get<string>('FIREBASE_PRIVATE_KEY')
  //     .replace(/\\n/g, '\n'),
  //   "clientEmail": configService.get<string>('FIREBASE_CLIENT_EMAIL'),
  // };

  // console.log('projectId: ', configService.get<string>('FIREBASE_PROJECT_ID'));
  // console.log('privateKey: ', configService.get<string>('FIREBASE_PRIVATE_KEY').replace(/\\n/g, '\n'));

  // // Initialize the firebase admin app
  // admin.initializeApp({
  //   credential: admin.credential.cert(adminConfig),
  //   databaseURL: "https://books-crud-a2855.firebaseio.com",
  //   projectId: "books-crud-a2855"
  // });

  app.enableCors();

  await app.listen(configService.get<string>('API_PORT') || 4000);
}
bootstrap();
