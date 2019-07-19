$(function () {
    
    $('#test').click(function () {
        uploadFile($('#echo'));
    });
    
    function uploadFile (el) {
        if (isIE()) {
            drawFileUpload('IE上传文件');
            fileUploadForIE(el);
        } else {
            drawFileUploadNormal('上传文件');
            fileUploadNormal(el);
        }
    }
});
