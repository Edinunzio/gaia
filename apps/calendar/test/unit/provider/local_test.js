requireApp('calendar/js/provider/calendar_model.js');
requireApp('calendar/js/provider/local.js');

suite('provider/local', function() {

  var subject;

  setup(function() {
    subject = new Calendar.Provider.Local({
      user: 'foo'
    });
  });

  test('initialization', function() {
    assert.equal(subject.user, 'foo');
  });

  test('#verifyCredentials', function(done) {
    subject.verifyCredentials(function(err, success) {
      assert.ok(!err);
      assert.ok(success);
      assert.ok(subject._connection);
      done();
    });
  });

  test('#isConnected', function() {
    subject._connection = true;
    assert.isTrue(subject.isConnected());
  });

  test('#findCalendars', function(done) {
    // local will always return the same
    // calendar id

    subject.findCalendars(function(err, list) {
      done(function() {
        var first = list[0];
        assert.instanceOf(first, Calendar.Provider.CalendarModel);
        assert.equal(first.provider, subject);
        //XXX This should be localized
        assert.equal(first.id, 'local-first');
        assert.equal(first.name, 'your_device');
      });
    });
  });

});
