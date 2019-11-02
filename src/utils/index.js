// 
// @str为提示信息,wepy是一个对象
// 
const baseUrl = 'https://uinav.com/api/public/v1'
import wepy from 'wepy'
wepy.baseToast = function(str='获取数据失败',icon="none"){
    wepy.showToast({
      title: str,
      icon: 'icon' // 提示没有图标
    })
}
// get请求
wepy.get = function(path,data={}){
    return wepy.request({
        url:baseUrl+path,
        data
    })
}

// post请求
wepy.post = function(path,data={}){
    return wepy.request({
        url:baseUrl+path,
        data,
        methos:'post'
    })
}