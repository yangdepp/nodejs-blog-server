const http = require('http');
// const queryString = require('querystring');

// const serevr = http.createServer((req, res) => {
//   console.log(req.method);
//   const url = req.url;
//   console.log('url', url);
//   req.query = queryString.parse(url.split('?')[1]);
//   console.log('query', req.query);
//   res.end(JSON.stringify(req.query));
// });

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
