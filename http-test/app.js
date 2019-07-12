// http请求综合示例
const http = require('http');
const queryString = require('querystring');

const serevr = http.createServer((req, res) => {
  const method = req.method;
  const url = req.url;
  const path = url.split('?')[0];
  const query = queryString.parse(url.split('?')[1]);

  //设置返回格式为JSON
  res.setHeader('Content-type', 'application/json');

});

const serevr = http.createServer((req, res) => {
  if (req.method === 'POST') {
    console.log('req content-type: ', req.headers['content-type']);
    let postData = '';
    req.on('data', chunk => {
      postData += chunk.toString();
    });
    req.on('end', () => {
      console.log('postData', postData);
      res.end('hello world');
    });
  }
});

serevr.listen(8000);
console.log('listen 8000...');
