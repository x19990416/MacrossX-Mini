//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    modal_dataSource: [{
      lable: 'text',
      name: 'text',
      value:'123',
      placeholder: '请输入',
      type: 'text',
      format: function(input) {
        console.log(input);
        return 'output'
      },
      check: function(data) {
        console.log('check input>>>',data);
        return true
      }
    }, {
        lable: 'selector',
        name: 'selector',
        value:'0',
        range: ['123','345','780'],
        placeholder: '请输入',
        type: 'selector',
        format: function (input) {
          console.log(input);
          return 'output'
        },
        check: function (data) {
          console.log('check selector>>>', data);
          return true
        }
      }, {
        lable: 'date',
        name: 'date',
        value: '1987-01-01',
        range:['2015-09-01','2017-09-01'],
        placeholder: '请输入',
        type: 'date',
        format: function (input) {
          console.log(input);
          return 'output'
        },
        check: function (data) {
          console.log('check date>>>',data);
          return true
        }
      }, {
        lable: 'textarea',
        name: 'textarea',
        value: '0',
        placeholder: '请输入',
        type: 'textarea',
        format: function (input) {
          console.log(input);
          return 'output'
        },
        check: function (data) {
          console.log('check selector>>>', data);
          return true
        }
      }]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {

    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  showModal: function(e) {
    console.log(e);
    this.setData({
      modalVisible: true
    })
  },

  onSubmit: function(e){
    console.log('onsubmit>>>>>',e)
  }

})