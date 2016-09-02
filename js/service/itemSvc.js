/**
 * Created by kinlin on 8/28/16.
 */

app.factory('ItemService', function($http, SERVER_URL, ITEM_API){

    var addNew = function(item){
        var url = SERVER_URL + ITEM_API;
        return $http.post(url, item).then(function(resp){
            return resp.data
        });
    }

    var getAll = function(){
        var url = SERVER_URL + ITEM_API;
        return $http.get(url).then(function(resp){
            return resp.data._embedded.items
        })
    }

    return {
        addNew:addNew,
        getAll:getAll
    }
})