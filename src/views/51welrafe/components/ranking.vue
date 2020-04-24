<template>
  <div class="ranking">
    <div class="title">排行榜统计截至5月5日</div>
    <!-- 前三名 -->
    <div class="top3">
      <div class="item" v-for="(item, index) in top3List" :key="index">
        <div class="avatar">
          <img v-if="item.profilePhoto" src="" alt="">
          <img v-else src="../img/img_photo.png" alt="">
        </div>
        <div class="name">{{item.nickname}}</div>
        <div class="seal">{{item.totalNum}}</div>
        <div class="award-name">{{item.awardsName}}</div>
        <div class="award-img"></div>
      </div>
    </div>
    <!-- 后N名 -->
    <div class="list" >
      <div class="my-ranking">
        <div class="rank">
          <p class="key">我的排名</p>
          <p class="value">{{ranking.myRank}}</p>
          <div class="line"></div>
        </div>
        <div class="seal">
          <p class="key">累计图章数</p>
          <p class="value">{{ranking.totalNum}}</p>
          <div class="line"></div>
        </div>
        <div class="award">
          <p class="key">当前奖励</p>
          <p class="value">{{ranking.currentAwards}}</p>
        </div>
      </div>
      <div class="other-ranking">
        <div class="list-nav">
          <div class="rank item">排名</div>
          <div class="nick-name item">玩家昵称</div>
          <div class="seal item">图章数+更新时间</div>
          <div class="award item">当前奖励</div>
        </div>
        <div class="list-wrap">
          <div class="item" v-for="(item, index) in otherList" :key="index">
            <div class="rank">
              <div class="num">{{item.rank}}</div>
            </div>
            <div class="nick-name">{{item.nickname}}</div>
            <div class="seal">
              <p>{{item.totalNum}}个</p>
              <p>{{item.updateTime}}</p>
            </div>
            <div class="award">{{item.awardsName}}</div>
          </div> 
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import Loading from '@/components/common/loading'
import Services from '../services/services'
import _get from 'lodash.get'
export default {
  name: 'ranking',
  data: () => ({
    rankingList: [],
    ranking: {}
  }),
  components: {
    Loading
  },
  computed: {
    top3List () {
      let rankingList = [...this.rankingList]
      return rankingList.splice(0,3)
    },
    otherList () {
      let rankingList = [...this.rankingList]
      return rankingList.splice(3)
    }
  },
  methods: {
    _getRanking () {
      Services.getRanking().then(res => {
        const {code} = _get(res, 'data')
        if(code == 200) {
          this.rankingList = _get(res, 'data.data.rankList', [])
          this.ranking = _get(res, 'data.data', {})
        }
      })
    }
  },
  mounted () {
    this._getRanking()
  }
}
</script>
<style lang="less" scoped>
.ranking {
  .title {
    color: #fff;
    text-align: center;
    font-weight: bold;
  }
  .top3 {
    display: flex;
    justify-content: space-between;
    padding: 0 .3rem;
    .item {
      position: relative;
      width: 1.9rem;
      height: 4.53rem;
      .avatar {
        width: 1rem;
        height: 1rem;
        img {
          vertical-align: top;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .list {
    margin: 0 auto .3rem;
    width: 6.68rem;
    height: 7.46rem;
    background: url(../img/content3-bg.png) no-repeat center top;
    background-size: 100% 100%;
    .my-ranking {
      padding-top: 1.18rem;
      display: flex;
      justify-content: center;
      text-align: center;
      .key {
        margin-bottom: .1rem;
        font-size: .2rem;
        color: #03488A;
        font-weight: bold;
      }
      .value {
        font-size: .24rem;
        color: #FEE756;
        font-weight: bold;
      }
      .line {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translate(0, -50%);
        height: .45rem;
        width: 1px;
        background: #0C54AB;
      }
      .rank {
        position: relative;
        width: 2.03rem;
      }
      .seal {
        position: relative;
        width: 2.32rem;
      }
      .award {
        width: 2.33rem;
      }
    }
    .other-ranking {
      margin-top: .4rem;
      padding: 0 .4rem;
      .list-nav {
        display: flex;
        justify-content: center;
        color: #023D94;
        font-size: .18rem;
        font-weight: bold;
        .item {
          border-right: 1px solid #0948B3;
          &:last-child {
            border: none;
          }
        }
        .rank {
          width: .73rem;
        }
        .nick-name {
          text-align: center;
          width: 2rem;
        }
        .seal {
          text-align: center;
          width: 2.5rem;
        }
        .award {
          text-align: center;
          width: 2.26rem;
        }
      }
      .list-wrap {
        padding-top: .2rem;
        height: 4.6rem;
        overflow-x: hidden;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        .item {
          display: flex;
          justify-content: center;
          align-items: center;
          height: .68rem;
          color: #FFFFFF;
          font-size: .2rem;
          border-bottom: 1px solid #E2C5D0;
          &:nth-child(1) {
            .rank .num {background: #FEE756;}
          }
          &:nth-child(2) {
            .rank .num {background: #FF9C60;}
          }
          &:nth-child(3) {
            .rank .num {background: #D255E1;}
          }
          .rank {
            padding-left: .1rem;
            width: .73rem;
            .num {
              width: .35rem;
              height: .35rem;
              text-align: center;
              line-height: .35rem;
              color: #FFFFFF;
              border-radius: 50%;
            }
          }
          .nick-name {
            text-align: center;
            width: 2rem;
          }
          .seal {
            text-align: center;
            width: 2.5rem;
            p{
              &:last-child {
                color: #9FE6F7;
              }
            }
          }
          .award {
            text-align: center;
            width: 2.26rem;
          }
        }
      }
    }
  }
}
</style>
