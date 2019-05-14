const queryString = require('querystring');
const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');

// 用于处理post data
const getPostData = req => {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({});
      return;
    }
    if (req.headers['content-type'] !== 'application/json') {
      resolve({});
      return;
    }
    let postData = '';
    req.on('data', chunk => {
      postData += chunk.toString();
    });
    req.on('end', () => {
      if (!postData) {
        resolve({});
        return;
      }
      resolve(JSON.parse(postData));
    });
  });
  return promise;
};

const serverHandle = (req, res) => {
  res.setHeader('Content-type', 'application/json');
  // 获取path
  const url = req.url;
  req.path = url.split('?')[0];

  // 解析query
  req.query = queryString.parse(url.split('?')[1]);

  // 解析cookie
  req.cookie = {};
  const cookieStr = req.headers.cookie || ''; // k1=v1;k2=v2;k3=v3
  cookieStr.split(';').forEach(item => {
    if (!item) {
      return;
    }
    const arr = item.split('=');
    const key = arr[0];
    const val = arr[1];
    req.cookie[key] = val;
  });

  // 处理post data
  getPostData(req).then(postData => {
    req.body = postData;

    // 处理blog路由
    // const blogData = handleBlogRouter(req, res);
    // if (blogData) {
    //   res.end(JSON.stringify(blogData));
    //   return;
    // }

    const blogResult = handleBlogRouter(req, res);
    if (blogResult) {
      blogResult.then(blogData => {
        res.end(JSON.stringify(blogData));
      });
      return;
    }

    // 处理user路由
    const userResult = handleUserRouter(req, res);
    if (userResult) {
      userResult.then(userData => {
        res.end(JSON.stringify(userData));
      });
      return;
    }

    res.writeHead(404, { 'Content-type': 'text/plain' });
    res.write('404 Not Found');
    res.end();
  });
};

module.exports = serverHandle;
// env: process.env.NODE_ENV,
