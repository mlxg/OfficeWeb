<!-- 流程中心 --- 新建流程 -->
<style lang="less">
  .new-process{
    border-top: 1px solid #e5e5e5;
    .process-item{
      float:left;width:100%;
      padding:10px 0;
      dt{
        width:100%;
        border-bottom:3px solid #e4e4e4;
        h1{
          display: inline-block;
          padding:5px;
          margin-bottom:-3px;
          font-size:24px;
        }
      }
      dd{
        width:200px;
        height: 80px;
        line-height: 80px;
        text-align: center;
        padding: 0;
        display: inline-block;
        background-color: #f9fafb;
        border: 1px solid #cdcdcd;
        margin: 20px 2%;
        box-shadow: 1px 1px 3px rgba(0,0,0,.15);
        > a{
          display: block;
          height: 100%;
          width: 100%;
          font-size:14px;
          color:#24478E;
          background: 5px center/ 50px 50px no-repeat;
          padding-left: 50px;
          &.hire{
            background-image: url(../../images/hire.png);
          }
          &.entry{
            background-image: url(../../images/entry.png);
          }
          &.recruit{
            background-image: url(../../images/recruit.png);
          }
          &.pos{
            background-image: url(../../images/pos.png);
          }
          &.tover{
            background-image: url(../../images/tover.png);
          }
          &.hrchange{
               background-image: url(../../images/hrchange.png);
           }
          &.dismissal{
               background-image: url(../../images/disapproval.png);
           }
          &.reimbursement{
             background-image: url(../../images/reimburse.png);
           }
          &.loan{
             background-image: url(../../images/loan.png);
           }
          &.unusual{
             background-image: url(../../images/unusual.png);
           }
          &.leave{
             background-image: url(../../images/leave.png);
           }
          &.overtime{
             background-image: url(../../images/overtime.png);
           }
        }
      }
      .personnel{border-bottom:3px solid #166ca5;}
      .finance{border-bottom:3px solid #953735;}
      .administration{border-bottom:3px solid #f99d52;}
    }
  }
</style>
<template>
    <crumb t-name="新建流程"></crumb>
    <section class="new-process">
        <ul class="clearfix">
            <li class="process-item" v-for="item in newProcess">
                <dl>
                    <dt>
                      <h1 class="personnel">{{item.name}}</h1>
                    </dt>
                    <dd v-for="obj in item.childerMenu">
                        <a v-link="{path:$route.path + obj.route + '/' + obj.processId, replace: true}" :class="obj.route | className">{{obj.name}}</a>
                    </dd>
                </dl>
            </li>
        </ul>
    </section>
</template>

<script>
    import Crumb from '../../components/public/PublicCrumb.vue'
    import { getData } from '../../actions/newProcessAction'
    import { getMenus, getUrl, getRoute } from '../../getters/newProessGetter'
    import { getSubMenus } from '../../getters/headNavbarGetter'
    export default{
        components: {
            Crumb
        },
        ready: function () {
            this.getData();
        },
        vuex: {
            getters: {
                newProcess: getMenus,
                url: getUrl,
                route: getRoute,
                subMenus: getSubMenus
            },
            actions: {
                getData
            }
        },
        watch: {
            subMenus: function () {
                this.getData();
            }
        },
        filters: {
          className: function (route) {
            return route.match(/\/(hr|finance)\/(\w+)/)[2]
          }
        }
    }
</script>
