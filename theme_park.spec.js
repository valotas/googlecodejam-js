
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

  describe('arguments processing', function () {
    it('should be able to compute the arguments with a 2 line string input', function () {
      expect(theme_park.getArguments('4 6 4', '1 4 2 1')).to.deep.equal({
        rounds: 4,
        maxPersonsPerGroup: 6,
        groups: [1, 4, 2, 1]
      });
    });
  });

  // stuff for the imporved solution
  describe('income per round', function () {
    var computeIncomePerRound = theme_park.computeIncomePerRound;

    it('should return an object describing the costs per rounds for each pass', function () {
      var ipr = computeIncomePerRound(6, [1, 2, 5, 6, 1]);
      expect(ipr.first).not.to.be.undefined;
      expect(ipr.others).to.be.a('array');
    });

    it('should return 6 as first cost and [9, 8] as the other\'s for k 10 and groups 1,5,6,1,3', function () {
      var ipr = computeIncomePerRound(10, [1, 5, 7, 1, 3]);
      expect(ipr.first).to.equal(6);
      expect(ipr.others).to.deep.equal([9, 8]);
    });

    it('should return an object that can compute the actual cost', function () {
      var ipr = computeIncomePerRound(10, [1, 5, 7, 1, 3]);
      expect(ipr.incomeAfterRounds(1)).to.equal(6);
      expect(ipr.incomeAfterRounds(2)).to.equal(14);
      expect(ipr.incomeAfterRounds(3)).to.equal(23);
      expect(ipr.incomeAfterRounds(4)).to.equal(31);
    });

    it('should return 1 as first cost and [1] as the other\'s for any k and groups [1]', function () {
      for (var i = 1; i < 20; i++) {
        var ipr = computeIncomePerRound(10, [1]);
        expect(ipr.first).to.equal(1);
        expect(ipr.others).to.deep.equal([1]);
        expect(ipr.incomeAfterRounds(i)).to.equal(i);
      }
    });

    it('should return (5,[4,6,6]) for k = 6 and groups [1, 4, 2, 1]', function () {
      var ipr = computeIncomePerRound(6, [1, 4, 2, 1]);
      expect(ipr.first).to.equal(5);
      expect(ipr.others).to.deep.equal([4, 6, 6]);
    });
  });

});
