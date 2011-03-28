(function(argument) {
		var docElement = document.documentElement;
		var stamp = '__NC_STAMPED__';

		if (docElement[stamp]) {
			return;
		}

		docElement[stamp] = true;

		var getParentTag = function(node, nodeName) {
			while (node && node.nodeName != nodeName) {
				node = node.parentNode;
			}

			return node;
	    };

		var createNewTab = function(event) {
			var target = getParentTag(event.target, 'A');

			if (target && target.hostname &&
				(target.hostname != window.location.hostname) &&
				(!target.target || target.target == '_self')) {

				event.preventDefault();
				chrome.extension.sendRequest({url: target.href});
			}
		};

		docElement.addEventListener('click', createNewTab);
})();