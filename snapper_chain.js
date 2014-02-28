//https://code.google.com/codejam/contest/433101/dashboard
"use strict";

var Snapper = (function () {

  function Snapper(isPlugged) {
    this.plugged = isPlugged || false;
    this._state = false;
  }

  Snapper.prototype = {
    snap: function () {
      if (this.plugged) {
        this._state = !this._state;
      }
    },
    canPower: function () {
      return this._state && this.plugged;
    },
    state: function () {
      return this.canPower() ? "ON" : "OFF";
    },
    toString: function () {
      return "(" + this.plugged + ", " + this._state + ")";
    }
  };

  return Snapper;
})();

var newSnapperArray = function (n) {
  var arr = [new Snapper(true)];
  for (var i = 1; i < n; i++) {
    arr.push(new Snapper());
  }
  return arr;
};

var snap = function (snappers) {
  var l = snappers.length,
    current,
    last = 0;

  //snap powered snappers
  for (var i = l - 1; i >= 0; i--) {
    current = snappers[i];
    current.snap();
  }

  //Update the power supply
  last = snappers[0];
  for (var i = 1; i < l; i++) {
    current = snappers[i];
    current.plugged = last.canPower();
    last = current;
  }
};


var runSnapTest = function (n, k) {
  if (typeof(n) !== 'number') {
    throw n + ' is not a number';
  }
  if (typeof(k) !== 'number') {
    throw k + ' is not a number';
  }
  var snappers = newSnapperArray(n),
    firstOn;
  for (var i = 0; i < k; i++) {
    snap(snappers);
    if (snappers[snappers.length - 1].canPower()) {
      firstOn = i + 1;
      return k % (firstOn + 1) === firstOn ? 'ON' : 'OFF';
    }
  }

  return 'OFF';
}

var runSnapTestWithLine = function (line, fn) {
  var splitted = line.split(' '),
    n = parseInt(splitted[0], 10),
    k = parseInt(splitted[1], 10);

  return fn ? fn(n,k) : runSnapTest(n, k);
};

//Improved solution
var resetPointCache = {};
var findResetPointForNumberOfSnappers = function (n) {
  if (n === 1) {
    return 1;
  }
  if (resetPointCache['' + n]) {
    return resetPointCache['' + n];
  }
  var result = (2 * findResetPointForNumberOfSnappers(n - 1)) + 1;
  resetPointCache['' + n] = result;
  return result;
};

var runSnapTest2 = function (n, k) {
  var reset = findResetPointForNumberOfSnappers(n);
  return k % (reset + 1) === reset ? 'ON' : 'OFF';
};

if (exports) {
  exports.runSnapTestWithLine = runSnapTestWithLine;
  exports.snapTest2 = runSnapTest2;
}

if (process.argv[1].indexOf('snapper_chain.js') > 0) {
  var currentTest = 0;
  require('fs')
    .readFileSync(process.argv[2])
    .toString()
    .split(/\r?\n/)
    .forEach(function(line) {
      if (currentTest > 0 && line != '') {
        var state = runSnapTestWithLine(line, runSnapTest2);
        console.log('Case #' + (currentTest) + ': ' + state);
      }
      currentTest++;
  });
}

