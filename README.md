# routeJS
A JS solution to implement routing, for a website built using PHP and the MVC design pattern<br>
The website is built on the MVC framework, similar to the repository found on https://github.com/amone4/MVC-website<br>

Routing is done using the route.js file, which uses Ajax to fetch content related to a particular request.
The links that need to be routed, need to have a `routeJSLink` class.
For forms, their submit button should have `routeJSForm` class, and need an attribute `routeJSTarget`, which contains the ID of the corresponding form.<br>

The header and footer files, need to include a `routeJSLoader`, and a `routeJSResponse` div.
PHP files need to include these header and footer files, only if `!isset($_GET['routeJSRequestModifier'])`.<br>

The main routing is done by the PHP code only. The JS only fetches the response via Ajax.
Advantage of this approach is that we need not worry about the user deactivating JS in the browser, atleast not for routing.
Also, we don't have to duplicate routing code from the PHP files, to the JS file.<br>

The demo code in this repository will help explain how things work. There might be some bugs that you may identify.
Your help in solving those is welcomed!