import * as sinon from 'sinon';
import * as chai from 'chai';
//@ts-ignore
import * as chaiHttp from 'chai-http';
import { app } from '../app';
import { expect } from 'chai';
import User from '../database/models/Users';
import LoginService from '../services/loginService';
import JwtService from '../services/jwtService';

chai.use(chaiHttp)
const jwtService = new JwtService();

const usersMock = {
    id:2,
    username: 'User',
    role: 'user',
    email: 'user@user.com',
    password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO', 
      // senha: secret_user
  }

const tokenMock = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJ1c2VybmFtZSI6IlVzZXIiLCJpYXQiOjE2NjEzNjQxOTR9.1ThbyIN41FrUaoS9SJ-NZXRnTDTxh7gGCT-Wga6TRgw'

const userLoginMock = {
  email: 'user@user.com',
  password: 'secret_user',
}

describe('Testando se na rota /login', () => {
  beforeEach(() => {
    sinon.restore();
  })
  it('é efetuado login com sucesso', async () => {
    sinon.stub(User, 'findOne').resolves(usersMock as User)

    const response = await chai.request(app).post('/login').send(userLoginMock)

    expect(response.status).to.equal(200)
  })
  it('retorna a role quando é requisitado', async () => {
    sinon.stub(jwtService, 'validateToken').returns({
      id: usersMock.id,
      role: usersMock.role,
      email: usersMock.email,
      username: usersMock.username
    })
    const response = await chai.request(app).get('/login/validate').set({ authorization: tokenMock })

    expect(response.status).to.equal(200)
  })
  it('retorna um erro quando enviado com ausencia de dados(sem email)', async () => {
    const response = await chai.request(app).post('/login').send({ password: 'secret_user' })

    expect(response.status).to.equal(400)
  })
  it('retorna um erro quando enviado com ausencia de dados(sem token)', async () => {
    const response = await chai.request(app).get('/login/validate').set({  })

    expect(response.status).to.equal(401)
  })
})