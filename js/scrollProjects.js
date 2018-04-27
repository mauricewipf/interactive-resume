var initialScrollTop;
function isElementInViewport(el) {
	if (typeof jQuery === "function" && el instanceof jQuery) {
		el = el[0];
	}

	var rect = el.getBoundingClientRect();

	return (
		rect.top >= 0 &&
		(rect.bottom - rect.height/2) <= (window.innerHeight || document.documentElement.clientHeight)
	);
}

if ($('.project-horizontal-gallery')[0]) {
	window.addEventListener('scroll', event => {
		if (isElementInViewport($('.project-horizontal-gallery'))) {
			$('.project-horizontal-gallery')[0].scrollLeft = $('html')[0].scrollTop - initialScrollTop;
		} else {
			initialScrollTop = window.scrollY - $('.project-horizontal-gallery')[0].scrollLeft;
		}
	});
}
