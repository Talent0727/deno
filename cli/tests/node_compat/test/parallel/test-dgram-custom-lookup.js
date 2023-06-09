// deno-fmt-ignore-file
// deno-lint-ignore-file

// Copyright Joyent and Node contributors. All rights reserved. MIT license.
// Taken from Node 16.13.0
// This file is automatically generated by "node/_tools/setup.ts". Do not modify this file manually

'use strict';
const common = require('../common');
const assert = require('assert');
const dgram = require('dgram');
const dns = require('dns');

{
  // Verify that the provided lookup function is called.
  const lookup = common.mustCall((host, family, callback) => {
    dns.lookup(host, family, callback);
  });

  const socket = dgram.createSocket({ type: 'udp4', lookup });

  socket.bind(common.mustCall(() => {
    socket.close();
  }));
}

// TODO: unable to overwrite imports with spies
// {
//   // Verify that lookup defaults to dns.lookup().
//   const originalLookup = dns.lookup;

//   dns.lookup = common.mustCall((host, family, callback) => {
//     dns.lookup = originalLookup;
//     originalLookup(host, family, callback);
//   });

//   const socket = dgram.createSocket({ type: 'udp4' });

//   socket.bind(common.mustCall(() => {
//     socket.close();
//   }));
// }

{
  // Verify that non-functions throw.
  [null, true, false, 0, 1, NaN, '', 'foo', {}, Symbol()].forEach((value) => {
    assert.throws(() => {
      dgram.createSocket({ type: 'udp4', lookup: value });
    }, {
      code: 'ERR_INVALID_ARG_TYPE',
      name: 'TypeError',
      message: 'The "lookup" argument must be of type function.' +
               common.invalidArgTypeHelper(value)
    });
  });
}
