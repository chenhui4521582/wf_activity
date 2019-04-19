<template>
  <div class="ranking-list">
    <img class="bg" src="../images/ranking-bg.png" alt="" />
    <div class="list-body">
      <div class="title">
        * 幸运分可以通过玩游戏获得，游戏奖励1金叶子=1幸运分。幸运分越高，游戏奖励越丰厚哦！
      </div>
      <div class="container">
        <div class="list-nav">
          <ul>
            <li :class="{current: currentIndex == 0}" @click="switchTab(0)">当前排行榜</li>
            <li :class="{current: currentIndex == 1}" @click="switchTab(1)">奖励说明</li>
          </ul>
        </div>
        <div class="list-container">
          <div class="list" v-show="currentIndex == 0">
            <div class="nav" v-show="showRankingList">
              <div class="ranking">名次</div>
              <div class="nick-name">昵称</div>
              <div class="integral">幸运分</div>
              <div class="price-name">奖励</div>
            </div>
            <div class="content ranking-wrapper" ref="listContent" v-show="showRankingList">
              <ul>
                <li v-for="item in rankingList" :key="item.index">
                  <div class="ranking">
                    <img src="../images/one-icon.png" alt="" v-if="item.index == 1">
                    <img src="../images/two-icon.png" alt="" v-else-if="item.index == 2">
                    <img src="../images/three-icon.png" alt="" v-else-if="item.index == 3">
                    <span v-else>{{item.index}}</span>
                  </div>
                  <div class="nick-name">{{item.nickName}}</div>
                  <div class="integral">{{item.score}}</div>
                  <div class="price-name">{{item.awardsName}}</div>
                </li>
              </ul>
            </div>
            <div class="nodata" v-show="!showRankingList">
              <img src="../images/nodeta.png" alt="">
              <p>敬请期待</p>
            </div>
          </div>
          <div class="price" v-show="currentIndex == 1" >
            <div class="price-wrapper" ref="priceContent" v-show="showAwards">
              <div class="kuang">
                <div class="price-title">
                  <div class="one">
                    <p class="num">{{awardsList[0] && awardsList[0].awardsAmount || ''}}</p>
                    <p class="type">{{awardsList[0] && awardsList[0].awardsType || ''}}</p>
                  </div>
                  <div class="two">
                    <p class="num">{{awardsList[1] && awardsList[1].awardsAmount || ''}}</p>
                    <p class="type">{{awardsList[1] && awardsList[1].awardsType || ''}}</p>
                  </div>
                  <div class="three">
                    <p class="num">{{awardsList[2] && awardsList[2].awardsAmount || ''}}</p>
                    <p class="type">{{awardsList[2] && awardsList[2].awardsType || ''}}</p>
                  </div>
                </div>
                <ul>
                  <li v-for="(item, index) in awardsList" :key="index" v-if="index>2">
                    <span>第{{index + 1}}名</span>
                    <span>{{item.awardsName}}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="nodata" v-if="!showAwards">
              <img src="../images/nodeta.png" alt="">
              <p>敬请期待</p>
            </div>
            <div class="mask" v-if="showAwards"></div>
          </div>
        </div>
      </div>
      <div class="my-ranking" v-show="showMyRanking">
        <div class="content">
          <div class="ranking">
            <img src="../images/one-icon.png" alt="" v-if="myRanking.index == 1">
            <img src="../images/two-icon.png" alt="" v-else-if="myRanking.index == 2">
            <img src="../images/three-icon.png" alt="" v-else-if="myRanking.index == 3">
            <span v-else>{{myRanking.index}}</span>
          </div>
          <div class="nick-name">{{myRanking.nickName}}</div>
          <div class="integral">{{myRanking.score}}</div>
          <div class="price-name">{{myRanking.awardsName}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
	name: 'rankingList',
    props: ['timeId'],
    data: () => ({
	  currentIndex: 0,
	  myRanking: {},
	  rankingList: [],
      awardsList:[],
      awardsLock: false,
      rankingLock: false,
      rankingParams: {
	    page:1,
        pageSize:10
      },
      awardsParams: {
		page:1,
		pageSize:10
      },
      awardTimer: null,
      rankingTimer: null
    }),
    computed: {
	  showRankingList () {
		return this.rankingList.length
	  },
	  showAwards () {
		return this.awardsList.length
	  },
      showMyRanking () {
	    return this.myRanking.awardsName && this.myRanking.nickName  && this.myRanking.index && this.currentIndex == 0
      }
    },
    methods: {
	  getRankingList () {
		let url = '//ops-api.beeplay123.com/ops/api/hoursRanking/getRankingList'
		this.axios.post(url, this.rankingParams).then(res => {
		  let {myRanking = {}, rankingList = []} = res.data.data
		  this.myRanking = myRanking
		  this.rankingList = this.rankingList.concat(rankingList)
		  if(rankingList.length == 10) {
			this.awardsLock = false
		  }
		  if(rankingList.length) {
			this.initRankingListScroll()
          }
		})
	  },
      getOldRankingList () {
		let url = '//ops-api.beeplay123.com/ops/api/hoursRanking/getRankingHistoryList'
		this.axios.post(url, this.rankingParams).then(res => {
		  let {myRanking = {}, rankingList = []} = res.data.data
		  this.myRanking = myRanking
		  this.rankingList = this.rankingList.concat(rankingList)
		  if(rankingList.length == 10) {
			this.awardsLock = false
		  }
		  if(rankingList.length) {
			this.initRankingListScroll('oldRanking')
		  }
		})
      },
	  getAwardsList () {
		let url = '//ops-api.beeplay123.com/ops/api/hoursRanking/getAwardsList'
		this.axios.post(url, this.awardsParams).then(res => {
          this.awardsList = this.awardsList.concat(res.data.data)
          if(res.data.data.length == 10) {
			this.awardsLock = false
          }
		  if(res.data.data.length) {
			this.initAwardsScroll()
		  }
        })
	  },
      initRankingListScroll (type) {
		this.$nextTick(function () {
		  if(!this.rankingScroll) {
			this.rankingScroll = new BScroll(this.$refs.listContent, {probeType: 3})
			this.rankingScroll.on('scroll', page => {
			  if(this.rankingTimer){
				clearTimeout(this.rankingTimer)
			  }
			  this.rankingTimer = setTimeout(() => {
				let height = document.querySelector('.ranking-wrapper ul').clientHeight
				let boxHeight = document.querySelector('.ranking-wrapper').clientHeight
				let endPosition = height-boxHeight;
				if(Math.abs(Math.round(page.y)) >= endPosition) {
				  if(this.rankingLock) return false
				  this.rankingLock = true
				  this.rankingParams.page += 1;
				  if(type == 'oldRanking'){
				    this.getOldRankingList()
                  }else{
					this.getRankingList()
                  }
				}
			  },30)
			})
		  }else{
			this.rankingScroll.finishPullUp()
			this.rankingScroll.refresh()
          }
		})
      },
      initAwardsScroll () {
		this.$nextTick(function () {
		  if(!this.AwardsScroll){
			this.AwardsScroll = new BScroll(this.$refs.priceContent, {
			  probeType: 3
			})
			this.AwardsScroll.on('scroll', page => {
              if(this.awardTimer){
                clearTimeout(this.awardTimer)
              }
			  this.awardTimer = setTimeout(() => {
                let height = document.querySelector('.price-wrapper').clientHeight
                let boxHeight = document.querySelector('.price-wrapper .kuang').clientHeight
                let endPosition = height-boxHeight;
				if(Math.abs(Math.round(page.y)) >= endPosition) {
				  if(this.awardsLock) return false
				  this.awardsLock = true
				  this.awardsParams.page += 1;
				  this.getAwardsList()
				}
			  },30)
			})
          }else{
			this.AwardsScroll.finishPullUp()
			this.AwardsScroll.refresh()
          }
		})
      },
	  switchTab (index) {
		this.currentIndex = index
		this.initAwardsScroll()
		this.initRankingListScroll()
	  },
    },
    created () {
      this.getRankingList()
      this.getAwardsList()
    },
    watch: {
	  timeId () {
		this.rankingList = []
        this.rankingLock = false
		this.rankingScroll = null
	    if (this.timeId == 'now') {
		  this.rankingParams = { page:1, pageSize:10 }
		  this.getRankingList()
        }
	    else if (this.timeId == 'future') {
		  this.myRanking = []
        } else {
		  this.rankingParams = { page:1, pageSize:10, timelineId: this.timeId }
		  this.getOldRankingList()
        }
      }
    }
  }
