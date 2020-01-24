// expiresMin, path and domain are optional arguments
function createCookie(name, value, expiresMin, path, domain) {
	let cookie = name + "=" + escape(value) + ";";

	if (expires) {
		expiresMin = new Date(new Date().getTime() + parseInt(expiresMin) * 1000 * 60);
		cookie += "expires=" + expiresMin.toGMTString() + ";";
	}

	if (path) {
		cookie += "path=" + path + ";";
	}
	if (domain) {
		cookie += "domain=" + domain + ";";
	}
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