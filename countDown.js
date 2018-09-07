;(function($, document, window){
  var CountDown = function (el, options) {
    this.element = el;
    this.settings = $.extend({format: 'DD:HH:MM'}, options);
    this.init()
  }
  CountDown.prototype = {
    init: function () {
      this.timeLeft = this.settings.endTime - this.settings.beginTime;
      this.match = this.settings.format.split(':')[0].toUpperCase();
      this.timer = null;
      this.interval();
    },
    calculateTime: function () {
      // 开始时间+1秒，重新计算剩余时间
      this.settings.beginTime++;
      this.timeLeft = this.settings.endTime - this.settings.beginTime;
    },
    interval: function () {
      var self = this;
      // 倒计时计算剩余时间
      this.timer = setInterval(function () {
        var day = Math.floor(self.timeLeft / 60 / 60 / 24 % 24, 10);
        var hour = Math.floor(self.timeLeft / 60 / 60 % 24, 10) < 10 ? '0' + Math.floor(self.timeLeft / 60 / 60 % 24, 10) : Math.floor(self.timeLeft / 60 / 60 % 24, 10);
        var minutes = Math.floor(self.timeLeft / 60 % 60, 10) < 10 ? '0' + Math.floor(self.timeLeft / 60 % 60, 10) : Math.floor(self.timeLeft / 60 % 60, 10);
        var seconds = Math.floor(self.timeLeft % 60, 10) < 10 ? '0' + Math.floor(self.timeLeft % 60, 10) : Math.floor(self.timeLeft % 60, 10);
        switch (self.match) {
          case 'DD':
            self.element.html('剩余' + day + '天' + hour + '小时' + minutes + '分' + seconds + '秒');
            break;
          case 'HH':
            self.element.html('剩余' + hour + '小时' + minutes + '分' + seconds + '秒');
            break;
          case 'MM':
            self.element.html('剩余' + minutes + '分' + seconds + '秒');
            break;
        }
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