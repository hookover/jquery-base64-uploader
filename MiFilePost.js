/**
 * Created by chenjiang on 17-2-16.
 * chenjiang@xiaomi.com
 * https://github.com/baoniu
 *
 * 插件功能：多文件ajax post方式上传，文件数据在本地转换为base64字符串形式
 * 在 firefox 51.0.1、chrome 56.0.2924.87 上测试通过
 *
 * 调用方式
 * <input id="upload-input" type="file" multiple="multiple">
 * $('#upload-input').MiPostFile({
 *      url: url,
 *      success: successCallback,
 *      error: errorCallback,
 *      complete: completeCallback
 * });
 *
 * 服务器接收uploads数组，数组格式：
 * uploads[0][base64]           存放文件的base64编码:  data:image/png;base64,uZfgTA==
 * uploads[0][filename]         存放文件名称：         f5fd5489-03dc-493d-87f4-ab68963b23ec.png
 * uploads[0][last_modified]    存放文件最后修改时间：  1483585360000
 * uploads[0][size]             存放文件大小          4
 * uploads[0][type]             存放文件类型          image/png
 *
 * uploads[1] ...
 * uploads[2] ...
 *
 * 注意：文件过大可能会导致转化速度缓慢以及浏览器崩溃的可能性，这取决于浏览器自身的性能和客户端设备的计算能力
 *
 */
(function($,window,document,undefined){
    var bn = function ($, options) {
        this.$ = $;
        this.defaults = {
            url: '',
            success: false,
            error: false,
            complete: false,
        };
        this.default_vars = {
            files: [],
            post_data: {
                uploads: []
            }
        };
        this.options = $.extend({}, this.defaults, options);
        this.vars = $.extend({}, this.default_vars);
    };
    bn.prototype = {
        reset_vars: function () {
            this.vars.files = [];
            this.vars.post_data.uploads = [];
        },
        fileToBase64: function (/* file object */ file, /* 回调函数,返回文件名称，类型，base64编码 */callback, /*改变回调函数this指针*/obj) {
            var reader = new FileReader();
            reader.onload = function(e){
                var data = {
                    filename: file.name,
                    type: file.type,
                    size: file.size,
                    last_modified:file.lastModified,
                    base64: e.target.result
                };
                if(obj instanceof Object) {
                    callback.call(obj, data)
                } else {
                    callback(data);
                }
            };
            reader.readAsDataURL(file);
        },
        ajaxPost: function () {
            $.ajax({
                url: this.options.url,
                type: 'POST',
                data: this.vars.post_data,
                success: this.options.success,
                error: this.options.error,
                complete: this.options.complete
            });
        },
        cantPost: function (data) {
            this.vars.post_data.uploads.push(data);
            if(this.vars.post_data.uploads.length ==  this.vars.files.length) {
                this.ajaxPost();
                this.reset_vars();
            }
        },
        onHook: function () {
            var _self = this;
            this.$.on('change',function (e) {
                var files = $(this).get(0).files;
                _self.vars.files = files;
                for(var i=0;i<files.length;i++) {
                    var file = files[i];
                    _self.fileToBase64(file, _self.cantPost, _self);
                }
            });
        }
    };
    $.fn.MipostFile = function (options) {
        var _bn = new bn(this, options);
        _bn.onHook();
    };
})(jQuery,window,document);