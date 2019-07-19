var bootpath = getRootPath_web();
var webPath = getWebPath();

// 获取到主机地址与项目名称这一级
function getRootPath_web() {
    // 获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
    var curWwwPath = window.document.location.href;
    // 获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
    var pathName = window.document.location.pathname;
    var pos = curWwwPath.indexOf(pathName);
    // 获取主机地址，如： http://localhost:8083
    var localhostPaht = curWwwPath.substring(0, pos);
    // 获取带"/"的项目名，如：/uimcardprj
    var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
    return (localhostPaht + projectName);
}

// 获取主机地址
function getWebPath() {
    // 获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
    var curWwwPath = window.document.location.href;
    // 获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
    var pathName = window.document.location.pathname;
    var pos = curWwwPath.indexOf(pathName);
    // 获取主机地址，如： http://localhost:8083
    return curWwwPath.substring(0, pos);
}

function asyncCallAjaxByPost(urlLink,data,callBack) {
    var modelData = {};
    var resultData = {};
    if ( null != data && 'undefined' != typeof(data) ) {
        modelData = data;
    }
    $.ajax({
        url : webPath + urlLink,
        type : "POST",
        data : modelData,
        dataType : "json",
        cache:false,// false是不缓存，true为缓存
        async:true
    }).done(function(result) {
        if ( !result ) {
            resultData = false;
        } else {
            resultData = result;
        }
        callBack(resultData);
    }).fail(function() {
        resultData = false;
        callBack(resultData);
    });
}

function syncCallAjaxByPost(urlLink,data,callBack) {
    var modelData = {};
    var resultData = {};
    if ( null != data && 'undefined' != typeof(data) ) {
        modelData = data;
    }
    $.ajax({
        url : webPath + urlLink,
        type : "POST",
        data : modelData,
        dataType : "json",
        cache:false,// false是不缓存，true为缓存
        async:false
    }).done(function(result) {
        if ( !result ) {
            resultData = false;
        } else {
            resultData = result;
        }
        callBack(resultData);
    }).fail(function() {
        resultData = false;
        callBack(resultData);
    });
}

function asyncCallAjaxByGet(urlLink,data,callBack) {
    var modelData = {};
    var resultData = {};
    if ( null != data && 'undefined' != typeof(data) ) {
        modelData = data;
    }
    $.ajax({
        url : webPath + urlLink,
        type : "GET",
        data : modelData,
        dataType : "json",
        cache:false,// false是不缓存，true为缓存
        async:false
    }).done(function(result) {
        if ( !result ) {
            resultData = false;
        } else {
            resultData = result;
        }
        callBack(resultData);
    }).fail(function() {
        resultData = false;
        callBack(resultData);
    });
}

//序列化表单内容
function serializeObject(form){
    var o = {};
    form.find(".ui-select").each(function(r){
        var name=$(this).attr("name");
        var value=$(this).attr("data-value");
        o[name]= value;
    });
    
    $.each(form.serializeArray(),function(index){
        if(o[this['name']]){
            o[this['name']] = o[this['name']] + ","+this['value'];
        }else{
            o[this['name']] =  this['value'];
        }
    });
    return o;
}

//长度校验
function isExceeded(str, length) {
    var realLength = 0, len = str.length, charCode = -1;
    for (var i = 0; i < len; i++) {
        charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) realLength += 1;
        else realLength += 2;
    }
    return realLength <= length;
}

// 判断浏览器型号
function isIE () { //ie?
    if (!!window.ActiveXObject || "ActiveXObject" in window)
        return true;
    else
        return false;
}

/**
 * 获取指定url参数
 *
 * @param {String} name
 * @return {String|null}
 */
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var URL = decodeURI(window.location.search);
    var r = URL.substr(1).match(reg);
    if (r != null) {
        //decodeURI() 函数可对 encodeURI() 函数编码过的 URI 进行解码
        return decodeURI(r[2]);
    }
    return null;
}


/**
 * 校验空值
 * @param data
 * @returns {boolean}
 */
