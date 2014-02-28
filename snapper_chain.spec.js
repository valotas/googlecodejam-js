
describe('Snapper', function () {
  it('should be unplugged and OFF by default', function () {
    var s = new Snapper();
    expect(s.plugged).toEqual(false);
    expect(s._state).toEqual(false);
  });

  it('should get snapped only if it is plugged', function () {
    var unplugged = new Snapper(false);
    expect(unplugged._state).toEqual(false);
    unplugged.snap();
    expect(unplugged._state).toEqual(false);
  })
})

describe('newSnapperArray', function () {
  it('should return the initial array of Snappers', function () {
    var array = newSnapperArray(1);
    expect(array).not.toBeUndefined();
    expect(array.length).toEqual(1);
  });

  it('should have the first Snapper plugged', function () {
    var array = newSnapperArray(1);
    expect(array[0].plugged).toEqual(true);
  });
});

describe('simple cases', function () {
  it('should not power with 1 snapper and 0 snaps', function () {
    var r = runSnapTest(1, 0);
    expect(r).toEqual("OFF");
  });

  it('should power with 1 snapper and 1 snaps', function () {
    var r = runSnapTest(1, 1);
    expect(r).toEqual('ON');
  });

  it('should not power with 4 snapper and 0 snaps', function () {
    var r = runSnapTest(4, 0);
    expect(r).toEqual('OFF');
  });

  it('should not power with 3 snappers and up to 6 snaps', function () {
    for (var i = 0; i < 6; i++) {
      expect(runSnapTest(3, i)).toEqual('OFF');
    }
  });

  it('should power with 3 snappers and 7 snaps', function () {
    expect(runSnapTest(3, 7)).toEqual('ON');
  });

  it('should not power with 4 snapper and 47 snaps', function () {
    var r = runSnapTestWithLine("4 47");
    expect(r).toEqual('ON');
  });

  it('should always power when using 1 snapper and snap odd times', function () {
    for (var i = 0; i < 10; i++) {
      expect(runSnapTest(1, i)).toEqual(i % 2 == 1 ? 'ON' : 'OFF');
    }
  });

  it('should have the same output with a proper solution', function () {
    expect(runSnapTestWithLine('7 74')).toEqual('OFF');
    expect(runSnapTestWithLine('5 48')).toEqual('OFF');
    expect(runSnapTestWithLine('8 19')).toEqual('OFF');
    expect(runSnapTestWithLine('7 82')).toEqual('OFF');
    expect(runSnapTestWithLine('7 83')).toEqual('OFF');
    expect(runSnapTestWithLine('5 30')).toEqual('OFF');
  });
});

describe('2nd solution', function () {
  it('should find the reset point', function () {
    expect(findResetPointForNumberOfSnappers(1)).toEqual(1);
    expect(findResetPointForNumberOfSnappers(2)).toEqual(3);
    expect(findResetPointForNumberOfSnappers(3)).toEqual(7);
    expect(findResetPointForNumberOfSnappers(4)).toEqual(15);
    expect(findResetPointForNumberOfSnappers(5)).toEqual(31);
    expect(findResetPointForNumberOfSnappers(6)).toEqual(63);
    expect(findResetPointForNumberOfSnappers(7)).toEqual(127);
  });

  it('should have the same output with a proper solution', function () {
    expect(runSnapTestWithLine('7 74', runSnapTest2)).toEqual('OFF');
    expect(runSnapTestWithLine('5 48'), runSnapTest2).toEqual('OFF');
    expect(runSnapTestWithLine('8 19'), runSnapTest2).toEqual('OFF');
    expect(runSnapTestWithLine('7 82'), runSnapTest2).toEqual('OFF');
    expect(runSnapTestWithLine('7 83'), runSnapTest2).toEqual('OFF');
    expect(runSnapTestWithLine('5 30'), runSnapTest2).toEqual('OFF');
    expect(runSnapTestWithLine('30 8049012'), runSnapTest2).toEqual('OFF');
  });
});
