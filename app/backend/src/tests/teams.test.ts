import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import TeamsModel from '../database/models/TeamModel';
import { Response } from 'superagent';
import teamsReturnMock from './mocks/teams.mock';

chai.use(chaiHttp);
const { expect } = chai;

describe('Route: GET /teams', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon.stub(TeamsModel, 'findAll').resolves(teamsReturnMock as TeamsModel[]);
  });
  after(() => {
    (TeamsModel.findAll as sinon.SinonStub).restore();
  });

  it('Should return an array of teams', async () => {
    chaiHttpResponse = await chai.request(app).get('/teams');

    expect(chaiHttpResponse.body).to.be.deep.equal(teamsReturnMock);
    expect(chaiHttpResponse.status).to.be.equal(200);
  });
});

describe('Route: GET /teams/:id', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon.stub(TeamsModel, 'findByPk').resolves(teamsReturnMock[0] as TeamsModel);
  });

  after(() => {
    (TeamsModel.findByPk as sinon.SinonStub).restore();
  });

  it('Should return a single team by its id', async () => {
    chaiHttpResponse = await chai.request(app).get('/teams/1');

    expect(chaiHttpResponse.body).to.be.deep.equal(teamsReturnMock[0]);
    expect(chaiHttpResponse.status).to.be.equal(200);
  });
});

describe('Route: GET /teams/:id with invalid id', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon.stub(TeamsModel, 'findByPk').resolves(null);
  });

  after(() => {
    (TeamsModel.findByPk as sinon.SinonStub).restore();
  });

  it('Should return a 404 status', async () => {
    chaiHttpResponse = await chai.request(app).get('/teams/999');

    expect(chaiHttpResponse.status).to.be.equal(404);
  })
})