new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('1');
    resolve(1);
  }, 1000);
})
  .then((value) => {
    console.log(`${value} + 5 = ${value + 5}`);
    return value + 5;
  })
  .then((value) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(`${value} + 10 = ${value + 10}`);
        resolve(value + 10);
      }, 1000);
    });
  })
  .then((value) => {
    console.log(value);
  });
