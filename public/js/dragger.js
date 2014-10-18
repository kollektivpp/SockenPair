var Dragger = Dragger || {};

Dragger.initialize = function() {
    Dragger.dragImage = document.querySelector('#dragImage');
    Dragger.dragStartX = 0;
    Dragger.dragStartY = 0;

    Dragger.registerEventListener();
};

Dragger.registerEventListener = function() {
	Dragger.dragImage.addEventListener('dragstart', function(e) {
		var imageOffset = Dragger.getOffset(Dragger.dragImage);
		Dragger.dragStartX = e.x - imageOffset.left;
    	Dragger.dragStartY = e.y - imageOffset.top;
	}, false);

    Dragger.dragImage.addEventListener('dragend', function(e) {
    	Dragger.dragImage.style.position = 'absolute';
    	Dragger.dragImage.style.top = (e.y - Dragger.dragStartY) + 'px';
    	Dragger.dragImage.style.left = (e.x - Dragger.dragStartX) + 'px';
    	Dragger.dragStartX = 0;
    	Dragger.dragStartY = 0;
    	console.log(e);
    }, false);
};

Dragger.getOffset = function(element) {
    var _x = 0;
    var _y = 0;
    while( element && !isNaN( element.offsetLeft ) && !isNaN( element.offsetTop ) ) {
        _x += element.offsetLeft - element.scrollLeft;
        _y += element.offsetTop - element.scrollTop;
        element = element.offsetParent;
    }
    return { top: _y, left: _x };
}

Dragger.initialize.call();
