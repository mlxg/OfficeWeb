/**
 * Cookie plugin
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
/**
 * Created by girl on 16/6/3.
 */
import jQuery from 'jquery';
/**
 * Create a cookie with the given name and value and other optional parameters.
 *
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Set the value of a cookie.
 * @example $.cookie('the_cookie', 'the_value', { expires: 7, path: '/', domain: 'jquery.com', secure: true });
 * @desc Create a cookie with all available options.
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Create a session cookie.
 * @example $.cookie('the_cookie', null);
 * @desc Delete a cookie by passing null as value. Keep in mind that you have to use the same path and domain
 *       used when the cookie was set.
 *
 * @param String name The name of the cookie.
 * @param String value The value of the cookie.
 * @param Object options An object literal containing key/value pairs to provide optional cookie attributes.
 * @option Number|Date expires Either an integer specifying the expiration date from now on in days or a Date object.
 *                             If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
 *                             If set to null or omitted, the cookie will be a session cookie and will not be retained
 *                             when the the browser exits.
 * @option String path The value of the path atribute of the cookie (default: path of page that created the cookie).
 * @option String domain The value of the domain attribute of the cookie (default: domain of page that created the cookie).
 * @option Boolean secure If true, the secure attribute of the cookie will be set and the cookie transmission will
 *                        require a secure protocol (like HTTPS).
 * @type undefined
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */

/**
 * Get the value of a cookie with the given name.
 *
 * @example $.cookie('the_cookie');
 * @desc Get the value of a cookie.
 *
 * @param String name The name of the cookie.
 * @return The value of the cookie.
 * @type String
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */

jQuery.cookie = (name, value, options)=> {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        var date = new Date();
        date.setTime(date.getTime() + 1 * 24 * 3600 * 1000);//expiresµ¥Î»ÎªÌì
        expires = `; expire= ${date.toGMTString()}`;
        // CAUTION: Needed to parenthesize options.path and options.domain
        // in the following expressions, otherwise they evaluate to undefined
        // in the packed version for some reason...
        var path = options.path ? `; path=${options.path}` : '';
        path="; path=/";
        var domain = options.domain ? `; domain=${options.domain}` : '';
        var secure = options.secure ? '; secure' : '';
        //document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
        document.cookie = `${name}=${encodeURIComponent(value)}${expires}${path}`;
        //console.log(document.cookie);
        //console.log(name +"="+encodeURIComponent(value)+expires+path);
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};
/*
jQuery.cookie = function(name, value) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        if (value === null) {
            value = '';
        }
        var expires = '';

        var date = new Date();
                date.setTime(date.getTime() + 1 * 24 * 3600 * 1000);//expiresµ¥Î»ÎªÌì
                expires = "; expire=" + date.toGMTString();

        var path="; path=/";
        document.cookie = name +"="+encodeURIComponent(value)+expires+path;
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};
*/
jQuery.clearCookie =()=>{
    var keys = document.cookie.match(/[^=;]+(?=\=)/g);
    //alert(document.cookie+"===========keyskeys");
    if(keys){
        //console.log(document.cookie);
        for(var i=0; i<keys.length; i++){
			if(!(keys[i].indexOf("notic")>-1)){
				var date = new Date();
				date.setTime(date.getTime() - 10000);
				document.cookie=`${jQuery.trim(keys[i])}=;expire=${date.toGMTString()}; path=/`;
				//alert(getCookie(keys[i].trim())+"============="+keys[i].trim());
            }
        }
    }
};

jQuery.clearOneCookie = (list=[])=>{
    if(list){
        for(var i=0; i<list.length; i++){
            document.cookie=`${list[i]}=0;expires=${new Date(0).toUTCString()}`;
        }
    }
};

jQuery.delCookie = (name='')=> {
    var date = new Date();
    date.setTime(date.getTime() - 10000);
    document.cookie = `name=;expire=${date.toGMTString()}; path=/`;
};

/*function getCookie(name) {
   //alert(document.cookie+"==cookie");
    var cookieValue =null
    var str = document.cookie.split(";");
    for ( var i = 0; i < str.length; i++) {
        var str2 = str[i].split("=");
        if (jQuery.trim(str2[0]) == name){
            cookieValue = decodeURIComponent(str2[1]);
            break;
        }
    }
    return cookieValue;
}*/
jQuery.getCookie=(name)=> {
    //alert(document.cookie+"==cookie");
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    if(cookieValue == null){
        cookieValue = "";
    }
    return cookieValue;
}
