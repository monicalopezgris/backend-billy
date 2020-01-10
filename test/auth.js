process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();


chai.use(chaiHttp);

const realUser = {
  username: "testing",
  password: "testing"
}
const nonExistUser = {
  username: "nonExistUser",
  password: "aaa"
}
const nonPassUser = {
  username: "testing",
  password: "aaa"
}

describe('LOGIN', () => {
  it("it should res 422 on inexistent username", (done) => {
    chai.request(server)
      .post('/auth/login')
      .send(nonExistUser)
      .end((err, res) => {
        res.should.have.status(422);
        done();
      });
  });
  it("it should res 401 on wrong password", (done) => {
    chai.request(server)
      .post('/auth/login')
      .send(nonPassUser)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
  it("it should res 200 on successful login", (done) => {
    chai.request(server)
      .post('/auth/login')
      .send(realUser)
      .end((err, res) => {
        res.should.have.status(200);
      });
    done();
  });
});