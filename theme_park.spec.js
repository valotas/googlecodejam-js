
var expect = require('chai').expect,
  theme_park = require('./theme_park.js');

describe('theme_park', function () {
  var calculateIncome = theme_park.calculateIncome;

  it ('should have the calculateIncome function', function () {
    expect(calculateIncome).not.to.be.undefined;
  });

  it('should return 21 for 4 rounds, 6 max persons and the groups: 1,4,2,1', function () {
    expect(calculateIncome(4, 6, [1, 4, 2, 1])).to.equal(21);
  });

  it('should return 100 for 100 rounds, 10 max persons and the groups: 1', function () {
    expect(calculateIncome(100, 10, [1])).to.equal(100);
  });

  it('should return 20 for 5 rounds, 5 max persons and the groups: 2,4,2,3,4,2,1,2,1,3', function () {
    expect(calculateIncome(5, 5, [2,4,2,3,4,2,1,2,1,3])).to.equal(20);
  });

  it('should return 20 for 5 rounds, 5 max persons and the groups: 2,4,2,3,4,2,1,2,1,3', function () {
    expect(calculateIncome(5, 2, [2,2])).to.equal(10);
  });

  it('should be able to compute the arguments with a 2 line string input', function () {
    expect(theme_park.getArguments('4 6 4', '1 4 2 1')).to.deep.equal({
      rounds: 4,
      maxPersonsPerGroup: 6,
      groups: [1, 4, 2, 1]
    });
  });
});
