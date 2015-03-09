/**
 * Created by paulhindenberg on 08.02.15.
 */
SAPHelper.factory('SAPHelperService', function($http, ConfigService){


    var authenticated = false;
    var categories = [];
    var scopes = [];
    var items = [];
    var selectedCategory;
    var selectedScope;

    var _this = {};
    window._this = _this;
   // return{
        _this.setAuthentication = function(){
            authenticated = true;
        };
        _this.getAuthentication = function(){
            return authenticated;
        }

        _this.getInitialData = function(){
            var promise = $http({
                method:'GET',
                url: ConfigService.getAPI('getInitialData')
            }).then(function(response){
                categories = response.data.categories;
                scopes = response.data.scopes;
                items = response.data.items;
                window.response = response;
                return true;
            })
            return promise;
        }

        _this.getCategories = function(){
            return categories;
        }

        _this.getScopes = function(){
            return scopes;
        }
        _this.getSelectedCategory = function(){
            if(selectedCategory){
                return selectedCategory;
            }else{
                if(ConfigService.DEVMODE() === true){
                    if(categories.length > 0){
                        selectedCategory = categories[0];
                        return selectedCategory;
                    }else{
                        selectedCategory = {id: "1", name_enUS: "Function Modules", name: "Funktionsbausteine", sort: "1"};
                        return selectedCategory;
                    }
                }
            }
        }

        _this.getSelectedScope = function(){
            if(selectedScope){
                return selectedScope;
            }else{
                if(ConfigService.DEVMODE() === true){
                    if(scopes.length > 0){
                        selectedScope = scopes[0];
                        return selectedScope;
                    }else{
                        selectedScope = {id: "1", name: "FI", name_enUS: "", enum: "" };
                        return selectedScope;
                    }
                }
            }
        }
        _this.getItems = function(){
            console.log('getItems');
            var returnItems = [];
            window.items2 = items;
            angular.forEach(items, function(value, key){
            //    console.log('_1');
                if(value.category_id == _this.getSelectedCategory().id){
            //        console.log('__2');
            //        console.log(typeof _this.getSelectedScope().id +'__' + typeof value.scopes.toString());
            //        window.scope = selectedScope.id;
            //        window.scopes = value.scopes;
                    if(value.scopes.indexOf(parseInt(_this.getSelectedScope().id)) > -1){
            //            console.log('___3');
                        returnItems.push(value);
                    }
                };
            });
            return returnItems;
        }
        _this.setSelectedCategory = function(c){
            selectedCategory = c;
        }
        _this.setSelectedScope = function(s){
            selectedScope = s;
        }
        _this.addNewItem = function(item){
            var promise = $http({
                method:'POST',
                url: ConfigService.getAPI('addNewItem'),
                data: {item:item,
                       category:parseInt(_this.getSelectedCategory().id)}
            }).then(function(response){
                item.id = parseInt(response.data);
                item.category_id = _this.getSelectedCategory().id;
                items.push(item);
                window.addNewItemResponse = response;
                return true;
            })
            return promise;
        }

        _this.getItem = function(itemId){
            var item;
            var help = [];
            angular.forEach(items, function(value, key){
                if(value.id === itemId){
                    item = value;
                    if(item.scopes.length > 0 && typeof item.scopes[0] === "object"){

                    }else{
                        //dieses if else ist für den Fall das dieses Item schonmal geöffnet wurde und dementsprechend schon die zielstruktur inkl
                        //scopeName hat, Problem war das er durch getScopeObject das as eigentliche object eine stufe tiefer gehangen hat
                        angular.forEach(item.scopes, function(value2,key2){
                            help.push(_this.getScopeObjectForId(value2));
                        })
                        item.scopes = [];
                        item.scopes = item.scopes.concat(help);
                    }
                }
            })
            return item;
        }

        _this.getScopeObjectForId = function(scopeId){
            var scopeObj = {id:scopeId,name:''};
            angular.forEach(_this.getScopes(),function(value, key){
                if(value.id == scopeId){
                    scopeObj.name = value.name;
                }
            })
            return scopeObj;
        }

        _this.saveItem = function(item){
            var promise = $http({
                method:'POST',
                url: ConfigService.getAPI('saveItem'),
                data: {item:item}
            }).then(function(response){
                //update local model
                angular.forEach(items, function(value, key){
                    if(value.id === item.id){
                        value = item;
                    }
                })
                return true;
            })
            return promise;
        }

        _this.deleteItem = function(id){
            var promise = $http({
                method:'POST',
                url: ConfigService.getAPI('deleteItem'),
                data: {id:id}
            }).then(function(response){
                if(response.data === 1){
                    angular.forEach(items, function(value, key){
                        if(value.id === id){
                            items.splice(key, 1);
                        }
                    })
                }
                return true;
            })
            return promise;
        }
    return _this;
})