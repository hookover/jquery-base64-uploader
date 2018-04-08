### 解决问题
    因为小米的文件服务器限制了使用multipart/form-data方式上传，必须以base64形式上传文件
    然后找了很多开源软件，能用的都是借助flash插件实现，并且不能同时上传多个文件
    产品经理需要实现同时上传多个文件，最后借助浏览器FileReader实现此插件
    
### 插件依赖
    Jquery
    在 firefox 51.0.1、chrome 56.0.2924.87 上测试通过

### 插件功能
    将文件在本地转化为base64字符串后 POST 到目标 URL
    同时支持多文件上传
 
    
### 使用方式
  html:
  
     <input id="upload-input" type="file" multiple="multiple">
  
  javascript: 
  
      $('#upload-input').MiPostFile({
           url: url,
           success: successCallback,
           error: errorCallback,
           complete: completeCallback
      });
 
### 服务器接收POST uploads数组，数组格式：
      uploads[0][base64]           存放文件的base64编码:  data:image/png;base64,uZfgTA==
      uploads[0][filename]         存放文件名称：         f5fd5489-03dc-493d-87f4-ab68963b23ec.png
      uploads[0][last_modified]    存放文件最后修改时间：  1483585360000
      uploads[0][size]             存放文件大小          4
      uploads[0][type]             存放文件类型          image/png
     
      uploads[1] ...
      uploads[2] ...
      
      
     
