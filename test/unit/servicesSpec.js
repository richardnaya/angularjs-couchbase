'use strict';

describe('Service', function() {

  // load modules
  beforeEach(module('myApp'));

  // Test service availability
  it('should define the socket factory', inject(function(socket) {
      expect(socket).toBeDefined();
    }));
});