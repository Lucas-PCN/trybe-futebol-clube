import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('/teams', () => {
  describe('Rota GET', () => {
    it('Lista todos os times', async () => {
      const result = await chai.request(app).get('/teams').send({});

      expect(result.status).to.be.equal(200);
      expect(result.body).to.have.length(16);
    });

    it('Lista times pelo id', async () => {
      const result = await chai.request(app).get('/teams/1').send({});
      expect(result.body).to.have.property('id');
      expect(result.body).to.have.property('teamName');
    });
  });
});
