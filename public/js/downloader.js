var Downloader = Downloader || {};

Downloader.initialize = function() {
    Downloader.dragImage = document.querySelector('#dragImage');
    Downloader.downloadwrapper = document.querySelector('#downloadwrapper');

    Downloader.registerEventListener();
};

Downloader.registerEventListener = function() {
    Downloader.dragImage.addEventListener('click', function(e) {
        // TODO: must be dynamic
        Downloader.downloadwrapper.action = Downloader.downloadwrapper.action + '/' + 'bfee6581f6595eb6bf21c64d9edaadd9.png';
    	Downloader.downloadwrapper.submit();
    });
};

Downloader.initialize.call();
