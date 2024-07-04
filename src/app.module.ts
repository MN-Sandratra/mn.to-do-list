import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { CqrsModule } from '@nestjs/cqrs';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { resolve } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GlobalGqlExceptionFilter } from './filters/global-gql-http-exception.filter';
import { LoggerModule } from './logger/logger.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: 'mongodb://root:todo123@localhost:27027',
        dbName: 'todolist',
      }),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: resolve(__dirname, 'schema.gql'),
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    CqrsModule.forRoot(),
    UserModule,
    LoggerModule,
    ConfigModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalGqlExceptionFilter,
    },
    AppService,
  ],
})
export class AppModule {}
