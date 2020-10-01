import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { FirebaseModule } from 'nestjs-firebase';
import { BooksModule } from './model/books/books.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.development.env',
  }),
  FirebaseModule.forRoot({
    googleApplicationCredential: "firebase-admin-sdk.json",
  }),
    BooksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
