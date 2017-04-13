/* globals Vue */
(function () {
  var Filter = {};
  Filter.install = (Vue)=>{
    Vue.filter('cutTwo', function (value) {
      const  length = value.length;
      return value.slice(length-2,length);
    });

    Vue.filter('dealType', function (value) {
      const  count = parseInt(value);
      switch (count){
        case 1:  return '待处理';
        case 2:  return '处理中';
        case 3:  return '暂停中';
        case 4:  return '已延迟';
        case 5:  return '已取消';
        case 6:  return '已完成';
      }
    });
    Vue.filter('prioriName', function (value) {
      const  count = parseInt(value);
      switch (count){
        case 1:  return '低';
        case 2:  return '普通';
        case 3:  return '高';
        case 4:  return '紧急';
        case 5:  return '立刻';
      }
    });
  };
  module.exports =  Filter;
})();
