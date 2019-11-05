import wepy from 'wepy'

export default class Search extends wepy.mixin {
    data = {
        value:'',
        suggestList:[]
    }

    config = {
    }

    methods = {
        // tapHandle(id){
        //     wepy.navigateTo({
        //         url:'/pages/goods_detail/index?goods_id='+id
        //     })
            
        // },
       async onChange(e){
            //获取输入框最新中值
            // console.log(222)
            this.value = e.detail
            //把输入框的值发送请求给后台
            if(this.value.trim().length ==0) return this.suggestList= []
            const {data} = await wepy.get('/goods/qsearch',{
                query:this.value
            })
            if(data.meta.status !=200){
                return wepy.baseToast()
            }
            //后台返回数据，我们保存到data页面,所以在data 页面中要有接收的数据
            this.suggestList =data.message
            this.$apply()
        }
    }
}

