function createAjaxObject() {
	try {
		if (window.ActiveXObject) return new ActiveXObject('Microsoft.XMLHTTP');
		else if (window.XMLHttpRequest) return new XMLHttpRequest();
		else return false;
	} catch(e) {
		return false;
	}
}

var routeJSObject = {
	getPrefix: function(url) {
		var getPrefix = '?';
		if (url.charAt(url.length - 1) === '/') getPrefix = '/?';
		else
			for (var i = url.length - 1; i > 0 && url.charAt(i) !== '/'; i--)
				if (url.charAt(i) === '?') {
					getPrefix = '&';
					break;
				}
		return getPrefix;
	},

	loader: {
		start: function() {
			document.getElementById('routeJSLoaderFiller').style.width = '0';
			document.getElementById('routeJSLoader').style.display = 'block';
		},

		timeout: null,

		set: function(newPercent) {
			var delayedLoad = function(newPercent, currentPercent) {
				if (currentPercent < newPercent) {
					document.getElementById('routeJSLoaderFiller').style.width = (currentPercent+1) + '%';
					if (routeJSObject.loader.timeout) clearTimeout(routeJSObject.loader.timeout);
					routeJSObject.loader.timeout = setTimeout(function() {
						delayedLoad(newPercent, currentPercent+1);
					}, Math.floor(currentPercent/10) + 1);
				}
			};
			delayedLoad(newPercent, parseInt(document.getElementById('routeJSLoaderFiller').style.width.match(/[0-9]+/)));
		},

		finish: function() {
			document.getElementById('routeJSLoader').style.display = 'none';
			document.getElementById('routeJSLoaderFiller').style.width = '0';
		}
	},

	ajax: {
		object: createAjaxObject(),

		sendGetRequest: function(url) {
			if (!routeJSObject.ajax.object) return;

			routeJSObject.loader.set(10);
			try {
				if (routeJSObject.ajax.object.readyState === 0 || routeJSObject.ajax.object.readyState === 4) {
					routeJSObject.loader.set(20);
					routeJSObject.ajax.object.open('GET', url + routeJSObject.getPrefix(url) + 'routeJSRequestModifier');
					routeJSObject.loader.set(30);
					routeJSObject.ajax.object.onreadystatechange = function() {
						routeJSObject.ajax.handleResponse(url);
					};
					routeJSObject.loader.set(40);
					routeJSObject.ajax.object.send(null);
					routeJSObject.loader.set(50);

				} else setTimeout(function() {
					routeJSObject.ajax.sendGetRequest(url);
				},1000);

			} catch(e) {
				console.log('Couldn\'t process request! ' + e.toString());
			}
		},

		sendPostRequest: function(url, params) {
			if (!routeJSObject.ajax.object) return;

			routeJSObject.loader.set(10);
			try {
				if (routeJSObject.ajax.object.readyState === 0 || routeJSObject.ajax.object.readyState === 4) {
					routeJSObject.loader.set(20);
					routeJSObject.ajax.object.open('POST', url + routeJSObject.getPrefix(url) + 'routeJSRequestModifier');
					routeJSObject.loader.set(30);
					routeJSObject.ajax.object.onreadystatechange = function() {
						routeJSObject.ajax.handleResponse(url);
					};
					routeJSObject.loader.set(40);
					routeJSObject.ajax.object.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
					routeJSObject.ajax.object.send(params);
					routeJSObject.loader.set(50);

				} else setTimeout(function() {
					routeJSObject.ajax.sendGetRequest(url);
				},1000);

			} catch(e) {
				console.log('Couldn\'t process request! ' + e.toString());
			}
		},

		handleResponse: function(url) {
			routeJSObject.loader.set(60);
			if (routeJSObject.ajax.object.readyState === 4) {
				routeJSObject.loader.set(70);
				if (routeJSObject.ajax.object.status === 200) {
					routeJSObject.loader.set(80);
					try {
						document.getElementsByClassName('routeJSresponse')[0].innerHTML = routeJSObject.ajax.object.response;
						routeJSObject.loader.set(90);
						routeJSObject.routeAll();
						window.history.pushState({'html': routeJSObject.ajax.object.response}, '', url);
						routeJSObject.loader.set(100);
					} catch(e) {
						console.log('Couldn\'t handle response! ' + e.toString());
					}
				} else {
					console.log('Invalid status! ' + routeJSObject.ajax.object.statusText);
				}
			}
			routeJSObject.loader.finish();
		}
	},

	routeLinks: function() {
		var anchors = document.getElementsByClassName('routeJSLink');
		for (var i = 0; i < anchors.length; i++) {
			if (anchors[i].className.indexOf('routeJSRouted') === -1) {
				anchors[i].addEventListener('click', function(event) {
					event.preventDefault();
					routeJSObject.loader.start();
					routeJSObject.ajax.sendGetRequest(this.href);
				});
				anchors[i].classList.add('routeJSRouted');
			}
		}
	},

	routeForms: function() {
		var anchors = document.getElementsByClassName('routeJSForm');
		for (var i = 0; i < anchors.length; i++) {
			if (anchors[i].className.indexOf('routeJSRouted') === -1) {
				anchors[i].addEventListener('click', function(event) {
					event.preventDefault();
					routeJSObject.loader.start();

					var formID = this.getAttribute('routeJSTarget');
					var formMethod = document.getElementById(formID).getAttribute('method').toLowerCase();
					var formAction = document.getElementById(formID).getAttribute('action');
					var inputFields = document.querySelectorAll('#' + formID + ' input');
					var parameters = 'submit=';
					for (var i = 0; i < inputFields.length; i++)
						parameters += '&' + encodeURIComponent(inputFields[i].getAttribute('name')) + '=' + encodeURIComponent(inputFields[i].value);
					if (formMethod === 'post') routeJSObject.ajax.sendPostRequest(formAction, parameters);
					else routeJSObject.ajax.sendGetRequest(formAction + routeJSObject.getPrefix(formAction) + parameters);
				});
				anchors[i].classList.add('routeJSRouted');
			}
		}
	},

	routeAll: function() {
		routeJSObject.routeLinks();
		routeJSObject.routeForms();
	}
};

window.addEventListener('popstate', function(event) {
	if (event.state) document.getElementsByClassName('routeJSresponse')[0].innerHTML = event.state.html;
});

window.addEventListener('load', routeJSObject.routeAll());