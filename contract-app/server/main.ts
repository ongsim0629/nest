import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { INestApplication } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import * as http from 'http';

export module Main {
  let app: INestApplication;

  export async function getApp() {
    if (!app) {
      const expressApp = express();
      app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
      app.useGlobalPipes(new ValidationPipe({ transform: true }));
      app.setGlobalPrefix('api');
      await app.init();
    }
    return app;
  }

  export async function getListener() {
    const nestApp = await getApp();
    const server: http.Server = nestApp.getHttpServer();
    const [listener] = server.listeners('request');
    return listener;
  }
}
