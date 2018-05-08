/**
 * Created by julianghionoiu on 16/09/2014.
 */


exports.testSomething = function(test){
    test.expect(1);
    test.ok(true, "this assertion should pass");
    test.done();
};

exports.testSomethingElse = function(test){
    test.equals(1, 1, "this assertion should fail");
    test.done();
};