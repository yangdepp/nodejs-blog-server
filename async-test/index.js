const fs = require('fs');
const path = require('path');

// callback
// function readFileByName(fileName, callback) {
//   const fullFileName = path.resolve(__dirname, 'files', fileName);
//   fs.readFile(fullFileName, (err, data) => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     callback(JSON.parse(data.toString()));
//   });
// }

// 测试
// readFileByName('a.json', data => {
//   console.log('a.json', data);
//   readFileByName(data.next, data => {
//     console.log('b.json', data);
//     readFileByName(data.next, data => {
//       console.log('c.json', data);
//     });
//   });
// });

// promise
function getFileContent(fileName) {
  const promise = new Promise((resolve, reject) => {
    const fullFileName = path.resolve(__dirname, 'files', fileName);
    fs.readFile(fullFileName, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(JSON.parse(data.toString()));
    });
  });
  return promise;
}

// promise的调用
// getFileContent('a.json')
//   .then(aData => {
//     console.log('a.json', aData);
//     return getFileContent(aData.next);
//   })
//   .then(bData => {
//     console.log('b.json', bData);
//     return getFileContent(bData.next);
//   })
//   .then(cData => {
//     console.log('c.json', cData);
//   });

// async 调用
async function readFileData() {
  const aData = await getFileContent('a.json');
  console.log('a.json', aData);
  const bData = await getFileContent(aData.next);
  console.log('b.data', bData);
  const cData = await getFileContent(bData.next);
  console.log('b.data', cData);
}

readFileData()