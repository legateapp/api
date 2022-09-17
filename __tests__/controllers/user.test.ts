import Sinon from 'sinon';
import request from 'supertest';
import { User } from '@prisma/client';
import UserService from '../../src/services/user.service';
import App from '../../src/app';

describe('User Controller', () => {
  const { application } = new App();

  afterEach(() => {
    Sinon.restore();
  });

  describe('[POST] /users', () => {
    it('returns a 409 bad request if the email is already taken', async () => {
      Sinon.stub(UserService.prototype, 'findByEmail').resolves({} as User);

      await request(application)
        .post('/users')
        .send({ name: 'Connor Bell', email: 'connor@legate.app', password: '6raid@x99JM4g!nC' })
        .expect(409);
    });

    it('returns a status of 400 when the password isnt strong enough', async () => {
      Sinon.stub(UserService.prototype, 'findByEmail').resolves(null);

      await request(application)
        .post('/users')
        .send({ name: 'Connor Bell', email: 'connor@legate.app', password: 'connor' })
        .expect(400);
    });

    it('returns a status of 400 if the email isnt valid', async () => {
      Sinon.stub(UserService.prototype, 'findByEmail').resolves(null);

      await request(application)
        .post('/users')
        .send({ name: 'Connor Bell', email: 'connor', password: '6raid@x99JM4g!nC' })
        .expect(400);
    });

    it('return a status of 201 when the user has been created', async () => {
      Sinon.stub(UserService.prototype, 'findByEmail').resolves(null);
      Sinon.stub(UserService.prototype, 'create').resolves({} as User);

      await request(application)
        .post('/users')
        .send({ name: 'Connor Bell', email: 'connor@legate.app', password: '6raid@x99JM4g!nC' })
        .expect(201);
    });
  });
});
