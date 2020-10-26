(function (window) {
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;

    class RemoteDataStore {
        constructor(url) {
            console.log('running the DataStore function');
            if (!url) { throw new Error('No remote URL supplied.'); }

            this.serverURL = url;
            this.key = '';
            this.finisher = '.json';
        }
        data_adjustment(val) {
            new_val = JSON.stringify(val);
            //a@bignerdranch.com
            return new_val;
        }
        ajaxposthelper(type, url, val) {
            console.log('this is the val before any string manip');
            var new_val = /*JSON.stringify(val);*/ val;
            console.log(new_val);

            /*here is where the string will be manipulated... */
            new_val = '{\"' + new_val.emailAddress + '\":' + '{' + '\"coffee\":\"' + new_val.coffee +'\",' + '\"emailAddress\":\"' + new_val.emailAddress +'\",' + '\"size\":\"' + new_val.size +'\",' + '\"flavor\":\"' + new_val.flavor +'\",' + '\"strength\":\"' + new_val.strength +'\"}'        + '}';
            new_val = JSON.parse(new_val);
            console.log(new_val);
            console.log('this is the val AFTER any string manip');
            var manip = (new_val);
            //manip = JSON.stringify(manip);
            //console.log(manip);

            console.log('stringified manip printed below');
            console.log(manip);

            console.log('the val object stringified');
            console.log(val);

            console.log('the val object stringified');
            console.log(JSON.stringify(val));
            
            //new_val = val;// REMEMBER TO REMOVE THIS

            $.ajax({ type: type, url: url, contentType: 'application/json',
                data: JSON.stringify(val), 
                success: function(response) {                     
                    console.log('function returned: ' + JSON.stringify(response));
                    //console.log('regular response below');
                    //console.log(response);
                    //console.log(response.name);
                    this.key = response.name;
                    console.log('below is the key saved');
                    console.log(this.key);
                }
            });
        }
        ajaxhelper(type, url, cb) {
            $.ajax({ type: type, url: url, contentType: 'application/json',
                success: function(response) { 
                    console.log('function returned: ' + JSON.stringify(response));
                    if (cb !== undefined) { cb(response); }
                }
            });
        }
        add(key, val) { this.ajaxposthelper('POST',   this.serverURL + this.finisher,             val); }
        get(key, cb)  { this.ajaxhelper    ('GET',    this.serverURL + '/' + key, cb); }
        getAll(cb)    { this.ajaxhelper    ('GET',    this.serverURL,             cb); }
        remove(key)   { this.ajaxhelper    ('DELETE', this.serverURL + '/' + this.key + this.finisher); } 
    }


    App.RemoteDataStore = RemoteDataStore;
    window.App = App;
    
})(window);

/*









*/