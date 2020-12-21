<template>
  <!-- 加上一个判断防止数据未请求过来就显示 -->
  <!-- 利用插件 -->
  <scroll-view
    v-if="recommend.length > 0"
    scroll-y
    class="homecommend"
    @scrolltolower="touchBottom"
    lower-threshold="50"
  >
    <!-- 推荐开始 -->
    <view class="recommend-box">
      <navigator
        class="recommend-item"
        v-for="item in recommend"
        :key="item.id"
        :url="`/pages/album/index?id=5e5cf679e7bce739db1281e4`"
      >
        <image mode="widthFix" :src="item.thumb"></image>
      </navigator>
    </view>
    <!-- 推荐结束 -->
    <!-- 月份开始 -->
    <view class="monthes_box">
      <view class="monthes_title">
        <view class="monthes_title_info">
          <view class="monthes_info">
            <text> {{ monthes.DD }} / </text>
            {{ monthes.MM }} 月
          </view>
          <view class="monthes_text"> {{ monthes.title }} </view>
        </view>
        <view class="monthes_title_more">更多 > </view>
      </view>
      <view class="monthes_content">
        <view
          class="monthes_item"
          v-for="(item, index) in monthes.items"
          :key="item.id"
        >
          <go-detail :list="monthes.items" :index="index">
            <!-- aspectfill保持纵横比,src那里是采用表达式 -->
            <image
              mode="aspectFill"
              :src="item.thumb + item.rule.replace('$<Height>', 360)"
            ></image>
          </go-detail>
        </view>
      </view>
    </view>
    <!-- 月份结束 -->
    <!-- 热门 开始 -->
    <view class="hots_wrap">
      <view class="hots_title">
        <text> 热门 </text>
      </view>
      <view class="hots_content">
        <view class="hot_item" v-for="(item, index) in hot" :key="item.id">
          <go-detail :list="hot" :index="index">
            <image mode="widthFix" :src="item.thumb"></image>
          </go-detail>
        </view>
      </view>
    </view>
    <!-- 热门 结束 -->
  </scroll-view>
</template>

<script>
import goDetail from "@/components/goDetail";

import moment from "moment";
export default {
  components: {
    goDetail,
  },
  data() {
    return {
      recommend: [],
      monthes: {},
      hot: [],
      params: {
        // 获取几条
        limit: 30,
        // 关键字
        order: "hot",
        // 跳过几条,
        skip: 0,
      },
      // 判断hot是否还是下一页
      hasmore: true,
    };
  },
  // 组件中能用的生命周期函数不多,是不完全的
  mounted() {
    this.getList();
  },
  methods: {
    // 触底事件
    touchBottom() {
      // 修改参数 skip+=limit
      // 重新发送请求 getList()
      // 请求回来 hots的数据叠加
      if (this.hasmore) {
        this.params.skip += this.params.limit;
        this.getList();
      }
    },
    // 获取接口数据
    getList() {
      this.request({
        url: "http://157.122.54.189:9088/image/v3/homepage/vertical",
        data: this.params,
      }).then((res) => {
        if (this.recommend.length == 0) {
          // t推荐数据
          this.recommend = res.res.homepage[1].items;
          // 月份数据
          this.monthes = res.res.homepage[2];
          // 使用时间戳插件moment.js
          this.monthes.MM = moment(this.monthes.stime).format("MM");
          this.monthes.DD = moment(this.monthes.stime).format("DD");
          // console.log("这是图片规则" + this.monthes.items[0].rule);
        }
        // 热门数据,因为会请求多次，所以采用es6的拼接方式
        this.hot = [...this.hot, ...res.res.vertical];
        if (res.res.vertical == 0) {
          this.hasmore = false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.homecommend {
  height: calc(100vh - 36px);
}
.recommend-box {
  display: flex;
  flex-wrap: wrap;
  .recommend-item {
    width: 50%;
    border: 3rpx solid rgb(255, 255, 255);
  }
}
.monthes_box {
  .monthes_title {
    display: flex;
    justify-content: space-between;
    padding: 20rpx;
    .monthes_title_info {
      color: $color;
      font-size: 30rpx;
      font-weight: 600;
      display: flex;
      .monthes_info {
        text {
          font-size: 36rpx;
        }
      }
      .monthes_text {
        font-size: 34rpx;
        color: #666;
        margin-left: 30rpx;
      }
    }
    .monthes_title_more {
      font-size: 30rpx;
      font-weight: bold;
      color: $color;
    }
  }
  .monthes_content {
    display: flex;
    flex-wrap: wrap;
    .monthes_item {
      width: 33.33%;
      border: 5rpx solid #fff;
    }
  }
}
.hots_wrap {
  .hots_title {
    padding: 20rpx;
    text {
      border-left: 20rpx solid $color;
      padding-left: 20rpx;
      font-size: 34rpx;
      font-weight: 600;
    }
  }
  .hots_content {
    display: flex;
    flex-wrap: wrap;
    .hot_item {
      width: 33.33%;
      border: 5rpx solid #fff;
    }
  }
}
</style>