// components/modal/modal.js

const initData = []


Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dataSource: {
      type: Array,
      value: [],
      observer: function(newVal, oldVal) {
        newVal.forEach(e => {
          if (e.type == 'selector' && !e.index) {
            e.index = 0
          }
        })
        this.setData({
          dataSource: newVal
        })
      }
    },
    visible: {
      type: String,
      value: 'none',
    },
    title:{
      type:String,
      value:'Title'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  ready: function() {
    this.properties.dataSource.forEach(e => {
      initData.push({ ...e
      })
    })

  },

  /**
   * 组件的方法列表
   */
  methods: {
    reset: function(data) {
      this.setData({
        visible: this.data.visible == 'none' ? 'inherit' : 'none',
        dataSource: initData,
      })

    },
    formSubmit: function(data) {
      console.log('>>>>>>>>>>>>>>>>',data.detail)
      let result = this._check(data.detail.value)
      if(result){        
        if (!('false' == this.triggerEvent("submit",data.detail.value))){
          this.reset()
        }
      }      
   
    },
    format: function(data) {
      let node = this._findNode(data)
      if (node && node.format) {
        node.value = node.format(data.detail.value)
        this.setData({
          dataSource: this.properties.dataSource
        })
      }
    },

    pickerChange: function(data) {
      let node = this._findNode(data)      
      if (node && node.range) {
        if (node.type == 'selector') {
          node.index = data.detail.value

        } else if (node.type == 'date') {
          node.value = data.detail.value

        }
        this.setData({
          dataSource: this.properties.dataSource
        })

      }
    },

    _findNode: function(data) {
      for (let i = 0; i < this.properties.dataSource.length; i++) {
        if (this.properties.dataSource[i].name === data.target.id) {
          return this.properties.dataSource[i]
        }
      }
      return undefined
    },
    _check: function(data) {
      let isSuccess = true
      this.properties.dataSource.forEach(e => {
        if (e.check && e.check(data[e.name]) == false) {          
            e.errCss = 'error';
            isSuccess = false          
        }        
      })
      if (!isSuccess){
        this.setData({
          dataSource:this.properties.dataSource
        })
      }
      return isSuccess
    }


  }
})