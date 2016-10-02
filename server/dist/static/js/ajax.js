;
(function(window) {
    //判断线上 测试URL
     // var commonURL = "http://boomler.wang:7000"
     var commonURL = 'http://60.205.191.146:7000'

    function getUrl(url) {
        if (url.indexOf('http') >= 0) {
            return url
        }
        return commonURL + url
    }

    function get(url, data, callback) {
        if (typeof data === "function") {
            callback = data;
        }

        if (typeof data === "object") {
            // data.token = localStorage.getItem('token')
            url = data ? url + '?' + urlCode(data) : url;

        }
        url = getUrl(url)
        var xhr = new XMLHttpRequest();
        xhr.open('get', url);
        xhr.onload = function() {

                if (xhr.status === 403)
                    location.href = "#!/login"
                
                else {

                    var json = JSON.parse(xhr.responseText)
                    callback(json);
                }
            }
            //xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xhr.send();
    }

    function post(url, data, callback) {
        if (typeof data === "function") {
            callback = data;
            data = null;
        }
        url = getUrl(url)


        var xhr = new XMLHttpRequest();

        xhr.withCredentials = true
        xhr.open('post', url);
        xhr.onload = function() {
            if (xhr.status == 200) {

                var json = JSON.parse(xhr.responseText)
                if (json.code == -2) {
                    location = '/pages/login.html'
                }
                callback(json);


            } else {
                if (xhr.status === 403)
                    location.href = "#!/login"
            }

        };


        xhr.setRequestHeader('content-Type', 'application/x-www-form-urlencoded');

        // data.token = localStorage.getItem('token')

        xhr.send(urlCode(data));
    }

    function urlCode(data) {
        var str = '';
        if (!data) {
            return null;
        }
        for (var key in data) {
            if (typeof data[key] == 'string') {
                data[key] = data[key].trim()
            }

            str += key + '=' + encodeURIComponent(data[key]) + '&';
        }

        return str.substring(0, str.length - 1);
    }

    function ccajax(option) {
        var defaults = {
            method: "post",
            url: '/',
            callback: function() {},
            data: {}
        }
        for (var name in option) {
            defaults[name] = option[name]
        }
        var xhr = new XMLHttpRequest();
        xhr.open(defaults.method, defaults.url);
        xhr.onload = function() {
            var json = JSON.parse(xhr.responseText)
            defaults.callback(json);
        };
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xhr.setRequestHeader('content-Type', 'application/x-www-form-urlencoded');
        xhr.send(urlCode(defaults.data));
    }

    function getHash() {

        var params = location.hash.split('?')[1] || '' //.slice(1);
        params = params.split('&');
        var result = {};
        var val;
        for (var i = 0, len = params.length; i < len; i++) {
            if (params[i]) {
                val = params[i].split('=');
                result[val[0]] = val[1] || '';
            }
        }
        return result;

    }

    var hashMap = getHash()

    function hashGet(key) {
        return key ? hashMap[key] : hashMap;
    }

    function hashSet(data, clearall) {

        if (clearall) {
            window.location.hash = hashToStr(data)
        } else {
            for (var key in data) {
                hashMap[key] = data[key]
            }
            window.location.hash = hashToStr(hashMap)
        }
    }

    window.addEventListener('hashchange', function() {
        //绑定hash
        hashMap = getHash()
    })

    function hashToStr(data) {
        var str = location.hash.split('?')[0] + '?'
        for (var key in data) {
            str += key + '=' + data[key] + '&'
        }
        str = str.substring(0, str.length - 1)
        return str
    }

    function postSync(url, data, callback) {
        if (typeof data === "function") {
            callback = data;
            data = null;
        }

        if (url.indexOf('http') == -1) {

            url = commonURL + url

        }

        var xhr = new XMLHttpRequest();

        xhr.withCredentials = true
        xhr.open('post', url, false);
        xhr.onload = function() {
            if (xhr.status == 200) {

                var json = JSON.parse(xhr.responseText)
                if (json.code == -2) {
                    location = '/pages/login.html'
                }
                callback(json);
            } else {}
        };
        xhr.setRequestHeader('content-Type', 'application/x-www-form-urlencoded');
        xhr.send(urlCode(data));
    }

    window.lib = window.lib || {}
    window.get = get
    window.post = post
    window.hashGet = hashGet
    window.hashSet = hashSet
    window.commonURL = commonURL
})(window)
