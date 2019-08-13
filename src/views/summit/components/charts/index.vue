<template lang="html">
    <div class="bgcharts">
        <div class='header img-config'>
           <ul>
                <li>排名</li>
                <li>用户名</li>
                <li>购买数量</li>
                <li>获得奖励</li>
            </ul>
        </div>
        <div class='count img-config'>
            <ul>
              <template v-if="userObj">
                <li v-for="(item,idx) in userObj.top" :key="idx">
                    <span>
                        {{idx+1}}
                    </span>
                  <span>
                        {{item.nickName}}
                    </span>
                  <span>
                        {{item.goodsNum}}
                    </span>
                  <span>
                        {{idx < 3 ? '金宝箱' : ''}}
                    </span>
                </li>
              </template>
            </ul>
            <div class="tips buy">
                您已购买宝箱 {{userObj&&userObj.amount||0}} 个
            </div>
            <div class="tips">
                活动期间购买宝箱≥{{userObj&&userObj.minGoodsNum}}个即可上榜！
            </div>
        </div>
        <div class='foot img-config'>
            <div class='sum' v-on:click="backsum">
                继续冲顶 >>
            </div>
        </div>

    </div>
</template>

<script>

export default {
    data(){
        return{
            userObj:{}
        }
    },
    mounted(){
        let that = this;

        this.axios.get('//ops-api.beeplaying.com/ops/api/summit/topThree',{}).then(data=>{
            that.userObj = data.data.data;
        })
    },
    methods:{
        backsum(){
            this.$emit('closeCharts')
        }
    }
}
</script>

<style lang="less" scoped>
  .bgcharts{
    position: absolute;
    width: 6.2rem;
    height: 8.85rem;
    top: 1.76rem;
    left: 50%;
    margin-left: -3.1rem;
    z-index: 19;
    .header{
      height: 0.62rem;
      background-image: url('../../images/chart-head.png');
      ul {
        height: 0.64rem;
        line-height: 0.64rem;
        display: flex;
        align-items: center;
        border-radius: 0.06rem  0.06rem 0 0;
        li {
          flex:1;
          text-align: center;
          font-size: 0.24rem;
          color: #F8CF88;
          &:nth-child(2) {
            flex: 0 0 30%;
          };

        }
      }

    }
    .count{
      background-image: url('../../images/chart-count.png');
      height: 6.94rem;
      ul{
        height: 5.4rem;
        overflow: scroll;
        border-bottom: 1px solid #F8924C;
        li {
          display: flex;
          height: 0.6rem;
          line-height: 0.6rem;
          border-bottom: 1px solid #F8924C;
          span {
            flex: 1;
            text-align: center;
            font-size: 0.24rem;
            color: #fff;
            &:nth-child(2) {
              flex: 0 0 30%;
              white-space:nowrap;
              overflow:hidden;
              text-overflow:ellipsis;
            };
          }
        }
      }
      .tips{
        color: #6C3510;
        height: 0.76rem;
        line-height: 0.76rem;
        text-align: center;
      }
      .buy{
        border-bottom: 1px solid #F8924C;
        color: #FFE3D0
      }
    }
    .foot{
      background-image: url('../../images/chart-foot.png');
      height: 0.7rem;
      text-align: center;
      line-height: 0.7rem;
      .sum{
        font-size: 0.24rem;
        color: #fff;
      }
    }
  }

  .img-config{
    background-repeat: no-repeat;
    background-size: 100% 100%;
    padding: 0 0.12rem;
  }
</style>
