import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, //아무 decorator도 없는 어떠한 속성의 오브젝트를 거른다.
        forbidNonWhitelisted: true, //요소에 없는 것을 보내면 리퀘스트를 막는다.
        transform: true, //리퀘스트할 때 실제 타입으로 변환시킨다.
      })
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to my Movie API');
  });

  describe('/moives', () => {
    it('GET', () => {
      return request(app.getHttpServer())
        .get('/movies')
        .expect(200)
        .expect([]);
    });
    it('POST', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'Test Movie',
          genres: ['test'],
          year: 2021
        })
        .expect(201);
    })
    it('POST 400', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'Test Movie',
          genres: ['test'],
          year: 2021,
          other: 'thing'
        })
        .expect(400);
    })
    it('DELETE', () => {
      return request(app.getHttpServer())
        .delete('/movies')
        .expect(404)
    })
  });
  describe('/movies/:id', () => {
    it('GET 200', () => {
      return request(app.getHttpServer())
        .get('/movies/1')
        .expect(200);
    })
    it('GET 404', () => {
      return request(app.getHttpServer())
        .get('/movies/999')
        .expect(404);
    })
    it('PATCH', () => {
      return request(app.getHttpServer())
        .patch('/movies/1')
        .send({ title: 'Updated Test' })
        .expect(200);
    })
    it('DELETE', () => {
      return request(app.getHttpServer())
        .delete('/movies/1')
        .expect(200)
    });
    it.todo('PATCH');
  });
});