function isEmpty (data) {
    var dataType = $.type(data);
    var result = true;
    if (data === 0) return false;
    // 对data的类型进行特异性判断
    switch (dataType) {
        case 'object':
            // 如果是{}
            Object.keys(data).length !== 0 ? result = false : '';
            // DOM元素keys为空，多加一层判断
            // if (data instanceof HTMLElement) result = false;
            break;
        case 'array':
            // 如果是[]
            data.length !== 0 && data[0] !== null ? result = false : '';
            break;
        case 'number':
            // 如果是NaN
            result = isNaN(data);
            break;
        case 'string':
            // 判断是否为空字符串或全部为空格
            if (data !== '' && !data.match(/^\s*$/)) {
                result = false;
            }
            break;
        default:
            result = !Boolean(data);
    }
    return result;
}

function isNotEmpty (data) {
    return !isEmpty(data);
}

/**
 * 弹出模态框
 * @param id 模态框ID
 * @param title 模态框名称
 * @param headline 表格上标题
 * @param tableId 模态框中列表的ID
 */
function showModal(id, title, headline, tableId, size) {
    if ( $('#'+id).length === 0 ){
        var modal = [];
        modal.push('<div class="modal fade" id="'+id+'" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">');
        modal.push('<div class="modal-dialog '+size+'" role="document">');
        modal.push('<div class="modal-content access-project-background" >');
        modal.push('<div class="modal-header">');
        modal.push('<div class="access-title"><h4 class="modal-title m-t-5" id="myModalLabel">' + title + '</h4></div>');
        modal.push('</div><div class="modal-body">');
        isNotEmpty(headline) ? modal.push('<p>'+headline+'</p>') : '';
        modal.push('<table id="' + tableId + '"></table></div>');
        modal.push('<div class="modal-footer">');
        modal.push('<div class="col-sm-12 col-center-block text-center">');
        modal.push('<button type="button" class="btn access-btn" id="'+id+'Save">提交</button>');
        modal.push('<button type="button" class="btn access-btn" data-dismiss="modal">关闭</button>');
        modal.push('</div></div></div></div>');
        $('body').append(modal.join(''));
    }
}

// 提示消息
function toaster (title, body, type, opt) {
    var _option = {
        // append to body
        appendTo: 'body',
        // is stackable?
        stack: false,
        // 'toast-top-left'
        // 'toast-top-right'
        // 'toast-top-center'
        // 'toast-bottom-left'
        // 'toast-bottom-right'
        // 'toast-bottom-center'
        position_class: 'toast-top-center',
        // true = snackbar
        fullscreen: false,
        // width
        width: 100,
        // space between toasts
        spacing: 20,
        // in milliseconds
        timeout: 4000,
        // has close button
        has_close_btn: true,
        // has icon
        has_icon: true,
        // is sticky
        sticky: false,
        // border radius in pixels
        border_radius: 6,
        // has progress bar
        has_progress: true,
        // RTL support
        rtl: false
    };
    opt = opt || {};
    $.extend(_option, opt);
    title = title || '';
    body = body || '';
    if (type !== 'success' && type !== 'error' && type !== 'info' && type !== 'notice' && type !== 'upload')
    {
        type = 'info';
    }
    $.Toast(title, body, type, _option);
}

/**
 * IE上传文件modal框
 * @param title modal-title
 */
