import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import UserModel from '../database/models/UserModel';
import * as jwt from 'jsonwebtoken';
import { Response } from 'superagent';
import { validLogin, invalidLogin, returnedUser, token } from './mocks/login.mock';

chai.use(chaiHttp);
const { expect } = chai;

describe('Route POST /login', () => {
  describe('Valid Request', () => {
    let chaiHttpResponse: Response;

    before(async () => {
      sinon.stub(UserModel, 'findOne').resolves(returnedUser as UserModel);
    });
    after(() => {
      (UserModel.findOne as sinon.SinonStub).restore();
    });
    it('Should return status 200 and a token', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send(validLogin);
      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.have.property('token');
    });
  });
  describe('Invalid Request - Missing fields', () => {
    let chaiHttpResponse: Response;

    it('Should return status 400 and a message', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({ email: validLogin.email });
      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
    });

    it('Sould return status 400 and a message', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({ password: validLogin.password });
      expect(chaiHttpResponse).to.have.status(400);
      expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
    })
  });
  describe('Invalid Request - Invalid email', () => {
    let chaiHttpResponse: Response;
    const invalid = 'Invalid email or password';

    before(async () => {
      sinon.stub(UserModel, 'findOne').resolves(null);
    });
    after(() => {
      (UserModel.findOne as sinon.SinonStub).restore();
    });
    it('Should return status 401 and a message when the email is not valid', async () => {
      chaiHttpResponse = await chai.request(app).post('/login')
        .send({ email: invalidLogin.email, password: validLogin.password });
      expect(chaiHttpResponse).to.have.status(401);
      expect(chaiHttpResponse.body.message).to.be.equal(invalid);
    });
    it('Should return status 401 and a message when the password is not valid', async () => {
      chaiHttpResponse = await chai.request(app).post('/login')
        .send({ email: validLogin.email, password: invalidLogin.password });
      expect(chaiHttpResponse).to.have.status(401);
      expect(chaiHttpResponse.body.message).to.be.equal(invalid);
    });
    it('Should return status 401 and a message when the email is not found', async () => {
      chaiHttpResponse = await chai.request(app).post('/login')
        .send({ email: invalidLogin.wrongEmail, password: validLogin.password });
      expect(chaiHttpResponse).to.have.status(401);
      expect(chaiHttpResponse.body.message).to.be.equal(invalid);
    });
    it('Should return status 401 and a message when the password is not correct', async () => {
      chaiHttpResponse = await chai.request(app).post('/login')
        .send({ email: validLogin.email, password: invalidLogin.wrongPassword });
      expect(chaiHttpResponse).to.have.status(401);
      expect(chaiHttpResponse.body.message).to.be.equal(invalid);
    });
  });
});

describe('Route GET /login/role - Invalid Token', () => {
  let chaiHttpResponse: Response;
  // Deve retornar 401 "Token not found" caso requisicao sem token
  it('Should return status 401 and message "Token not found" when requesting without a token', async () => {
    chaiHttpResponse = await chai.request(app).get('/login/role');

    expect(chaiHttpResponse).to.have.status(401);
    expect(chaiHttpResponse.body.message).to.be.equal('Token not found');
  });

  // Deve retornar 401 "Token must be a valid token" com token invalido
  it('Should return status 401 and message "Token must be a valid token"', async () => {
    chaiHttpResponse = await chai.request(app).get('/login/role').set('Authorization', 'asd');

    expect(chaiHttpResponse).to.have.status(401);
    expect(chaiHttpResponse.body.message).to.be.equal('Token must be a valid token');
  });
});

describe('Route GET /login/role - Valid Token', () => {
  before(async () => {
    sinon.stub(jwt, 'verify').resolves(returnedUser);
  });
  after(() => {
    (jwt.verify as sinon.SinonStub).restore();
  });

  let chaiHttpResponse: Response;
  // Deve retornar 200 e a "role" do usuario atraves do token valido
  it('Should return status 200 and the user role with a valid token', async () => {
    chaiHttpResponse = await chai.request(app).get('/login/role')
      .set('Authorization', token);

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.deep.equal({ role: 'admin' });
  });
})