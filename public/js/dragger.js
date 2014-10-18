var Dragger = Dragger || {};

Dragger.initialize = function() {
    Dragger.dragImage = document.querySelector('#dragImage');
    Dragger.downloadwrapper = document.querySelector('#downloadwrapper');
    Dragger.dragImageStyle = Dragger.dragImage.style;
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
        Dragger.dragImageStyle.position = 'absolute';
        Dragger.dragImageStyle.top = (e.y - Dragger.dragStartY) + 'px';
        Dragger.dragImageStyle.left = (e.x - Dragger.dragStartX) + 'px';
        Dragger.dragStartX = 0;
        Dragger.dragStartY = 0;
    }, false);

    // ######### Mobile
    Dragger.dragImage.addEventListener('touchstart', function(e) {
        e.preventDefault();
        Dragger.dragImageStyle.position = 'absolute';
        var touches = e.changedTouches;
        var imageOffset = Dragger.getOffset(Dragger.dragImage);

        for (var i=0; i < touches.length; i++) {
            Dragger.dragStartX = touches[i].pageX - imageOffset.left;
            Dragger.dragStartY = touches[i].pageY - imageOffset.top;
        }
    }, false);

    Dragger.dragImage.addEventListener('touchend', function(e) {
        e.preventDefault();
        var touches = e.changedTouches;
        for (var i=0; i < touches.length; i++) {
            Dragger.dragImageStyle.top = (touches[i].pageY - Dragger.dragStartY) + 'px';
            Dragger.dragImageStyle.left = (touches[i].pageX - Dragger.dragStartX) + 'px';
        }
        Dragger.dragStartX = 0;
        Dragger.dragStartY = 0;
    }, false);

    Dragger.dragImage.addEventListener('touchmove', function(e) {
        e.preventDefault();
        var touches = e.changedTouches;
        for (var i=0; i < touches.length; i++) {
            Dragger.dragImageStyle.top = (touches[i].pageY - Dragger.dragStartY) + 'px';
            Dragger.dragImageStyle.left = (touches[i].pageX - Dragger.dragStartX) + 'px';
        }
    }, false);

    Dragger.dragImage.addEventListener('click', function(e) {
        // TODO: must be dynamic
        Dragger.downloadwrapper.action = Dragger.downloadwrapper.action + '/' + 'bfee6581f6595eb6bf21c64d9edaadd9.png';
    	Dragger.downloadwrapper.submit();
    });
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
