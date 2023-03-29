import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import UserModel from '../database/models/UserModel';
import { Response } from 'superagent';
// Mock import

chai.use(chaiHttp);
const { expect } = chai;

describe('Route POST /login', () => {
  describe('Valid Request', () => {
    let chaiHttpResponse: Response;

    // before
    // after
    it('Shoudl return status 200 and a token');
  });
  describe('Invalid Request - Missing email', () => {
    let chaiHttpResponse: Response;

    // before
    // after
    it('Should return status 400 and a message');
  });
  describe('Invalid Request - Missing password', () => {
    let chaiHttpResponse: Response;

    // before
    // after
    it('Should return status 400 and a message');
  });
  describe('Invalid Request - Invalid email', () => {
    let chaiHttpResponse: Response;

    // before
    // after
    it('Should return status 401 and a message');
  });
  describe('Invalid Request - Invalid password', () => {
    let chaiHttpResponse: Response;

    // before
    // after
    it('Should return status 401 and a message');
  });
});