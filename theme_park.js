var computedGroups = [];
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

var computeIncomePerRound = function (k, groups) {
  var passIncome = [];
  var i = 0, j = 0, passIndex;
  var maxl = 2 * groups.length;
  var first = 0;

  var sum = 0;
  while (i < maxl) {
    var g = groups[i % groups.length];
    if (sum + g > k) {
      passIndex = j;
      if (i > groups.length) {
        passIndex %= passIncome.length;
      }
      passIncome[passIndex] = sum;
      if (passIncome.length == 1) {
        first = sum;
      }
      sum = 0;
      j++;
    }
    sum += g;
    i++;
  }

  return {
    first: first,
    others: passIncome
  }
}

if (exports) {
  exports.calculateIncome = calculateIncome;
  exports.getArguments = getArguments;
  exports.computeIncomePerRound = computeIncomePerRound;
}

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
