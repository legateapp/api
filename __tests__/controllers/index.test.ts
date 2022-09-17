import request from 'supertest';
import App from '../../src/app';

describe('Index Controller', () => {
  const app = new App();
  describe('[GET] /', () => {
    it('returns a response of 200 status OK', async () => {
      await request(app.getApplication()).get('/').expect(200);
    });

    it('returns ping: pong when fetched', async () => {
      const response = await request(app.getApplication()).get('/');

      expect(response.body).toHaveProperty('ping');
      expect(response.body.ping).toEqual('pong');
    });
  });
});
