import wepy from 'wepy'

export default class Home extends wepy.mixin {
  data = {
    swiperData: [], //轮播图数据
    cateData: [] ,//分类数据
    floorData:[]//楼层
  };

  config = {};

  methods = {
    //点击楼层图片跳转页面获取
    goGoodsDetail(url) {
      console.log(url)
      // console.log("跳转到商品列表页")
      wepy.navigateTo({
        url
      })
    }
  }
  //获取轮播图的数据
  async getSwiperData() {
    const { data } = await wepy.get('/home/swiperdata')
    console.log(data)
    // 如果状态码不等于200，就不保存在本地
    if (data.meta.status !== 200) {
      return wepy.baseToast('获取数据失败')
    }
    //如果状态码等于200，就获取数据
    // wepy.baseToast('获取数据成功','success')
    this.swiperData = data.message;
    //异步赋值就必须使用$apply
    this.$apply();
  }
  //获取分类的数据
  async getCateData() {
    const { data } = await wepy.get('/home/catitems')
    // console.log(data)
    if (data.meta.status !== 200) {
      return wepy.baseToast('获取数据失败')
    }
    // wepy.baseToast('获取数据成功','success')
    this.cateData = data.message;
    this.$apply();
  }
  //获取楼层数据
  async getFlooData(){
      const {data} = await wepy.get("/home/floordata")
      if(data.meta.status !==200){
        return wepy.baseToast('获取楼层数据失败')
      }
      this.floorData = data.message
      this.$apply()
  }
  //页面一刷新获取数据
  onLoad() {
    this.getSwiperData(); //轮播图
    this.getCateData(); //分类
    this.getFlooData()//楼层
  }
}
