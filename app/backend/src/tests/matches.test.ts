import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import MatchModel from '../database/models/MatchModel';
import { Response } from 'superagent';
import matchesMock from './mocks/matches.mock';

chai.use(chaiHttp);
const { expect } = chai;

describe('Tests: Matches routes', () => {
  describe('Route: GET /matches', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon.stub(MatchModel, 'findAll').resolves(matchesMock as unknown as MatchModel[]);
    });
    after(() => {
      (MatchModel.findAll as sinon.SinonStub).restore();
    });

    it('Should return an array of matches', async () => {
      chaiHttpResponse = await chai.request(app).get('/matches');

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(matchesMock);
    })
  });
});