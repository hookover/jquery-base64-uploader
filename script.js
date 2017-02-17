$(function () {
    $('.upload-btn').on('click',function (e) {
        $("#upload-input").click();
        $('.data-container').show();
        $('pre').hide();
        $('.img-container').empty().html('<div class="icon"><i class="fa fa-file-image-o"></i></div>');
        $('.progress .determinate').width('0%');
        e.preventDefault();
    });

    $("#upload-input").MiPostFile({
        url: 'upload.php',
        success: function(data,status,xhr){
            data = JSON.parse(data);
            $('.card .progress').hide();
            $('.progress .determinate').width('0%');
            var imageUrls = data.map(function(item){
                if(item.mimetype === "image/jpeg" || item.mimetype === 'image/png' || item.mimetype === 'image/gif'){
                    return item.name;
                }
            });
            if(imageUrls && imageUrls[0]){
                $('.img-container').empty().html('<img src="/uploads/'+imageUrls[0]+'"/>');
            }else{
                $('.img-container').empty().html('<div class="icon"><i class="fa fa-check"></i></div>');
                setTimeout(function(){
                    $('.img-container').empty().html('<div class="icon"><i class="fa fa-file-image-o"></i></div>');
                },1000)
            }
            $('.data-container').hide();
            $('pre').show().text(JSON.stringify(data,null,' '));
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert('服务器错误')
        }
    });

});

