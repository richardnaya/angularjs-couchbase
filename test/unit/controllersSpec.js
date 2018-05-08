'use strict';

/* jasmine specs for controllers go here */
describe('Controllers', function() {

  beforeEach(function(){
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  beforeEach(module('myApp'));


  describe('AppCtrl', function(){
    var scope, ctrl, $httpBackend, socketMock;

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('phones/phones.json').
          respond([{name: 'Nexus S'}, {name: 'Motorola DROID'}]);

      scope = $rootScope.$new();
      socketMock = new sockMock($rootScope);

      ctrl = $controller('AppCtrl', {$scope: scope, socket: socketMock});
    }));


    it('should initialize name when socket receives the init message', function() {
      expect(scope.name).toBeUndefined();

      socketMock.receive("init", {name:'SomeName', users:'s', beers:'x'});

      expect(scope.name).toEqualData('SomeName');
    });


    it('should display message when socket receives message', function() {
      expect(scope.messages.length).toBe(0);

        socketMock.receive("send:message", 'SomeMessage');

      expect(scope.messages).toEqualData(['SomeMessage']);
    });
  });
});


/*
 Simple mock for socket.io
 see: https://github.com/btford/angular-socket-io-seed/issues/4
 thanks to https://github.com/southdesign for the idea
 */
var sockMock = function($rootScope){
    this.events = {};
    this.emits = {};

    // intercept 'on' calls and capture the callbacks
    this.on = function(eventName, callback){
        if(!this.events[eventName]) this.events[eventName] = [];
        this.events[eventName].push(callback);
    };

    // intercept 'emit' calls from the client and record them to assert against in the test
    this.emit = function(eventName){
        var args = Array.prototype.slice.call(arguments, 1);

        if(!this.emits[eventName])
            this.emits[eventName] = [];
        this.emits[eventName].push(args);
    };

    //simulate an inbound message to the socket from the server (only called from the test)
    this.receive = function(eventName){
        var args = Array.prototype.slice.call(arguments, 1);

        if(this.events[eventName]){
            angular.forEach(this.events[eventName], function(callback){
                $rootScope.$apply(function() {
                    callback.apply(this, args);
                });
            });
        };
    };
};
