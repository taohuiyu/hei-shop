// 
// @str为提示信息,wepy是一个对象
// 
import wepy from 'wepy'
wepy.baseToast = function(str='获取数据失败',icon="none"){
    wepy.showToast({
      title: str,
      icon: 'icon' // 提示没有图标
    })
}