## Built a promise
> [Reference](https://github.com/forthealllight/blog/issues/4)

## v1.0 版本 Promise

无法执行异步的方法
```js
class myPromise {
  constructor(executor) {
    let self = this
    // promise 的初始状态
    self.status = 'pending'
    // promise resolve时候的值
    self.value = undefined
    // promise reject时候的值
    self.reason = undefined

    let resolve = value => {
      if (self.status === 'pending') {
        self.status = 'resolved'
        self.value = value
        console.log(self.status)
      }
    }

    let reject = reason => {
      if (self.status === 'pending') {
        self.status = 'rejected'
        self.reason = reason
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
    if (self.status === 'resolved') {
      onFullfilled(self.value)
    }

    if (self.status === 'rejected') {
      onRejected(self.reason)
    }
  }
}

let go = new myPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(2)
  }, 1000)
}).then(data => {
  console.dir(data)
})
```

## v2.0 版本 Promise

解决了异步resolve的问题，但无法实现链式调用，需要拓展 then 方法

```js
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
    if (self.status === 'pending') {
      self.onResolvedCallbacks.push(function() {
        onFullfilled(self.value)
      })
      self.onRejectedCallbacks.push(function() {
        onRejected(self.reason)
      })
    }
    if (self.status === 'resolved') {
      onFullfilled(self.value)
    }

    if (self.status === 'rejected') {
      onRejected(self.reason)
    }
  }
}

let my = new Promise((resolve,reject) => {
  setTimeout(() => {
    resolve(100)
  }, 1000)
}).then(data => {
  console.log(data)
})
```

## v3.0 版本 Promise

```js
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
```


## v4.0 版本 Promise

```js

```
## Reference

-[understand-javascript-promises-by-building-a-promise-from-scratch](https://levelup.gitconnected.com/understand-javascript-promises-by-building-a-promise-from-scratch-84c0fd855720)
