import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { CqrsModule } from '@nestjs/cqrs';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { resolve } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GqlJwtAuthGuard } from './auth/auth.guard';
import { AuthModule } from './auth/auth.module';
import { CategorieModule } from './categorie/categorie.module';
import { GlobalGqlExceptionFilter } from './filters/global-gql-http-exception.filter';
import { LoggerModule } from './logger/logger.module';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.DATABASE_URL,
        dbName: process.env.DATABASE_NAME,
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
    CategorieModule,
    AuthModule,
    TaskModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalGqlExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: GqlJwtAuthGuard,
    },
    AppService,
  ],
})
export class AppModule {}
