(function(window) {
  const PENDING = 'pending';
  const RESOLVED = 'resolved';
  const REJECTED = 'rejected';

  // Promise构造函数
  function Promise(excutor) {
    const _this = this;

    _this.status = PENDING;
    _this.data = undefined;
    _this.callbacks = [];

    function resolve(value) {
      if (_this.status !== PENDING) {
        return;
      }
      _this.status = RESOLVED;
      _this.data = value;
      if (_this.callbacks.length > 0) {
        setTimeout(() => {
          _this.callbacks.forEach((callbacksObj) => {
            callbacksObj.onResolved(value);
          });
        });
      }
    }
    function reject(reason) {
      if (_this.status !== PENDING) {
        return;
      }
      _this.status = REJECTED;
      _this.data = reason;
      if (_this.callbacks.length > 0) {
        setTimeout(() => {
          _this.callbacks.forEach((callbacksObj) => {
            callbacksObj.onRejected(reason);
          });
        });
      }
    }

    // 立即执行执行器函数
    try {
      excutor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  /**
   * 指定成功和失败的回调函数
   * 返回一个新的Promise对象
   */
  Promise.prototype.then = function(onResolved, onRejected) {
    onResolved = typeof onResolved === 'function' ? onResolved : (value) => value;
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (reason) => {
            throw reason;
          };
    const _this = this;
    return new Promise((resolve, reject) => {
      // 抽取公共函数
      function handle(callback) {
        try {
          const result = callback(_this.data);
          if (result instanceof Promise) {
            result.then(resolve, reject);
          } else {
            resolve(result);
          }
        } catch (error) {
          reject(error);
        }
      }

      if (_this.status === PENDING) {
        _this.callbacks.push({
          onResolved() {
            handle(onResolved);
          },
          onRejected() {
            handle(onRejected);
          },
        });
      } else if (_this.status === RESOLVED) {
        setTimeout(() => {
          handle(onResolved);
        });
      } else {
        setTimeout(() => {
          handle(onRejected);
        });
      }
    });
  };

  /**
   * 指定失败的回调函数
   * 返回一个新的Promise对象
   */
  Promise.prototype.catch = function(onRejected) {
    return this.then(undefined, onRejected);
  };

  /**
   *
   */
  Promise.resolve = function(value) {};

  Promise.reject = function(reason) {};

  Promise.all = function(promises) {};

  Promise.race = function(promises) {};

  window.Promise = Promise;
})(window);
