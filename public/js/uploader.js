var Uploader = Uploader || {};

Uploader.initialize = function() {
    Uploader.dragDropField = document.querySelector('#dragdropfield');
    Uploader.fileField = document.querySelector('#filefield');
    Uploader.formField = document.querySelector('#contentwrapper');

    Uploader.registerEventListener();
};

Uploader.registerEventListener = function() {
    // prevent default behavior from changing page on dropped file
    window.addEventListener('dragover', function(e) {
        e.preventDefault();
    }, false);

    window.addEventListener('drop', function(e) {
        e.preventDefault();
    }, false);

    Uploader.dragDropField.addEventListener('dragover', function(e) {
        Uploader.dragDropField.className = 'hover';
    }, false);

    Uploader.dragDropField.addEventListener('dragend', function(e) {
        Uploader.dragDropField.className = '';
    }, false);

    Uploader.dragDropField.addEventListener('drop', function(e) {
        e.preventDefault();
        e.stopPropagation();

        // TODO: implement upload

    }, false);

    Uploader.dragDropField.addEventListener('click', function(e) {
        Uploader.fileField.click();
    }, false);

    Uploader.dragDropField.addEventListener('touchend', function(e) {
        Uploader.fileField.click();
    }, false);

    Uploader.fileField.addEventListener('change', function(e) {
        Uploader.formField.submit();
    }, false);
};

Uploader.initialize.call();
