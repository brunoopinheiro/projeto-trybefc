import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import MatchModel from '../database/models/MatchModel';
import TeamsService from '../services/teams.service';
import { Response } from 'superagent';
import matchesMock, { invalidMatchBody, newMatch, newMatchBody, queryTrueMock, updateMock } from './mocks/matches.mock';
import * as jwt from 'jsonwebtoken';
import { returnedUser, token } from './mocks/login.mock';

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

  describe('Route: GET /matches?inProgress=true', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon.stub(MatchModel, 'findAll').resolves(queryTrueMock as unknown as MatchModel[]);
    });
    after(() => {
      (MatchModel.findAll as sinon.SinonStub).restore();
    });

    it('Should return an array of matches', async () => {
      chaiHttpResponse = await chai.request(app).get('/matches?inProgress=true');

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(queryTrueMock);
    });
  });

  describe('Route: GET /matches?inProgress=false', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon.stub(MatchModel, 'findAll').resolves(matchesMock as unknown as MatchModel[]);
    });
    after(() => {
      (MatchModel.findAll as sinon.SinonStub).restore();
    });

    it('Should return an array of matches', async () => {
      chaiHttpResponse = await chai.request(app).get('/matches?inProgress=false');

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(matchesMock);
    });
  });

  describe('Route GET /matches?inProgress=incorrect', () => {
    let chaiHttpResponse: Response;

    it('Should return an error', async () => {
      chaiHttpResponse = await chai.request(app).get('/matches?inProgress=incorrect');

      expect(chaiHttpResponse).to.have.status(400);
    });
  });

  describe('Route PATCH /matches/:id/finish', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon.stub(jwt, 'verify').resolves(returnedUser);
      sinon.stub(MatchModel, 'update').resolves([1]);
    });

    after(() => {
      (jwt.verify as sinon.SinonStub).restore();
      (MatchModel.update as sinon.SinonStub).restore();
    });

    it('Should return status 200 and a message', async () => {
      chaiHttpResponse = await chai.request(app).patch('/matches/41/finish').set('Authorization', token);

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body.message).to.be.equal('Finished');
    });
  });

  describe('Route: PATCH /matches/:id', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon.stub(jwt, 'verify').resolves(returnedUser);
      sinon.stub(MatchModel, 'update').resolves([1]);
    });

    after(() => {
      (jwt.verify as sinon.SinonStub).restore();
      (MatchModel.update as sinon.SinonStub).restore();
    });

    it('Should return status 200 and a message', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .patch('/matches/41')
        .set('Authorization', token)
        .send(updateMock);

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body.message).to.be.equal('Updated');
    });
  });

  describe('Route: POST /matches', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon.stub(jwt, 'verify').resolves(returnedUser);
      sinon.stub(TeamsService, 'verifyById').resolves(true);
      sinon.stub(MatchModel, 'create').resolves(newMatch as unknown as MatchModel);
    });

    after(() => {
      (jwt.verify as sinon.SinonStub).restore();
      (TeamsService.verifyById as sinon.SinonStub).restore();
      (MatchModel.create as sinon.SinonStub).restore();
    });

    it('Should return status 201 and the created match', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .set('Authorization', token)
        .send(newMatchBody);

      expect(chaiHttpResponse).to.have.status(201);
      expect(chaiHttpResponse.body).to.be.deep.equal(newMatch);
    });
  });

  describe('Route: POST /matches - Middlewares', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon.stub(jwt, 'verify').resolves(returnedUser);
      sinon.stub(TeamsService, 'verifyById').resolves(false);
    });
    after(() => {
      (jwt.verify as sinon.SinonStub).restore();
      (TeamsService.verifyById as sinon.SinonStub).restore();
    });

    it('Should return status 422 and a message', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .set('Authorization', token)
        .send(invalidMatchBody);

      expect(chaiHttpResponse).to.have.status(422);
      expect(chaiHttpResponse.body.message).to.be.equal('It is not possible to create a match with two equal teams');
    });

    it('Should return status 404 and a message', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .set('Authorization', token)
        .send({ ...newMatchBody, awayTeamId: 999 });

      expect(chaiHttpResponse).to.have.status(404);
      expect(chaiHttpResponse.body.message).to.be.equal('There is no team with such id!');
    })
  });
});