function drawFileUpload (title) {
    if ( $('#myModalUpload').length === 0 ) {
        $('body').append
        ([
                '<div class="modal fade" id="myModalUpload"  data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'
                ,	'<div class="modal-dialog">'
                ,		'<div class="modal-content">'
                ,			'<div class="modal-header">'
                ,				'<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'
                ,				'<h4 class="modal-title" id="myModalLabel">文件上传</h4>'
                ,			'</div>'
                ,			'<div class="modal-body">'
                ,			    '<div class="file-display">'
                ,			        '<div class="file-upload-area">'
                ,			            '<button id="addFileForIE" class="btn btn-sm btn-success">添加文件</button>'
                ,                       '<form id="fileFormForIE" action="" target="hidden-frame" method="post" enctype="multipart/form-data">'
                ,                       '<div class="col-sm-2">'
                ,                       '<span style="padding-left: 0;">上传列表</span>'
                ,                       '</div>'
                ,                       '<div class="col-sm-10">'
                ,                       '<div class="file-upload-display">'
                ,                       '<ul class="inputUL">'
                ,                       '</ul>'
                ,                       '</div>'
                ,                       '</div>'
                ,                       '</form>'
                ,                       '<iframe name="hidden-frame" class="hidden-frame" style="display: none" id="hiddenFrame"></iframe>'
                ,                   '</div>'
                ,               '</div>'
                ,           '</div>'
                ,			'<div class="modal-footer">'
                ,				'<button type="button" class="btn btn-primary" id="confirmUpload" >确定</button>'
                ,				'<button type="button" class="btn btn-default" id="cancelUpload" data-dismiss="modal">取消</button>'
                ,			'</div>'
                ,		'</div>'
                ,	'</div>'
                ,'</div>'
            ].join('')
        );
        if (isNotEmpty(title)) {
            $('#myModalLabel').html(title);
        }
    }
}

/**
 * ie上传文件modal框绑定事件
 * @param el 选择完成后要回显的面板
 */
function fileUploadForIE (el) {
    var $myModalUpload = $('#myModalUpload');
    $myModalUpload.on({
        'shown.bs.modal': function () {
            $('#addFileForIE').on('click', function () {
                addFileForIE();
            });
            $('#confirmUpload').on('click', function () {
                if (!hasFileForIE()) {
                    toaster('存在文件未上传，请选择文件后再上传', '', 'info');
                    return false ;
                }
                if (!checkDuplicateFile('', el)) {
                    return false;
                }
                loadingModal();
                // 去除保存成功modal框
                loadingModalEvent(function () {
                    $('#fileFormForIE').ajaxSubmit({
                        url : '/upload',
                        type : 'post',
                        dataType: 'text', //数据类型
                        ContentType : 'multipart/form-data',
                        // ContentType必须
                        success : function(res) {
                            var data = JSON.parse(res);
                            var dataSuccess = data.dataSuccess;
                            if (isNotEmpty(dataSuccess)) {
                                $('#saveMessage').empty().append('文件上传成功');
                                setTimeout(function () {
                                    $('#loadingModal').modal('hide');
                                }, 500);
    
                                // 进行回显
                                var content = [];
                                dataSuccess.forEach(function (item) {
                                    content.push('<span  class="file-option ">'+item+'</span>');
                                });
                                el.append(content.join(''));
                            }else{
                                toaster('上传失败', '', 'error');
                                $('#saveMessage').empty().append('文件上传失败');
                                $('#loadingModal').modal('hide');
                                toaster('文件上传失败', '', 'error');
                            }
                            $myModalUpload.modal('hide');
                        },
                        error : function() {
                            $('#saveMessage').empty().append('文件上传失败');
                            $('#loadingModal').modal('hide');
                            toaster('文件上传失败', '', 'error');
                        }
                    });
                });
            });
        },
        'hidden.bs.modal': function () {
            $(this).remove();
        }
    }).modal('show');
}

/**
 * 上传文件modal框
 * @param title modal-title
 * @param userId 当前用户ID
 */
function drawFileUploadNormal (title) {
    if ( $('#normalModalUpload').length === 0 ) {
        $('body').append
        ([
                '<div class="modal fade" id="normalModalUpload"  data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'
                ,	'<div class="modal-dialog">'
                ,		'<div class="modal-content">'
                ,			'<div class="modal-header">'
                ,				'<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'
                ,				'<h4 class="modal-title" id="myModalLabel">文件上传</h4>'
                ,			'</div>'
                ,			'<div class="modal-body">'
                ,			    '<div class="file-display">'
                ,			        '<div class="file-upload-area">'
                ,			            '<button id="addFile" class="btn btn-sm btn-success">添加文件</button>'
                ,                       '<input class="hidden" type="file" id="normalFiles">'
                ,                       '<form id="fileForm" method="post" enctype="multipart/form-data">'
                ,                       '<div class="col-sm-2">'
                ,                       '<span style="padding-left: 0;">上传列表</span>'
                ,                       '</div>'
                ,                       '<div class="col-sm-10">'
                ,                       '<div class="file-upload-display">'
                ,                       '<ul class="inputUL">'
                ,                       '</ul>'
                ,                       '</div>'
                ,                       '</div>'
                ,                       '<input class="hidden" type="file" name="file" id="file">'
                ,                       '</form>'
                ,                   '</div>'
                ,               '</div>'
                ,           '</div>'
                ,			'<div class="modal-footer">'
                ,				'<button type="button" class="btn btn-primary" id="confirmUpload" >确定</button>'
                ,				'<button type="button" class="btn btn-default" id="cancelUpload" data-dismiss="modal">取消</button>'
                ,			'</div>'
                ,		'</div>'
                ,	'</div>'
                ,'</div>'
            ].join('')
        );
        if (isNotEmpty(title)) {
            $('#myModalLabel').html(title);
        }
    }
}

