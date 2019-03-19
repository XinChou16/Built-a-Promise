# Built-a-Promise

## Reference 
- [Built a Promise](https://github.com/forthealllight/blog/issues/4)

v1.0

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

    let resolve = (value) => {
      if (self.status === 'pending') {
        self.status = 'resolved'
        self.value = value
        console.log(self.status)
      }
    }

    let reject = (reason) => {
      if (self.status === 'pending') {
        self.status = 'rejected'
        self.reason = reason
      }
    }

    try {
      executor(resolve, reject)
    } catch(e) {
      reject(e)
    }
  }

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
  resolve(2)
}).then(data => {
  console.log(data)
})
```

