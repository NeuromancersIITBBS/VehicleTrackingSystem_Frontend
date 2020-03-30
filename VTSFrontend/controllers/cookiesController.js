// expiresMin, path and domain are optional arguments
function createCookie(name, value, expires, path, domain) {
    var cookie = name + "=" + escape(value) + ";";

    if (expires) {
        // If it's a date
        if (expires instanceof Date) {
            // If it isn't a valid date
            if (isNaN(expires.getTime()))
                expires = new Date();
        } else
            expires = new Date(new Date().getTime() + parseInt(expires) * 1000 * 60);

        cookie += "expires=" + expires.toGMTString() + ";";
    }

    if (path)
        cookie += "path=" + path + ";";
    if (domain)
        cookie += "domain=" + domain + ";";
    console.log(cookie);
    document.cookie = cookie;
}

function getCookie(name) {
    let regexp = new RegExp("(?:^" + name + "|;\s*" + name + ")=(.*?)(?:;|$)", "g");
    let result = regexp.exec(document.cookie);
    return (result === null) ? null : result[1];
}

// path and domain are optional arguments
function deleteCookie(name, path, domain) {
    // If the cookie exists
    if (getCookie(name))
        createCookie(name, "", -1, path, domain);
}