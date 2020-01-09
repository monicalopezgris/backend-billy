process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();


chai.use(chaiHttp);

let actualResponse = undefined;
const testCif = "B00000000"
const testAdmin = "5cddb539a06bde0ab55c503d"
const realUser = {
  username: "admin",
  password: "admin"
}
const nonExistUser = {
  username: "nonExistUser",
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
});