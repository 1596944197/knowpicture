<template>
  <view id="home">
    <view class="home-title">
      <view class="center">
        <uni-segmented-control
          :current="current"
          :values="items.map((v) => v.title)"
          @clickItem="onClickItem"
          style-type="text"
          active-color="#d4237a"
        ></uni-segmented-control>
      </view>
      <view class="iconfont iconsearch"></view>
    </view>
    <view class="home-content">
      <view v-show="current == 0"><HomeCommend></HomeCommend></view>
      <view v-show="current == 1"><HomeCategory></HomeCategory></view>
      <view v-show="current == 2"><HomeNews></HomeNews></view>
      <view v-show="current == 3"><HomeAlbum></HomeAlbum></view>
    </view>
  </view>
</template>

<script>
import HomeCommend from "./childComponents/homeCommend";
import HomeCategory from "./childComponents/homeCategory";
import HomeNews from "./childComponents/homeNews";
import HomeAlbum from "./childComponents/homeAlbum";
import { uniSegmentedControl } from "@dcloudio/uni-ui";
export default {
  components: {
    HomeCommend,
    HomeCategory,
    HomeNews,
    HomeAlbum,
    uniSegmentedControl,
  },
  // 注意大小写
  onLoad() {
    //http://157.122.54.189:9088/image/v3/homepage/vertical?limit=10&order=hot&skip=2
    // 1.原生的微信小程序
    /* wx.request({
      url:'http://157.122.54.189:9088/image/v3/homepage/vertical?limit=10&order=hot&skip=2',
      success(res){
        console.log(res);
      }
    }) */
    // 2.uni-ui的
    /* uni.request({
      url:'http://157.122.54.189:9088/image/v3/homepage/vertical?limit=10&order=hot&skip=2'
    }).then(res=> console.log(res)) */
    /*  this.request({
      url:'http://157.122.54.189:9088/image/v3/homepage/vertical?limit=10&order=hot&skip=2'
    }).then(res=>{
      console.log(res);
    }) */
  },
  // 使用插件
  data() {
    return {
      items: [
        { title: "推荐" },
        { title: "分类" },
        { title: "最新" },
        { title: "专辑" },
      ],
      current: 0,
    };
  },
  methods: {
    onClickItem(e) {
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex;
        // 修改页面的标题,因为未知原因不能在组件内使用，所以改为在这用
        uni.setNavigationBarTitle(this.items[this.current]);
      }
    },
  },
};
</script>

<style lang="scss">
#home {
  .home-title {
    width: 100%;
    position: relative;
    .center {
      width: 60%;
      margin: 0 auto;
    }
    .iconsearch {
      position: absolute;
      top: 20%;
      right: 6%;
    }
  }
  .homt-content {
  }
}
</style>