const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);

describe('Express App', function () {
  it('Should return "3,3V" when "/getVoltage" is called', function (done) {
    chai.request(app)
      .get('/getVoltage')
      .end((err, res) => {
        chai.expect(res).to.have.status(200);
        chai.expect(res.text).to.equal('3,3V');
        done();
      });
  });

  it('Should return "28,5°C" when "/getTemperature" is called', function (done) {
    chai.request(app)
      .get('/getTemperature')
      .end((err, res) => {
        chai.expect(res).to.have.status(200);
        chai.expect(res.text).to.equal('28,5°C');
        done();
      });
  });
});
