
var promise = new Promise(function(resolve, reject) {
  // resolve
  // reject
})

function Promise(executor) {
  var self = this
  self.status = 'pending'
  self.data = undefined
  self.onResolvedCallback = []
  self.onRejectedCallback = []

  executor(resolve, reject)
}
