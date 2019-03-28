class myPromise {
  constructor(executor) {
    let self = this
    // promise 的初始状态
    self.status = 'pending'
    // promise resolve时候的值
    self.value = undefined
    // promise reject时候的值
    self.reason = undefined
    self.onResolvedCallbacks = []
    self.onRejectedCallbacks = []

    let resolve = value => {
      if (self.status === 'pending') {
        self.status = 'resolved'
        self.value = value
        console.log(self.status)
        self.onResolvedCallbacks.forEach(fn => {
          fn(self.value)
        })
      }
    }

    let reject = reason => {
      if (self.status === 'pending') {
        self.status = 'rejected'
        self.reason = reason
        self.onRejectedCallbacks.forEach(fn => {
          fn(self.reason)
        })
      }
    }

    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  // promise 的 then 方法
  then(onFullfilled, onRejected) {
    let self = this
    let tempPromise
    if (self.status === 'pending') {
      tempPromise = new myPromise((resolve, reject) => {
        self.onResolvedCallbacks.push(function() {
          let tempResolve = onFullfilled(self.value)
          resolve(tempResolve)
        })
        self.onRejectedCallbacks.push(function() {
          let tempReject = onRejected(self.reason)
          reject(tempReject)
        })
      })
    }
    if (self.status === 'resolved') {
      tempPromise = new myPromise((resolve, reject) => {
        let tempResolve = onFullfilled(self.value)
        resolve(tempResolve)
      })
    }

    if (self.status === 'rejected') {
      tempPromise = new myPromise((resolve, reject) => {
        let tempReject = onRejected(self.reason)
        reject(tempReject)
      })
    }
  }
}

let my = new Promise((resolve,reject) => {
  setTimeout(() => {
    resolve(100)
  }, 1000)
}).then(data => data).then(data => {
  console.log(data)
})
