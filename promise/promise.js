(function(window) {
  const PENDING = "pending";
  const RESOLVED = "resolved";
  const REJECTED = "rejected";

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
          _this.callbacks.forEach(callbacksObj => {
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
          _this.callbacks.forEach(callbacksObj => {
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
    onResolved = typeof onResolved === "function" ? onResolved : value => value;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : reason => {
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
          }
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
  Promise.resolve = function(value) {
    return new Promise((resolve, reject) => {
      if (value instanceof Promise) {
        value.then(resolve, reject);
      } else {
        resolve(value);
      }
    });
  };

  Promise.reject = function(reason) {
    // 返回一个失败的promise
    return new Promise((resolve, reject) => {
      reject(reason);
    });
  };

  Promise.all = function(promises) {
    // 用来保存所有成功value的值
    const values = new Array(promises.length);

    // 保存成功promise的数量
    let resovleCount = 0;

    return new Promise((resolve, reject) => {
      // 遍历获取每个promise的结果
      promises.forEach((p, index) => {
        p.then(
          value => {
            resovleCount++;
            values[index] = value;
            if (resovleCount === promises.length) {
              resolve(values);
            }
          },
          reason => {
            reject(reason);
          }
        );
      });
    });
  };

  Promise.race = function(promises) {
    // 返回哟个promise
    return new Promise((resolve, reject) => {
      promises.forEach((p, index) => {
        p.then(
          value => {
            resolve(value);
          },
          reason => {
            reject(reason);
          }
        );
      });
    });
  };

  window.Promise = Promise;
})(window);
