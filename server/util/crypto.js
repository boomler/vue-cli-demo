const crypto = require('crypto');

exports = module.exports = {
  md5: function(input) {
    const secret = 'abcdefg';
    const hash = crypto.createHmac('sha256', secret)
      .update(input)
      .digest('hex');
    return hash
  }

}
