'use strict';

/* jasmine specs for filters go here */

describe('Filters', function() {

  beforeEach(module('myApp.filters'));
  beforeEach(module(function($provide) {
        $provide.factory('version', function() {
            return 'SomeVersion';
        });
    }));

  describe('Interpolate filter', function() {

    it('should convert replace the VERSION keyword with the apropriate value',
        inject(function(interpolateFilter) {
      expect(interpolateFilter('T/%VERSION%')).toBe('T/SomeVersion');
    }));

    it('should not touch other strings',
      inject(function(interpolateFilter) {
          expect(interpolateFilter('T')).toBe('T');
    }));
  });
});