/**
 * 上传文件modal框绑定事件(一般浏览器)
 * @param el 选择完成后要回显的面板
 */
function fileUploadNormal (el) {
    var $normalModalUpload = $('#normalModalUpload');
    $normalModalUpload.on({
        'shown.bs.modal': function () {
            $('#addFile').on('click', function () {
                var lis = $('.inputUL').find('li');
                if (lis.length >= 5) {
                    toaster('文件上传最多支持5个文件', '', 'info');
                    return false;
                }
                $('#normalFiles').trigger('click');
            });
            uploadChange(el);
            $('#confirmUpload').on('click', function () {
                loadingModal();
                // 去除保存成功modal框
                loadingModalEvent(function () {
                    $('#fileForm').ajaxSubmit({
                        url : '/upload',
                        type : 'post',
                        ContentType : 'multipart/form-data',
                        // ContentType必须
                        success : function(res) {
                            var data = JSON.parse(res);
                            var dataSuccess = data.dataSuccess;
                            if (isNotEmpty(dataSuccess)) {
                                $('#saveMessage').empty().append('文件上传成功');
                                setTimeout(function () {
                                    $('#loadingModal').modal('hide');
                                }, 500);
                                
                                // 进行回显
                                var content = [];
                                dataSuccess.forEach(function (item) {
                                    content.push('<span  class="file-option ">'+item+'</span>');
                                });
                                el.append(content.join(''));
                            }else{
                                $('#saveMessage').empty().append('文件上传失败');
                                $('#loadingModal').modal('hide');
                                toaster('上传失败', '', 'error');
                            }
                            $normalModalUpload.modal('hide');
                        },
                        error : function() {
                            $('#saveMessage').empty().append('文件上传失败');
                            $('#loadingModal').modal('hide');
                            toaster('上传失败', '', 'error');
                        }
                    });
                });
            });
        },
        'hidden.bs.modal': function () {
            $(this).remove();
        }
    }).modal('show');
}

// 选择文件时触发的方法
function uploadChange (el) {
    $('#normalFiles').on('change', function () {
        var _this = this;
        if (!checkFile(this)) {
            return false;
        }
        var fileName = $(this).get(0).files[0].name;
        if (checkDuplicateFile(fileName)) {
            var id = getUuid();
            // 将文件存入隐藏的file域
            var html = '<input class="hidden" type="file" name="file' + id + '" id="'+id+'">';
            // 将文件名字展示到待上传列表中
            var li = '<li>'+html+fileName+'<span class="glyphicon glyphicon-trash" onclick="deleteInput(this)"></span></li>';
            $('.inputUL').append(li);
            $("#"+id)[0].files = _this.files;
            // 清空file域
            $(_this).after($(_this).clone().val(''));
            $(_this).remove();
            // 重新绑定change事件
            uploadChange(el);
        }
    });
}

// 校验已上传的文件是否已上传过
function isRepeatUpload (el, fileName) {
    var files = el.data('files');
    var isRepeat = false;
    if (isNotEmpty(files)) {
        files.forEach(function (item) {
            if (fileName === item) {
                isRepeat = true;
            }
        });
    }
    return isRepeat;
}


