function validateIPAddress(req, res, next) {
    const ipAddress = req.params.ipAddress;
    const ipRegExp = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
    if (ipRegExp.test(ipAddress)) {
      next();
    } else {
      res.status(400).send({ message: 'Invalid IP Address' });
    }
  }

module.exports={validateIPAddress}
  