#!/usr/bin/env node
'use strict'

var esteid = require('./esteid.js')
var apdu = require('./apdu.js')
var pcsc = require('./node-pcsc-silent.js')

function pem (b) {
  return '-----BEGIN CERTIFICATE-----\n' + b.toString('base64') + '\n-----END CERTIFICATE-----'
}

function testapp (transmit) {
  var EstEID = esteid.connect(apdu.apdufy(transmit))
  return EstEID.getCertificate(EstEID.AUTH).then(function (cert) {
    console.log(pem(cert))
  }).catch(function (reason) {
    console.log('Some error... ', reason)
    throw reason
  })
}

pcsc.run(testapp, esteid.ATRS)
