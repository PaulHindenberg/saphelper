/**
 * Created with JetBrains WebStorm.
 * User: paulhindenberg
 * Date: 16.02.14
 * Time: 22:41
 * To change this template use File | Settings | File Templates.
 */
angular.element(document).ready(function(){
    //thats the place to go if yah need to do stuff before angular gets bound to the dom ≠Paul
   angular.module('SAPHelper');
   angular.bootstrap(document,['SAPHelper']);
});