// IE浏览器下添加文件
function addFileForIE() {
    var $inpurUL = $('.inputUL');
    var lis = $inpurUL.find('li');
    if (lis.length >= 100) {
        toaster('文件上传最多支持100个文件', '', 'info');
        return false;
    }
    var id = getUuid();
    var html = '<li><input contenteditable="false" class="fileInput" type="file" id="'+id+'" name="file' + id + '"><span class="glyphicon glyphicon-trash" onclick="deleteInput(this)"></span></li>';
    $inpurUL.append(html);
    $(".fileInput").off('change').on('change', fileInputChangeForIE);
}

// IE下选择文件时出发的方法
function fileInputChangeForIE() {
    
    if (!checkFile(this)) {
        var id = getUuid();
        var html = '<li><input contenteditable="false" class="fileInput" type="file" id="'+id+'" name="file' + id + '"><span class="glyphicon glyphicon-trash" onclick="deleteInput(this)"></span></li>';
        $(this).replaceWith(html);
        $(".fileInput").off('change').on('change', fileInputChangeForIE);
    }
}

// 删除一个上传文件
function deleteInput (el) {
    $(el).parent().remove();
}

// 是否有待上传文件
function hasFileForIE() {
    var $inputs = $(".inputUL").find("input");
    if ($inputs.length > 0) {
        try {
            $.each($inputs, function(i, item) {
                if (isEmpty($(item).val())) {
                    throw new Error('end');
                }
            });
        } catch (e) {
            return false;
        }
        return true;
    }
    return false;
}

// 校验重复文件
function checkDuplicateFile (fileName, el) {
    var inputs = $('.inputUL').find('input');
    // ie判断重复文件
    if (isEmpty(fileName)) {
        var res = [];
        if (inputs.length !== 0) {
            $.each(inputs, function (index, item) {
                var fileName = $(item).val();
                fileName = fileName.substring(fileName.lastIndexOf('\\')+1, fileName.length);
                res.push(fileName);
            });
            var flag = true;
            var sres = res.sort();
            for(var i = 0; i < sres.length - 1; i++) {
                if (sres[i] === sres[i+1]) { // 存在重复文件
                    flag = false;
                    toaster(sres[i]+'重复上传', '', 'error');
                    break;
                }
            }
            return flag;
        }
        return true;
    } else {
        if (inputs.length !== 0) {
            try {
                $.each(inputs, function (index, item) {
                    if (fileName === $(item).get(0).files[0].name) {
                        throw new Error('end');
                    }
                });
                return true;
            } catch (e) {
                toaster(fileName+'已存在', '', 'info');
                return false;
            }
        }
        return true;
    }
}

// 校验文件
function checkFile (el) {
    var fileSize = 0;
    var filemaxsize = 3 * 1024; // 3M
    
    if (isIE()) {
        // 验证文件是否存在
        var filePath = el.value;
        var fileName = filePath;
        if (fileName.lastIndexOf('\\') > 0) {
            fileName = fileName.substring(fileName.lastIndexOf('\\')+1, fileName.length);
        }
        if (isRepeatUpload(el, fileName)) {
            toaster(fileName+'已上传', '', 'error');
            return false;
        }
        var fileSystem = new ActiveXObject("Scripting.FileSystemObject");
        if (!fileSystem.FileExists(filePath)) {
            toaster('附件不存在，请重新输入！', '', 'error');
            return false;
        }
        // 验证文件大小
        var file = fileSystem.GetFile(filePath);
        fileSize = file.Size;
        if (fileSize/1024 > filemaxsize) {
            toaster('附件大小不能大于3M', '', 'error');
            return false;
        }
        if (fileSize/1024 <= 0) {
            toaster('附件大小不能小于0M', '', 'error');
            return false;
        }
        return true;
    } else {
        try {
            fileSize = $(el).get(0).files[0].size / 1024;
            if (fileSize > filemaxsize) {
                toaster('附件大小不能大于3M', '', 'info');
                throw new Error('more');
            }
            if (fileSize <= 0) {
                toaster('附件大小不能为0M！', '' ,'info');
                throw new Error('less');
            }
        } catch (e) {
            return false;
        }
        return true;
    }
    
}

