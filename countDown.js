;(function($, document, window){
  var CountDown = function (el, options) {
    this.element = el;
    this.options = {
      serverBeginTime: options.beginTime,
      serverEndTime: options.endTime
    }
    this.init()
  }
  CountDown.prototype = {
    init: function () {
      this.timeLeft = (this.options.serverEndTime - this.options.serverBeginTime) * 1000;
      this.timer = null;
      this.interval();
    },
    calculateTime: function () {
      // 开始时间+1秒，重新计算剩余时间
      this.options.serverBeginTime++;
      this.timeLeft = (this.options.serverEndTime - this.options.serverBeginTime) * 1000;
    },
    interval: function () {
      var self = this;
      // 倒计时计算剩余时间
      this.timer = setInterval(function () {
        var hour = Math.floor(self.timeLeft / 1000 / 60 / 60 % 24, 10) < 10 ? '0' + Math.floor(self.timeLeft / 1000 / 60 / 60 % 24, 10) : Math.floor(self.timeLeft / 1000 / 60 / 60 % 24, 10);
        var minutes = Math.floor(self.timeLeft / 1000 / 60 % 60, 10) < 10 ? '0' + Math.floor(self.timeLeft / 1000 / 60 % 60, 10) : Math.floor(self.timeLeft / 1000 / 60 % 60, 10);
        var seconds = Math.floor(self.timeLeft / 1000 % 60, 10) < 10 ? '0' + Math.floor(self.timeLeft / 1000 % 60, 10) : Math.floor(self.timeLeft / 1000 % 60, 10);
        self.element.html(hour + ':' + minutes + ':' + seconds);
        self.calculateTime();
      }, 1000)
    }
  }
  $.fn.countDown = function (options) {
    return this.each(function () {
      new CountDown($(this), options)
    })
  }
})(jQuery, document, window)