
var calculateIncome = function (r, k, groups) {
  var i = 0;
  var end = groups.length;
  var total = 0;
  while (r > 0) {
    var sum = 0;
    var inserted = 0;
    while (i < end) {
      var g = groups[i % groups.length];
      sum += g;
      //console.log(r, i, g, sum, sum > k, i === end, total);
      if (sum > k) {
        break;
      }
      i++;
      total += g;
      inserted++;
    }
    r--;
    end += inserted;
  }
  return total;
};

var getArguments = function(line1, line2) {
  var roundsAndPersonsPerGroup = line1.split(' ').map(function (val) {
    return parseInt(val, 10);
  });
  var groups = line2.split(' ').map(function (val) {
    return parseInt(val, 10);
  });
  return {
    rounds: roundsAndPersonsPerGroup[0],
    maxPersonsPerGroup: roundsAndPersonsPerGroup[1],
    groups: groups
  };
};

var IncomeDescription = (function () {

  function IncomeDescription() {
    this.index = 0;
    this.first = null;
    this.others = [];
  }

  IncomeDescription.prototype = {

    insert: function (index, sum) {
      console.log(index, sum);
      this.others[index] = sum;
      if (this.first === null) {
        console.log('first', sum);
        this.first = sum;
      }
    },

    add: function (sum, pass) {
      console.log(this.index, sum, pass);
      var i = pass > 0 ? (this.index % this.others.length) : this.index
      this.others[i] = sum;
      if (this.index === 0) {
        this.first = sum;
      }
      this.index++;
    },

    _sumOfOthers: function () {
      var sum = 0;
      this.others.forEach(function (val) {
        sum += val;
      });
      return sum;
    },

    _diffOfFirst: function () {
      return this.first - this.others[0];
    },

    incomeAfterRounds: function(r) {
      //some all rounds
      var mod = r % this.others.length;
      var sum = (((r - mod) / this.others.length) * this._sumOfOthers());

      //and now the remaining ones
      for (var i = 0; i < mod; i++) {
        sum += this.others[i];
      }

      sum += this._diffOfFirst();

      return sum;
    }
  };

  return IncomeDescription;
})();

var computeIncomePerRound = function (k, groups) {
  var descr = new IncomeDescription();

  //edje case of a groupd of one
  if (groups.length === 1) {
    descr.first = groups[0];
    descr.others = groups;
    return descr;
  }

  var i = 0;
  var pass = 0;
  var sum = 0;
  while (pass < 4) {
    var mod = i % groups.length;
      g = groups[mod],
      pass = (i - mod) / groups.length;
    if (sum + g > k) {
      descr.add(sum, pass);
      sum = 0;
    }
    sum += g;
    i++;
  }

  return descr;
}

var calculateIncome2 = function (r, k, groups) {
  var descr = computeIncomePerRound(k, groups);
  return descr.incomeAfterRounds(r);
};

/**
 * We export the functions that we are interesting to test
 **/
if (exports) {
  exports.calculateIncome = calculateIncome;
  exports.getArguments = getArguments;
  exports.computeIncomePerRound = computeIncomePerRound;
  exports.IncomeDescription;
}

/**
 * Run the above if the process looks like
 * ```
 * node path/to/theme_park.js arguments
 * ```
 **/
if (process.argv[1].indexOf('theme_park.js') > 0) {
  var line1 = null, i = 0, c = 0;

  require('fs')
    .readFileSync(process.argv[2])
    .toString()
    .split(/\r?\n/)
    .forEach(function (line) {
      if (++i == 1) {
        return;
      }
      if (i % 2 === 0) {
        line1 = line;
        return;
      }
      var args = getArguments(line1, line);
      var income = calculateIncome(args.rounds, args.maxPersonsPerGroup, args.groups);
      console.log(++c, income);
  });
}
