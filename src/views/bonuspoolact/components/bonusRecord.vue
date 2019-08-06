<template>
  <div class="pop-window">
    <div class="bonus-record" v-if="bonusListData.length">
      <div class="title">昵称</div>
      <div class="title">获取时间</div>
      <div class="title">奖励详情</div>
      <div class="content">
        <scroll :data="bonusListData" @scrolltouchend="scrolltouchend" ref="scroll" :beforeScroll="true" :listenScroll="true" :probeType="3">
          <ul>
            <li v-for="item in bonusListData">
              <div style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width: 2rem">{{item.nickName||''}}
              </div>
              <div style="width: 3rem;text-align: center;">{{item.receiveTime||''}}</div>
              <div style="width: 2rem;text-align: right;">{{item.awardsName||''}}</div>
            </li>
          </ul>
        </scroll>
      </div>
    </div>
    <div class="record-null" v-else>
      <img src="../images/empty_record.png" alt="">
      <div class="text">无记录</div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import scroll from './scroll'

  export default {
    data(){
      return {
        currentPage:1,
        bonusListData:[]
      }
    },
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    components: {
      scroll
    },
    methods:{
      scrolltouchend(position, maxScrollY) {
        if (position.y > 30) {
          setTimeout(() => {
            this.currentPage = 1
            this.bonusListClick()
            this.$refs.scroll && this.$refs.scroll.refresh();
          }, 100);
        } else if (position.y < (maxScrollY - 30)) {
          setTimeout(() => {
            this.currentPage++
            this.bonusListClick()
            this.$refs.scroll && this.$refs.scroll.refresh();
          }, 100);
        }
      },
      async bonusListClick() {//红包记录
        try {
          const res = await this.axios.post('//ops-api.beeplaying.com/ops/api/jackpot/getWinningRecord', {
            page: this.currentPage,
            pageSize: 500
          })
          if (res.data.code == 200 && res.data.data) {
            if(res.data.data.length==0){
              this.currentPage=this.currentPage-1||1
              return
            }
            this.bonusListData =this.bonusListData.concat(res.data.data)
          }
        } catch (e) {

        }
      },
    },
    mounted(){
      this.bonusListData=this.data
    }
  }
</script>
<style lang="less" scoped>
  .pop-window {
    position: relative;
    z-index: 11;
    width: 100%;
    height: 100%;
    min-height: 100%;
    max-height: 100%;
    .pop-close {
      width: 0.68rem;
      height: 0.68rem;
      position: absolute;
      right: -0.34rem;
      top: -0.34rem;
    }
  }

  .pop-mask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .7);
    z-index: 10;
  }

  .bonus-record {
    position: absolute;
    z-index: 11;
    left: 0;
    right: 0;
    height: 4rem;

    .title {
      font-size: .24rem;
      font-weight: 400;
      color: rgba(236, 244, 255, 1);
      position: absolute;
      &:nth-child(1) {
        left: 0;
      }
      &:nth-child(2) {
        left: 2.08rem;
      }
      &:nth-child(3) {
        right: 0;
      }
    }
    .content {
      position: absolute;
      height: 4rem;
      top: .34rem;
      left: 0rem;
      right: 0;
      font-size: .18rem;
      font-weight: 400;
      color: rgba(255, 227, 166, 1);
      overflow: hidden;
      ul {
        margin-top: .1rem;
        display: flex;
        flex-direction: column;
        li {
          display: flex;
          justify-content: space-between;
          margin-bottom: .2rem;
          line-height: .2rem;
        }
      }
    }
    .close {
      position: absolute;
      left: 2.63rem;
      bottom: -.9rem;
      width: .57rem;
      height: .57rem;
      background: url("../images/close.png");
      background-size: 100% 100%;
      font-size: .37rem;
      font-weight: bold;
      color: rgba(194, 38, 13, 1);
    }
  }

  .record-null {
    height: 3.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    img {
      width: 1.27rem;
      height: 1.27rem;
    }
    .text {
      font-size: .5rem;
      font-weight: 400;
      color: rgba(169, 21, 40, 1);
    }
  }
</style>