// loading效果模态框
function loadingModal () {
    var content = [];
    content.push('<div class="modal fade" id="loadingModal" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">');
    content.push('<div class="modal-dialog">');
    content.push('<div class="modal-content">');
    content.push('<div class="modal-body" style="height: 56px;">');
    content.push('<img src="../img/loading.gif" alt="" style="float: left;">');
    content.push('<div style="float: left;margin: 5px;">');
    content.push('<span id="saveMessage" style="font-size: 15px;">保存中...</span>');
    content.push('</div></div></div></div></div>');
    $('body').append(content.join(''));
    $('#loadingModal').modal('show');
}

// loading绑定的事件
function loadingModalEvent (shownFunc) {
    var $loadingModal = $('#loadingModal');
    $loadingModal.on({
        'shown.bs.modal': shownFunc ,
        'hidden.bs.modal': function () {
            $loadingModal.remove();
        }
    });
}

// 获取uuid
function getUuid() {
    /**
     * @return {string}
     */
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    
    /**
     * @returns {string}
     */
    function guid() {
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }
    
    return guid();
}

// ie8扩展foreach
if (!Array.prototype.forEach) {
    
    Array.prototype.forEach = function(callback/*, thisArg*/) {
        
        var T, k;
        
        if (this == null) {
            throw new TypeError('this is null or not defined');
        }
        
        // 1. Let O be the result of calling toObject() passing the
        // |this| value as the argument.
        var O = Object(this);
        
        // 2. Let lenValue be the result of calling the Get() internal
        // method of O with the argument "length".
        // 3. Let len be toUint32(lenValue).
        var len = O.length >>> 0;
        
        // 4. If isCallable(callback) is false, throw a TypeError exception.
        // See: http://es5.github.com/#x9.11
        if (typeof callback !== 'function') {
            throw new TypeError(callback + ' is not a function');
        }
        
        // 5. If thisArg was supplied, let T be thisArg; else let
        // T be undefined.
        if (arguments.length > 1) {
            T = arguments[1];
        }
        
        // 6. Let k be 0.
        k = 0;
        
        // 7. Repeat while k < len.
        while (k < len) {
            
            var kValue;
            
            // a. Let Pk be ToString(k).
            //    This is implicit for LHS operands of the in operator.
            // b. Let kPresent be the result of calling the HasProperty
            //    internal method of O with argument Pk.
            //    This step can be combined with c.
            // c. If kPresent is true, then
            if (k in O) {
                
                // i. Let kValue be the result of calling the Get internal
                // method of O with argument Pk.
                kValue = O[k];
                
                // ii. Call the Call internal method of callback with T as
                // the this value and argument list containing kValue, k, and O.
                callback.call(T, kValue, k, O);
            }
            // d. Increase k by 1.
            k++;
        }
        // 8. return undefined.
    };
}
// ie8扩展every
if (!Array.prototype.every) {
    Array.prototype.every = function (every_fun, thisArg) {
        var _this = null,
            iKey = 0,
            len = this.length; //无符号右移
        if (typeof every_fun !== "function") {
            throw new TypeError("every_fun is not a function");
        }
        if (thisArg) {
            _this = thisArg;
        }//绑定执行环境
        for (; iKey < len; iKey++) {
            var  key_Value = this[iKey];
            if(!every_fun.call(_this, key_Value, iKey, this)){
                return false;
            };
        }
        return true;
    }
}
// ie8兼容forEach
if ( !Array.prototype.forEach ) {
    
    Array.prototype.forEach = function forEach( callback, thisArg ) {
        
        var T, k;
        
        if ( this == null ) {
            throw new TypeError( "this is null or not defined" );
        }
        var O = Object(this);
        var len = O.length >>> 0;
        if ( typeof callback !== "function" ) {
            throw new TypeError( callback + " is not a function" );
        }
        if ( arguments.length > 1 ) {
            T = thisArg;
        }
        k = 0;
        
        while( k < len ) {
            
            var kValue;
            if ( k in O ) {
                
                kValue = O[ k ];
                callback.call( T, kValue, k, O );
            }
            k++;
        }
    };
}
