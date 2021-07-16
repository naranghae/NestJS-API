import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, //아무 decorator도 없는 어떠한 속성의 오브젝트를 거른다.
    forbidNonWhitelisted: true, //요소에 없는 것을 보내면 리퀘스트를 막는다.
    transform: true, //리퀘스트할 때 실제 타입으로 변환시킨다.
  })
  );
  await app.listen(3000);
}
bootstrap();
