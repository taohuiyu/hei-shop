import wepy from 'wepy'

export default class Home extends wepy.mixin {
    data = {
        cateList:[],//分类数据
        secondCate:[]
    }

    config = {
    }

    methods = {
        onChange(e){
            // console.log(e.detail)
            this.secondCate =  this.cateList[e.detail].children
        }
    }
    //获取分类数据列表
    async getCatesList (){
        const {data} = await wepy.get('/categories')
        // console.log(data)
        if(data.meta.status !== 200){
            return wepy.baseToast('获取分类数据失败')
        }
        this.cateList= data.message
        this.secondCate = this.cateList[0].children
        this.$apply()
    }
    onLoad(){
        this.getCatesList()
    }
}

