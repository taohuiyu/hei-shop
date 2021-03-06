import wepy from 'wepy'

export default class Search extends wepy.mixin {
    data = {
        value:'',
        suggestList:[],
        historyList:[]//搜索记录
    }

    config = {
    }

    methods = {
        // tapHandle(id){
        //     wepy.navigateTo({
        //         url:'/pages/goods_detail/index?goods_id='+id
        //     })
            
        // },
        //敲搜索按钮或回车时候触发
        onSearch(){
            if(this.value.trim() == '') return this.suggestList = []
            //搜索历史保存到本地 前十条进行存储
            if(this.historyList.indexOf(this.value) === -1){
                this.historyList.unshift(this.value)
            }
            this.historyList.unshift(this.value)
            wepy.setStorageSync('historyList',this.historyList)
            wepy.navigateTo({
              url: '/pages/goods_list/index?query='+this.value
            })
        },
        //输入框发生变化
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
    onLoad(){
        this.historyList = wepy.getStorageSync('historyList') || []
    }
}

