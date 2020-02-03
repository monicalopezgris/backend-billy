// process.env.NODE_ENV = 'test';

// let chai = require('chai');
// let chaiHttp = require('chai-http');
// let server = require('../app');
// let request = require('supertest');
// let should = chai.should();


// chai.use(chaiHttp);

// let actualResponse = undefined;
// const testCif = "B00000000"
// const testAdmin = "5cfe864205d93717dcba3ade"
// const companyFull = {
//   admin: testAdmin,
//   name: "copmanyBanana",
//   cif: testCif,
//   street: "streetcorpaa",
//   postalCode: "08225",
//   streetNum: "3",
//   country: "spain"
// }
// const companyNoAdmin = {
//   name: "copmanyBanana",
//   cif: testCif,
//   street: "streetcorpaa",
//   postalCode: "08225",
//   streetNum: "3",
//   country: "spain"
// }
// const companyNoCif = {
//   admin: testAdmin,
//   name: "copmanyBanana",
//   street: "streetcorpaa",
//   postalCode: "08225",
//   streetNum: "3",
//   country: "spain"
// }
// const companyUpdate = {
//   admin: testAdmin,
//   name: "companyLele",
//   cif: testCif,
//   street: "streetcorpaa",
//   postalCode: "08225",
//   streetNum: "3",
//   country: "spain"
// }
// var roleAdmin = request.agent(server);

// const realUser = {
//   username: "testing",
//   password: "testing"
// }
// before((done) => {
//   roleAdmin
//     .post('/auth/login')
//     .send(realUser)
//     .end((err, res) => {
//       res.should.have.status(200);
//       done();
//     });
// });

// describe('/POST company', () => {

//   it('it should not POST a company without admin field', (done) => {
//     roleAdmin
//       .post('/api/company')
//       .send(companyNoAdmin)
//       .end((err, res) => {
//         res.should.have.status(422);
//         res.body.should.be.a('array');
//         res.body.forEach(element => {
//           element.should.have.property('param');
//           element.should.have.property('msg');
//         });
//         done();
//       });
//   });
//   it('it should not POST a company without CIF field', (done) => {
//     roleAdmin
//       .post('/api/company')
//       .send(companyNoCif)
//       .end((err, res) => {
//         res.should.have.status(422);
//         res.body.should.be.a('array');
//         res.body.forEach(element => {
//           element.should.have.property('param');
//           element.should.have.property('msg');
//         });
//         done();
//       });
//   });

//   it('should POST a company', (done) => {
//     roleAdmin
//       .post('/api/company')
//       .send(companyFull)
//       .end((err, res) => {
//         res.should.have.status(200);
//         res.body.should.be.a('object');
//         actualResponse = res.body._id;
//         done();
//       })
//   })
// });
// describe('/UPDATE company', () => {
//   it('should send 500 if user is not admin of the company', (done) => {
//     roleAdmin
//       .put('/api/company/' + actualResponse)
//       .send(companyUpdate)
//       .end((err, res) => {
//         res.should.have.status(500);
//         done();
//       })
//   })
//   it('should send 200 on succeful UPDATE', (done) => {
//     roleAdmin
//       .put('/api/company/' + actualResponse)
//       .send(companyUpdate)
//       .end((err, res) => {
//         res.should.have.status(200);
//         done();
//       })
//   })
// })
// describe('/DELETE company', () => {
//   it('should send 500 if user is not admin of the company', (done) => {
//     roleAdmin
//       .delete('/api/company/' + actualResponse)
//       .end((err, res) => {
//         res.should.have.status(500);
//         done();
//       })
//   })
//   it('should send 200 on succeful deletion', (done) => {
//     roleAdmin
//       .delete('/api/company/' + actualResponse)
//       .end((err, res) => {
//         res.should.have.status(200);
//         done();
//       })
//   })
// })