</script>

<style scoped lang="less">
.ranking-list {
  position: relative;
  min-height: 5.37rem;
  .bg {
    width: 100%;
    vertical-align: top;
  }
  .list-body {
    position: absolute;
    width: 100%;
    height: 5.35rem;
    top: 0;
    left: 0;
    z-index: 2;
    padding-top: .5rem;
    box-sizing: border-box;
    .title {
      padding: 0 .72rem 0 .75rem;
      margin-bottom: .08rem;
      font-size: .18rem;
      color: #321B12;
      line-height: .3rem;
    }
    .container {
      padding: 0 .72rem 0 .75rem;
      .list-nav {
        border-radius: 6px 6px 0 0;
        overflow: hidden;
        background: #E0B58A;
        ul {
          display: flex;
          justify-content: center;
          li {
            width: 50%;
            height: .6rem;
            line-height: .6rem;
            font-size: .3rem;
            color: #E0B58A;
            text-align: center;
            background: #54362B ;
            &:first-child {
              border-radius: 6px 0  0 6px;
            }
            &:last-child {
              border-radius: 0 6px 6px 0;
            }
            &.current {
              background: #E0B58A ;
              color: #3B251D;
            }
          }
        }
      }
      .list-container {
        overflow: hidden;
        background: #E0B58A;
        height: 3.45rem;
        .list {
          padding: 0 .16rem 0 .19rem;
          box-sizing: border-box;
          .nav {
            display: flex;
            justify-content: flex-start;
            height: .57rem;
            line-height: .57rem;
            text-align: center;
            font-size: .2rem;
            color: #3B251D;
            border-bottom: 1px solid #C69E76;
            .ranking {
              text-align: left;
              width: 10%;
            }
            .nick-name {
              width: 35%;
            }
            .integral {
              width: 25%;
            }
            .price-name {
              width: 30%;
            }
          }
          .content {
            height: 2.34rem;
            overflow: hidden;
            ul {
              li {
                display: flex;
                justify-content: flex-start;
                height: .57rem;
                line-height: .57rem;
                text-align: center;
                font-size: .2rem;
                color: #3B251D;
                border-bottom: 1px solid #C69E76;
                .ranking {
                  width: 10%;
                  img {
                    margin: .095rem 0 0 0.09rem;
                    display: block;
                    width: .27rem;
                    height: .38rem;
                  }
                }
                .nick-name {
                  width: 35%;
                }
                .integral {
                  width: 25%;
                }
                .price-name {
                  width: 30%;
                }
              }
            }
          }
          .nodata{
            height: 2.8rem;
            overflow: hidden;
            img {
              display: block;
              margin: .69rem auto .34rem;
              width: .99rem;
              height: .99rem;
            }
            p {
              text-align: center;
              color: #A37056;
              font-size: .3rem;
            }
          }
        }
        .price {
          position: relative;
          background: #E0B58A;
          height: 3.5rem;
          padding: 0 .16rem 0 .19rem;
          .price-wrapper {
            height: 3.5rem;
          }
          .price-title {
            padding: .33rem 0 .4rem;
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #C69E76;
            .one {
              margin-top: .24rem;
              width: 1.47rem;
              height: 1.3rem;
              background: url("../images/price-two.png") no-repeat center top / 100% 100%;
              .num {
                margin: .26rem 0 .12rem;
                font-size: .36rem;
                color: #AA7559;
                width: 1.32rem;
                height: .6rem;
                line-height: .6rem;
                text-align: center;
              }
              .type {
                font-size: .2rem;
                color: #E0B58A;
                width: 1.4rem;
                height: .32rem;
                line-height: .32rem;
                text-align: center;
              }
            }
            .two {
              width: 1.86rem;
              height: 1.61rem;
              background: url("../images/price-one.png") no-repeat center top / 100% 100%;
              .num {
                margin: .41rem 0 .26rem;
                font-size: .36rem;
                color: #AA7559;
                width: 1.3rem;
                height: .6rem;
                line-height: .6rem;
                text-align: center;
              }
              .type {
                font-size: .24rem;
                color: #E0B58A;
                width: 1.6rem;
                height: .32rem;
                line-height: .32rem;
                text-align: center;
              }
            }
            .three {
              margin-top: .28rem;
              width: 1.49rem;
              height: 1.26rem;
              background: url("../images/price-three.png") no-repeat center top / 100% 100%;
              .num {
                margin: .23rem 0 .1rem;
                font-size: .36rem;
                color: #AA7559;
                height: .6rem;
                width: 1.3rem;
                line-height: .6rem;
                text-align: center;
              }
              .type {
                font-size: .2rem;
                color: #E0B58A;
                width: 1.4rem;
                text-align: center;
                height: .32rem;
                line-height: .32rem;
              }
            }
          }
          ul {
            li {
              display: flex;
              justify-content: space-between;
              color: #3B251D;
              font-size: .2rem;
              height:.58rem;
              line-height: .58rem;
              border-bottom: 1px solid #C69E76;
            }
          }
          .mask {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: .29rem;
            background-image: linear-gradient(rgba(255,255,255,0) 0%,#fff 150%);
          }
          .nodata{
            height: 2.8rem;
            overflow: hidden;
            img {
              display: block;
              margin: .69rem auto .34rem;
              width: .99rem;
              height: .99rem;
            }
            p {
              text-align: center;
              color: #A37056;
              font-size: .3rem;
            }
          }
        }
      }
    }
    .my-ranking {
      padding: 0 .33rem 0 .39rem;;
      position: absolute;
      left: 50%;
      bottom: .09rem;
      transform: translate(-50%, 0);
      width: 6.11rem;
      height: .58rem;
      background: #CE7C2C;
      box-sizing: border-box;
      .content {
        display: flex;
        justify-content: flex-start;
        line-height: .58rem;
        text-align: center;
        font-size: .2rem;
        color: #fff;
        .ranking {
          width: 10%;
          img {
            margin: .095rem 0 0 0.09rem;
            display: block;
            width: .27rem;
            height: .38rem;
          }
        }
        .nick-name {
          width: 35%;
        }
        .integral {
          width: 25%;
        }
        .price-name {
          width: 30%;
        }
      }
    }
  }
}
</style>
