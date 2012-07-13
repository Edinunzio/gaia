(function(window) {
  if (typeof(Calendar) === 'undefined') {
    Calendar = {};
  }

  if (typeof(Calendar.Provider) === 'undefined') {
    Calendar.Provider = {};
  }

  // this should never change
  const LOCAL_CALENDAR_ID = 'local-first';

  function Local(options) {
    var key;

    if (typeof(options) === 'undefined') {
      options = {};
    }

    for (key in options) {
      if (options.hasOwnProperty(key)) {
        this[key] = options[key];
      }
    }
  }

  Local.prototype = {

    /**
     * Does this provider require credentials.
     */
    useCredentials: false,

    /**
     * Can provider sync with remote server?
     */
    canSync: false,

    /**
     * You may only use one of these providers.
     */
    singleUse: true,

    /**
     * Verify credentials with backend service.
     */
    verifyCredentials: function(callback) {
      var self = this;
      //XXX: Make async
      self._connection = true;
      callback(null, true);
    },

    /**
     * Check if connection has been resolved
     * recently.
     */
    isConnected: function() {
      return !!this._connection;
    },

    /**
     * Attempts to find calendars for
     * provider.
     *
     * @param {Function} callback node style callback
     *                            where second argument
     *                            returns an array of
     *                            Calendar.Provider.CalendarModel(s).
     */
    findCalendars: function(callback) {
      //XXX: Make async
      var cal = new Calendar.Provider.CalendarModel(this, {
        // XXX localize this name somewhere
        name: 'your_device',
        id: LOCAL_CALENDAR_ID
      });

      callback(null, [cal]);
    }

  };

  Calendar.Provider.Local = Local;

}(this));
