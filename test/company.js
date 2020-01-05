process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();


chai.use(chaiHttp);

let actualResponse = undefined;
const testCif = "B00000000"
const testAdmin = "5cddb539a06bde0ab55c503d"
const companyFull = {
  admin: testAdmin,
  name: "copmanyBanana",
  cif: testCif,
  street: "streetcorpaa",
  postalCode: "08225",
  streetNum: "3",
  country: "spain"
}
const companyNoAdmin = {
  name: "copmanyBanana",
  cif: testCif,
  street: "streetcorpaa",
  postalCode: "08225",
  streetNum: "3",
  country: "spain"
}
const companyNoCif = {
  admin: testAdmin,
  name: "copmanyBanana",
  street: "streetcorpaa",
  postalCode: "08225",
  streetNum: "3",
  country: "spain"
}

describe('/POST company', () => {
  it('it should not POST a company without admin field', (done) => {
    chai.request(server)
      .post('/api/company')
      .send(companyNoAdmin)
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a('array');
        res.body.forEach(element => {
          element.should.have.property('param');
          element.should.have.property('msg');
        });
        done();
      });
  });
  it('it should not POST a company without CIF field', (done) => {
    chai.request(server)
      .post('/api/company')
      .send(companyNoCif)
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a('array');
        res.body.forEach(element => {
          element.should.have.property('param');
          element.should.have.property('msg');
        });
        done();
      });
  });

  it('should POST a company', (done) => {
    chai.request(server)
      .post('/api/company')
      .send(companyFull)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        actualResponse = res.body._id;
        done();
      })
  })
});
describe('DELETE company', () => {
  it('should send 200 on succeful deletion', (done) => {
    chai.request(server)
      .delete('/api/company/' + actualResponse)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      })
    done()
  })
})