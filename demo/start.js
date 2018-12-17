// basic example
var promise1 = new Promise((resolve, reject) => {
  // 模拟异步
  setTimeout(() => {
    resolve('1秒后才显示的数据')
  }, 1000);
})

console.log('立即打印的数据'); 

promise1.then(data => {
  console.log(data);  
})

// 立即打印的数据
// 1秒后才显示的数据

// reject()
var promise1 = new Promise((resolve, reject) => {
  // 模拟异步
  setTimeout(() => {
    resolve('1秒后才显示的数据')
  }, 1000);
  a.b += 1
})

promise1.then(data => {
  console.log(data);  
}, err => {
  console.log(err); // [ReferenceError: a is not defined]
})
