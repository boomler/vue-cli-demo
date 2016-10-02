"use strict"
exports = module.exports = {
  err(msg) {
    let data = {
      code: -1,
      msg: msg
    }
    let response = JSON.stringify(data)
    return response
  },
  success(d) {
    let data = {
      code: 200,
      data: d
    }
    let response = JSON.stringify(data)
    return response
  } 
}
