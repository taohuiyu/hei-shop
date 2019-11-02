import wepy from 'wepy'

export default class Home extends wepy.mixin {
  data = {
    swiperData: [], //轮播图数据
    cateData: [] //分类数据
  };

  config = {};

  methods = {};
  //获取轮播图的数据
  async getSwiperData() {
    const { data } = await wepy.get('/home/swiperdata')
    // console.log(data)
    // 如果状态码不等于200，就不保存在本地
    if (data.meta.status !== 200) {
      return wepy.baseToast('获取数据失败')
    }
    //如果状态码等于200，就获取数据
    wepy.baseToast('获取数据成功','success')
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
  //页面一刷新获取数据
  onLoad() {
    this.getSwiperData(); //轮播图
    this.getCateData(); //分类
  }
}
