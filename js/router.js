/**
 * Created with JetBrains WebStorm.
 * User: paulhindenberg
 * Date: 27.05.14
 * Time: 22:35
 * To change this template use File | Settings | File Templates.
 */
SAPHelper.config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js

    var disablePIN = true;

    $stateProvider
        .state('auth', {
            url:'/auth',
            views:{
                'main':{
                    templateUrl:'parts/auth/auth.html',
                    controller:'AuthCtrl'
                }
            }
        })

        .state('categories', {
            url:'/categories',
            views:{
                'main':{
                    templateUrl:'parts/categories/categories.html',
                    controller:'CategoriesCtrl'
                }
            }
        })

        .state('scopes', {
            url:'/scopes',
            views:{
                'main':{
                    templateUrl:'parts/scopes/scopes.html',
                    controller:'ScopesCtrl'
                }
            }
        })

        .state('items', {
            url:'/items',
            views:{
                'main':{
                    templateUrl:'parts/items/items.html',
                    controller:'ItemsCtrl'
                }
            }
        })
        .state('itemDetail', {
            url:'/items/:itemId',
            views:{
                'main':{
                    templateUrl:'parts/items/itemdetail/itemdetail.html',
                    controller:'ItemDetailCtrl'
                }
            }
        })

        .state('newItem',{
            url:'/newItem',
            views:{
                'main':{
                    templateUrl:'parts/items/newitem/newItem.html',
                    controller:'NewItemCtrl'
                }
            }
        })
;


    if(disablePIN == true){
        $urlRouterProvider.otherwise('/categories');
    }else{
        $urlRouterProvider.otherwise('/auth');
    }


    // if none of the above states are matched, use this as the fallback

});

