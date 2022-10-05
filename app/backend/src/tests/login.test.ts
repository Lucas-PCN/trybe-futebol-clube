import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('/login', () => {
  describe('Rota POST', () => {
    it('Loga um usuário que não existe', async () => {
      const result = await chai.request(app).post('/login').send({
        email: 'teste@teste.com',
        password: '98765'
      });
      expect(result.text).to.include("Incorrect email or password");
      expect(result.status).to.be.equal(401);
    });

    it('Loga um usuário com um email inválido', async () => {
      const result = await chai.request(app).post('/login').send({
        email: 'wrongemail.com',
        password: '123456'
      });
      expect(result.text).to.include('Invalid Email Format');
      expect(result.status).to.be.equal(400);
    });

    it('Loga um usuário com uma senha inválida', async () => {
      const result = await chai.request(app).post('/login').send({
        email: 'admin@admin.com',
        password: '98765'
      });
      expect(result.text).to.include('Incorrect email or password');
      expect(result.status).to.be.equal(401);
    });

    it('Loga um usuário com sucesso', async () => {
      const result = await chai.request(app).post('/login').send({
        email: 'admin@admin.com',
        password: 'secret_admin'
      });
      expect(result.status).to.be.equal(200);
    });

    it('Recebe um token quando logado com sucesso', async () => {
      const result = await chai.request(app).post('/login').send({
        email: 'admin@admin.com',
        password: 'secret_admin'
      });

      expect(result.text).to.contain('token');
    });
  });
});
