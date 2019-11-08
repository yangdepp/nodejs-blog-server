const http = require('http');

// 组合中间件
function compose(middlewareList) {
  return function(ctx) {
    function dispatch(i) {
      const fn = middlewareList[i];
      try {
        return Promise.resolve(fn());
      } catch (error) {}
    }
    return dispatch(0);
  };
}

class Koa {
  constructor() {
    this.middlewareList = [];
  }
  use(fn) {
    this.middlewareList.push(fn);
    // 返回一个实例可以实现链式调用
    return this;
  }

  callback() {
    return (req, res) => {};
  }

  listen(...args) {
    const server = http.createServer(this.callBack());
    server.listen(...args);
  }
}
