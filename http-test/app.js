// http请求综合示例
const http = require('http');
const queryString = require('querystring');

const serevr = http.createServer((req, res) => {
  const method = req.method;
  const url = req.url;
  const path = url.split('?')[0];
  const query = queryString.parse(url.split('?')[1]);

  // 设置返回格式为JSON
  res.setHeader('Content-type', 'application/json');

  // 返回的数据
  const resData = {
    method,
    url,
    path,
    query,
  };

  if (method === 'GET') {
    res.end(JSON.stringify(resData));
  }

  // POST请求
  if (method === 'POST') {
    let postData = '';
    req.on('data', (chunk) => {
      postData += chunk.toString();
    });
    req.on('end', (chunk) => {
      resData.postData = postData;
      res.end(JSON.stringify(resData));
    });
  }
});

serevr.listen(8000);
console.log('listen 8000...');
