export default (params)=>{

  // 加载中效果
  uni.showLoading({
    title:'加载中.....'
  });
  return new Promise((resolve,reject)=>{
    wx.request({
      // 这个params是指url
      ...params,
      success(res){
        resolve(res.data)
      },
      fail(err){
        reject(err)
      },
      // 不管成功或者失败都会执行
      complete(){
        uni.hideLoading()
      }
    })
  })
}