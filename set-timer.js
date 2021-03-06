var setTimer = function (cb, options) {
  options          = options          || Object.prototype;
  options.timeout  = options.timeout  || 0;
  options.interval = options.interval || 0;
  options.limit    = options.limit    || 1;
  options.onClear  = options.onClear  || Function.prototype;
  options.cb       = cb               || Function.prototype;

  var timer = {
    calls: 0,
    options: options,
    timeout: null,
    interval: null,
    clear: function () {
      if (this.timeout) clearTimeout(this.timeout);
      if (this.interval) clearInterval(this.interval);
      options.onClear.call(this);
    }
  };

  timer.timeout = setTimeout(function () {
    timer.interval = setInterval(function() {
      timer.calls++;
      options.cb.call(timer);
      if (timer.calls >= options.limit) {
        timer.clear();
      }
    }, options.interval);
  }, options.timeout);

  return timer;
};

module.exports = setTimer;
