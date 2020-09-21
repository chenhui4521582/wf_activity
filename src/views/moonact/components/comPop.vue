<template>
  <section :class="getClassName('com_pop')" :style="{zIndex:isShowPop?100:99}">
    <div class="pop-mask" v-if="isShowPop&&popType" @touchmove.prevent></div>
    <transition name="scalc">
      <div class="pop" v-if="isShowPop&&popType">
        <div :class="getClassName('wrap')">
          <div :class="getClassName('main')">
            <div class="title_bg">
              <div class="title_txt">
                {{titles[popType-1]}}
              </div>
            </div>
            <div :class="getClassName('container_compop')">
              <template v-if="popType==1">
                <div class="tabs">
                  <div class="item" v-for="(item,index) in tabs" @click="changeTab(index)"
                       :class="{selected:tabIndex==index}">{{item}}
                  </div>
                </div>
                <div class="bonus-record" :class="{empty:!record.length}">
                  <div class="title_items" :class="{tab0:tabIndex==0,tab1:tabIndex==1}">
                    <div class="title">日期</div>
                    <div class="title" v-if="tabIndex==0">获得荷灯</div>
                    <div class="title">奖励</div>
                    <div class="title"></div>
                  </div>
                  <div class="content">
                    <scroll :data="record">
                      <ul>
                        <li v-for="(item,index) in record" :class="{last:record.length-1==index,tab0:tabIndex==0,tab1:tabIndex==1}">
                          <div>{{item.createTime}}</div>
                          <div v-if="tabIndex==0">
                            {{item.amount}}
                          </div>
                          <div v-html="item.awardsName.replace('+','<br>')"></div>
                          <div>
                            <div class="btn" :class="{gray:item.received}" @click="gainAwards(item,tabIndex)">
                              {{item.received?'已领取':'领取'}}
                            </div>
                          </div>
                        </li>
                      </ul>
                    </scroll>
                  </div>
                </div>
              </template>
              <template v-else-if="popType==2">
                <div class="tabs">
                  <div class="item" v-for="(item,index) in tabs" @click="changeTab(index)"
                       :class="{selected:tabIndex==index}">{{item}}
                  </div>
                </div>
                <div class="my_info mine">
                  <div class="title_items mine">
                    <div class="title">我的排名</div>
                    <div class="title">{{tabIndex==0?'今日':'昨日'}}累计荷灯</div>
                    <div class="title">奖励</div>
                  </div>
                  <div class="content mine">
                    <ul>
                      <li>
                        <div>{{allRecord&&allRecord.myRank}}</div>
                        <div>{{allRecord&&allRecord.totalNum}}</div>
                        <div>{{allRecord&&allRecord.currentAwards}}</div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="bonus-record">
                  <div class="title_items">
                    <div class="title">排名</div>
                    <div class="title">昵称</div>
                    <div class="title">{{tabIndex==0?'今日':'昨日'}}累计荷灯</div>
                    <div class="title">奖励</div>
                  </div>
                  <div class="content content_flag2">
                    <scroll :data="allRecord&&allRecord.rankList" ref="scroll">
                      <ul>
                        <li v-for="(item,index) in allRecord&&allRecord.rankList" :class="{last:allRecord&&allRecord.rankList.length-1==index}">
                          <div :class="{rank1:item.rank==1,rank2:item.rank==2,rank3:item.rank==3}"><span>{{item.rank}}</span></div>
                          <div>{{item.nickname}}</div>
                          <div>{{item.totalNum}}<br><i>{{item.updateTime}}</i></div>
                          <div v-html="item.awardsName.replace('+','<br>')"></div>
                        </li>
                      </ul>
                    </scroll>
                  </div>
                </div>
                <div class="info">荷灯数相同，先达成排名靠前</div>
              </template>
              <template v-else-if="[3,4,5].includes(popType)">
                <scroll>
                  <div>
                    <template v-if="popType==3">
                      <p>1、活动时间：{{actInfoData.beginDate}}-{{actInfoData.endDate}}</p>
                      <p>2、玩游戏或买礼包获得荷灯，荷灯自动投入祈愿池中；</p>
                      <p>3、祈愿池每天分3个时段（0-9点、9-17点、17-24点）分别累计全服用户获得的荷灯并化成话费碎片（10个话费碎片=1元话费券），且还愿3次赠送月光宝盒，还愿时间分别是9点、17点、24点；
                      </p>
                      <p>4、玩家在各时段获得的荷灯分别累计，达到荷灯数可领取固定奖励；下个祈愿池开启，上个时段累计荷灯数清零；</p>
                      <p>5、单个时段祈愿池到指定还愿时间赠送月光宝盒，玩家在上个时段累计荷灯越多，获得宝盒机率越大，祈愿池返奖比例越大；</p>
                      <p>6、每天设置排行榜，每天获得荷灯最多的前20名玩家获得榜单奖励；</p>
                      <p>7、各时段累计荷灯奖励、月光宝盒奖励需手动领取。排行榜奖励由系统自动发送到账；</p>
                      <p>8、计入活动的游戏包括：糖果萌消消、街机欢乐捕鱼、疯狂炸弹人、三国大作战、欢乐竞技台球、众神风云、破晓方块消消乐、斗西游、王者弹珠、欢乐的小鸟、天使之战。</p>
                      <p>9、获得的荷灯计入各活动时段时间以系统计算为准；</p>
                      <p>10、月光宝盒奖励需系统计算，可能有延迟。请您耐心等候；</p>
                      <p>11、本次活动分为多种难度，系统将为您匹配。</p>
                    </template>
                    <template v-else-if="popType==4">
                      <p><em></em>祈愿池每天分3个时段<i>（0-9点、9-17点、17-24点）</i>单独累计全服用户获得的荷灯并化成话费碎片（10个话费碎片=1元话费券）。</p>
                      <p><em></em><i>9点、17点、24点</i>赠送月光宝盒，上个时段累计荷灯越多，获得宝盒机率越大，祈愿池返奖比例越大； </p>
                      <p><em></em>每个时段结束，下个时段开启，奖池累计荷灯和话费碎片将从0累计。</p>
                    </template>
                    <template v-else-if="popType==5">
                      <p>1、玩游戏或买礼包获得荷灯，荷灯自动投入祈愿池中（每累计游戏支持{{actInfoData.bettingRate|filterPrice}}金叶=1个荷灯）</p>
                      <img src="../images/comPop/gonglue/1.png" alt="" style="width:5.09rem;height: .64rem">
                      <p>
                        2、祈愿池每天分3个时段（0-9点、9-17点、17-24点）累计全服用户获得的荷灯并化成话费碎片，且还愿3次赠送月光宝盒，还愿时间分别是9点、17点、24点；</p>
                      <img src="../images/comPop/gonglue/2.png" alt="" style="width:5.09rem;height: 3.38rem">
                      <p>3、单时段累计荷灯领奖励</p>
                      <p>玩家在各时段获得的荷灯分别累计，达到荷灯数可领取固定奖励；下个祈愿池开启，上个时段累计荷灯数清零；</p>
                      <img src="../images/comPop/gonglue/3.png" alt="" style="width:5.1rem;height:1.44rem">
                      <p>4、月光宝盒奖励</p>
                      <p>单个时段祈愿池到指定还愿时间赠送月光宝盒，玩家在上个时段累计荷灯越多，获得宝盒机率越大，祈愿池返奖比例越大；</p>
                      <img src="../images/comPop/gonglue/4.png" alt="" style="width:5.09rem;height:1.56rem">
                      <p>5、每天设置排行榜，每天获得荷灯最多的前20名玩家获得榜单奖励；</p>
                      <img src="../images/comPop/gonglue/5.png" alt="" style="width:5.09rem;height:1.32rem">
                      <p>6、本次活动分为多种难度，系统将为您匹配。</p>
                    </template>
                  </div>
                </scroll>
              </template>
              <template v-else-if="popType==6">
                <div class="sad_content">
                  <img src="../images/comPop/flower.png" alt="" class="flower">
                  <p>荷灯*{{awardData.amount}}</p>
                  <div class="info">新增荷灯已自动计入活动</div>
                </div>
              </template>
              <template v-else-if="popType==7">
                <div class="sad_content">
                  <img src="../images/comPop/flower.png" alt="" class="flower">
                  <p>你有奖励待领取，<br>记得尽快领取~</p>
                </div>
              </template>
              <template v-else-if="popType==8">
                <div class="sad_content">
                  <img :src="`${require(`../images/comPop/${awardData.awardsType||'hfq'}.png`)}`" alt="" class="hfq">
                  <p>{{awardData.awardsName}}<template v-if="awardData.rank"><br><i>昨日排行第{{awardData.rank}}名，获得以上奖励</i></template></p>
                  <div class="info">奖励请至个人中心查看<template v-if="awardData.awardsType!='jdk'"><br>10个话费碎片=1元话费券</template></div>
                </div>
              </template>
              <template v-else-if="popType==9">
                <div class="awardsList_content">
                  <scroll>
                    <div class="awardsList" :class="{lte2:awardList.length<=2,e3:awardList.length==3}">
                      <div class="item" v-for="item in awardList">
                        <img src="../images/comPop/hfq.png" alt="">
                        <div class="awardsName">{{item}}个话费碎片</div>
                      </div>
                    </div>
                  </scroll>
                </div>
                <div class="info">1个宝箱1个奖励，奖励请至个人中心查看<br>10个话费碎片=1元话费券</div>
              </template>
            </div>
          </div>
          <div class="close" @click="close">
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
  import {getAwardsRecord,gameReceive, getRankList} from '../utils/api'

  export default {
    name: 'comPop',
    data() {
      return {
        isShowPop: false,
        record: [],
        allRecord:null,
        titles: ["领奖记录", "每日排行榜", "活动规则", "奖池说明", "活动攻略", "你已新增荷灯", "温馨提示", "恭喜获得", "恭喜获得"],
        tabIndex: 0
      }
    },
    props: {
      popType: {
        type: Number,
        default: 0
      },
      awardData: {
        type: Object,
        default: null
      },
      countTime: {
        type: String,
        default: ''
      },
      actInfoData: {
        type: Object,
        default: null
      },
      awardList:{
        type: Array,
        default: ()=>[]
      }
    },
    computed: {
      tabs() {
        return this.popType == 1 ? ['累计荷灯奖励', '月光宝盒'] : ['今日排行', '昨日排行']
      }
    },
    components: {
      scroll: () => import('./scroll')
    },
    methods: {
      getClassName(name) {
        return `${name} flag${this.popType}`
      },
      getAwardName(awardType) {
        switch (awardType) {
          case 'jyz':
            return '金叶子'
            break
          case 'yg':
            return '鱼干'
            break
          case 'jdk':
            return '京东券'
            break
          case 'hfq':
            return '话费券'
            break
          case 'yhq':
            return '优惠券'
            break
        }
      },
      async showPop() {
        if (![1, 2].includes(this.popType)) {
          if (this.popType == 6) {
            if (this.awardData && this.awardData.amount) {
              this.isShowPop = true
            } else {
              this.$emit('close')
            }
          } else {
            this.isShowPop = true
          }
        } else {
          if (this.popType == 1) {
            let {code, data} = await getAwardsRecord(this.tabIndex+1)
            if (code == 200) {
              this.record = data
            }
            this.isShowPop = true
          } else {
            this.tabIndex=this.actInfoData.state!=1?1:0//活动结束展示昨日排行
            let {code, data} = await getRankList(this.tabIndex?'yesterday':'today')
            if (code == 200) {
              this.allRecord = data
            }
            this.isShowPop = true
          }
        }
      },
      close() {
        this.$emit('close')
        this.isShowPop = false
        this.record = []
        this.allRecord = null
        if (this.popType == 8 && this.awardData&&this.awardData.rank) {
          this.$emit('showPop', 6, this.awardData)
        }
        if (this.popType == 1) {
          this.$emit('refresh', false)
        }
        this.tabIndex = 0
      },
      move(e) {
        e.preventDefault()
      },
      gotopay() {
        this.close()
        this.$emit('opendown')
      },
      show(type) {
        this.close()
        this.$emit('showPop', type)
      },
      async changeTab(index) {
        this.record = []
        this.allRecord = null
        this.tabIndex = index
        if (this.popType == 1) {
          let {code, data} = await getAwardsRecord(this.tabIndex+1)
          if (code == 200) {
            this.record = data
          }
          this.isShowPop = true
        } else {
          let {code, data} = await getRankList(this.tabIndex?'yesterday':'today')
          if (code == 200) {
            this.allRecord = data
          }
        }
      },
      async gainAwards(item, tabIndex) {
        if (!item.received) {
          let {code, message} = await gameReceive(tabIndex+1, item.id)
          if (code == 200) {
            this.$toast.show({
              message: '领取成功'
            })
            //设置该item 为已领取
            item.received = true
          } else {
            this.$toast.show({
              message
            })
          }
        }
      }
    },
    watch: {
      isShowPop(value) {
        if (value) {
          document.body.style.overflow = 'hidden'
          document.addEventListener('touchmove', this.move, {passive: false})
        } else {
          document.body.style.overflow = null
          document.removeEventListener('touchmove', this.move, {passive: false})
        }
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .com_pop {
    position: fixed;
    left: 50%;
    top: 1rem;
    margin-left: -3.08rem;
    .pop-mask {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.55);
    }
    .pop {
      position: relative;
      z-index: 10;
      .wrap {
        margin: 0 auto;
        box-sizing: border-box;
        .main {
          width: 6.16rem;
          height: 7.85rem;
          background: url("../images/comPop/bg.png");
          background-size: 100% 100%;
          font-size: 0.2rem;
          color: #fff;
          position: relative;
          top: -.1rem;
          padding: 2.2rem .2rem 0;
          box-sizing: border-box;
          z-index: 1;
          .title_bg {
            width: 6.16rem;
            height: .94rem;
            position: absolute;
            left: 0;
            top: .85rem;
            .title_txt {
              position: absolute;
              left: 0;
              right: 0;
              margin: auto;
              font-size: .47rem;
              font-weight: bold;
              color: #A2191C;
              text-align: center;
              line-height: .94rem;
            }
          }
          .container_compop {
            &.flag3, &.flag4, &.flag5 {
              padding: 0 .13rem;
              box-sizing: border-box;
              position: absolute;
              height: 5.3rem;
              width: 5.5rem;
              em{
                display: inline-block;
                width: .1rem;
                height: .1rem;
                background: #FEE4BC;
                border-radius: 50%;
                margin-right: .1rem;
              }
              p {
                /*font-weight: bold;*/
                color: #F7D5A1;
                box-sizing: border-box;
                font-size: .26rem;
                line-height: .36rem;
                &.center {
                  text-align: center;
                  text-decoration: underline;
                }
                i {
                  color: #FFA811;
                }
                span {
                  font-weight: bold;
                }
              }
              &.flag4 {
                p {
                  font-size: .26rem;
                  line-height: .5rem;
                  &.weight {
                    font-weight: bold;
                  }
                }
              }
              img{
                margin: .2rem 0;
              }
            }
            &.flag1, &.flag2{
              .tabs {
                width: 5.09rem;
                height: .88rem;
                background: #800202;
                border-radius: .44rem;
                font-size: .36rem;
                font-weight: 400;
                color: #E64C16;
                overflow: hidden;
                display: flex;
                margin: 0 auto .2rem;
                .item {
                  flex: 1;
                  line-height: .88rem;
                  text-align: center;
                  &.selected {
                    background: #FFFEFD;
                    color: #F26E4B;
                  }
                }
              }
              .bonus-record {
                height: 2.26rem;
                position: relative;
                margin: auto;
                font-size: .2rem;
                font-weight: 400;
                .title_items {
                  display: flex;
                  height: .6rem;
                  background: #FFC3C3;
                  border-radius: .08rem .08rem 0 0;
                  padding: .15rem 0;
                  box-sizing: border-box;
                  .title {
                    font-size: .22rem;
                    color: #800102;
                    flex: 1;
                    text-align: center;
                    height: .3rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    &:nth-child(1) {
                      flex: .5;
                    }
                    &:nth-child(2), &:nth-child(3) {
                      flex: 1.1;
                    }
                  }
                }
                .content {
                  position: absolute;
                  height: 3.6rem;
                  top: .6rem;
                  left: 0rem;
                  right: 0;
                  color: rgba(255, 255, 255, 1);
                  overflow: hidden;
                  background: #E65657;
                  border-radius: 0 0 .08rem .08rem;
                  ul {
                    display: flex;
                    flex-direction: column;
                    li {
                      display: flex;
                      justify-content: space-between;
                      height: .83rem;
                      align-items: center;
                      position: relative;
                      div {
                        flex: 1;
                        text-align: center;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        &:nth-child(1) {
                          flex: .5;
                        }
                        &:nth-child(2) {
                          flex: 1.1;
                        }
                        &:nth-child(3) {
                          flex: 1.2;
                        }
                        i{
                          margin-top: .14rem;
                          font-size: .18rem;
                          font-weight: 400;
                          color: #A41B1B;
                        }
                        .btn {
                          width: .88rem;
                          height: .44rem;
                          text-align: center;
                          line-height: .44rem;
                          background: #6B0CC4;
                          border-radius: .22rem;
                          margin: 0 auto;
                          color: #FFDDDD;
                          &.gray {
                            color: #FF8C8D;
                            background: #99393A;
                          }
                        }
                      }
                      &:not(.last):after {
                        content: '';
                        position: absolute;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        margin: auto;
                        width: 5.5rem;
                        height: .01rem;
                        background: #C94647;
                      }
                    }
                  }
                }
              }
              &.flag1 {
                .bonus-record {
                  .title_items {
                    .title:nth-child(1) {
                      flex: 1;
                    }
                    &.tab1{
                      .title {
                        &:nth-child(3) {
                          flex: 1.2;
                        }
                        &:nth-child(4) {
                          flex: .8;
                        }
                      }
                    }
                    &.tab2{
                      .title {
                        &:nth-child(2) {
                          flex: 1.2;
                        }
                        &:nth-child(3) {
                          flex: .8;
                        }
                      }
                    }
                  }
                  .content {
                    ul {
                      li {
                        div {
                          &:nth-child(1) {
                            flex: 1;
                          }
                        }
                        &.tab1{
                          div {
                            &:nth-child(3) {
                              flex: 1.2;
                            }
                            &:nth-child(4) {
                              flex: .8;
                            }
                          }
                        }
                        &.tab2{
                          div {
                            &:nth-child(2) {
                              flex: 1.2;
                            }
                            &:nth-child(3) {
                              flex: .8;
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
              &.flag2 {
                .my_info{
                  width: 100%;
                  height: .7rem;
                  border-radius: .08rem .08rem 0 0;
                  position: relative;
                  margin: .15rem auto 0;
                  font-size: .22rem;
                  font-weight: 400;
                  color: #ffe3c5;
                  overflow: hidden;
                  .title_items{
                    display: flex;
                    align-items: center;
                    height: .4rem;
                    background: #FFC3C3;
                    color: #A2181B;
                    .title{
                      flex: .8;
                      text-align: center;
                      height: .3rem;
                      line-height: .3rem;
                      box-sizing: border-box;
                      &:first-child{
                        flex: .5;
                      }
                    }
                  }
                  .content{
                    position: absolute;
                    height: .4rem;
                    border-radius: 0;
                    top: .3rem;
                    left: 0;
                    right: 0;
                    overflow: hidden;
                    background: #FFC3C3;
                    font-weight: bold;
                    color: #770ADD;
                    ul{
                      display: flex;
                      flex-direction: column;
                      li{
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        height: .4rem;
                        div{
                          flex: .8;
                          font-size: .26rem;
                          text-align: center;
                          overflow: hidden;
                          white-space: nowrap;
                          text-overflow: ellipsis;
                          &:first-child{
                            flex: .5;
                          }
                        }
                      }
                    }
                  }
                }
                .bonus-record {
                  .title_items {
                    border-radius: 0;
                    background: #EC9C9D;
                    height: .42rem;
                    padding: .1rem 0;
                    .title {
                      font-size: .24rem;
                      font-weight: 400;
                      color: #800102;
                      &:nth-child(2) {
                        flex: 1;
                      }
                      &:nth-child(4) {
                        flex: 1.2;
                      }
                    }
                  }
                  .content {
                    top: .42rem;
                    height: 2.8rem;
                    background: #E65657;
                    ul {
                      li {
                        div {
                          &:nth-child(1){
                            span{
                              display: inline-block;
                              width: .37rem;
                              height: .37rem;
                              line-height:.37rem;
                              text-align: center;
                            }
                            &.rank1 span{
                              background: #FFC103;
                              border-radius: 50%;
                            }
                            &.rank2 span{
                              background: #F8F0E4;
                              border-radius: 50%;
                              color: #A31A1B;
                            }
                            &.rank3 span{
                              background: #793B04;
                              border-radius: 50%;
                            }
                          }
                          &:nth-child(2) {
                            flex: 1;
                          }
                          &:nth-child(4) {
                            flex: 1.2;
                          }
                        }
                      }
                    }
                  }
                }
                .info{
                  position: absolute;
                  left: 0;
                  right: 0;
                  bottom: .28rem;
                  text-align: center;
                  font-size: .24rem;
                  font-weight: 400;
                  color: #FFAC64;
                }
              }
            }
            &.flag6, &.flag7, &.flag8 {
              position: relative;
              .sad_content {
                position: absolute;
                left: 0;
                right: 0;
                margin: .5rem auto 0;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                .flower {
                  width: 2.64rem;
                  height: 1.86rem;
                  margin-bottom: .25rem;
                }
                .hfq {
                  width: 2.56rem;
                  height: 1.6rem;
                }
                .add {
                  font-size: .3rem;
                  font-weight: 400;
                  color: rgba(255, 255, 255, 1);
                  margin: .15rem 0 .13rem;
                }
                p {
                  font-size: .4rem;
                  font-weight: bold;
                  color: #F7D5A1;
                  line-height: .4rem;
                  text-align: center;
                }
                .info {
                  margin-top: 1.5rem;
                  font-size: .26rem;
                  font-weight: 400;
                  color: #FFAC64;
                  text-align: center;
                  line-height: .4rem;
                }
              }
              &.flag7 {
                .sad_content {
                  p {
                    font-size: .4rem;
                    line-height: .5rem;
                  }
                }
              }
              &.flag8 {
                .sad_content {
                  margin: 1rem auto 0;
                  i{
                    font-size: .3rem;
                    font-weight: 400;
                    color: #F7D5A1;
                  }
                  .info{
                    margin-top: 1rem;
                  }
                }
              }
            }
            &.flag9 {
              .awardsList_content{
                position: relative;
                height: 4.26rem;
              }
              .awardsList{
                position: absolute;
                display: flex;
                flex-wrap: wrap;
                padding: 0 .3rem;
                box-sizing: border-box;
                &.lte2{
                  left: 0;
                  right: 0;
                  bottom: 0;
                  top: 0;
                  justify-content: center;
                  flex-direction: column;
                  align-items: center;
                }
                &.e3{
                  left: 0;
                  right: 0;
                  bottom: 0;
                  top: 0;
                  justify-content: center;
                  align-items: center;
                }
                .item{
                  text-align: center;
                  position: relative;
                  margin-bottom: .3rem;
                  img{
                    width: 2.56rem;
                    height: 1.6rem;
                  }
                  .awardsName{
                    position: absolute;
                    top: 1.5rem;
                    left: 0;
                    right: 0;
                    font-size: .3rem;
                    font-weight: 400;
                    color: #F8D6A1;
                  }
                }
              }
              .info{
                font-size: .26rem;
                font-weight: 400;
                color: #FFAC64;
                text-align: center;
                margin-top: .3rem;
                line-height: .4rem;
              }
            }
          }
          .myrank {
            height: .97rem;
            background: rgba(255, 255, 255, 1);
            border: .02rem solid rgba(255, 198, 169, 1);
            border-radius: 0 0 .2rem .2rem;
            display: flex;
            position: absolute;
            left: 0;
            right: 0;
            bottom: -.2rem;
            margin: auto;
            width: 5.86rem;
            justify-content: space-around;
            align-items: center;
            text-align: center;
            .item {
              font-size: .22rem;
              font-weight: 400;
              color: rgba(87, 42, 231, 1);
              .myrank_title {
                margin-bottom: .15rem;
                color: rgba(50, 30, 68, 1);
              }
            }
          }
        }
        .close {
          width: .88rem;
          height: 2.68rem;
          background: url("../images/comPop/close.png") no-repeat center
            center / 100% 100%;
          position: absolute;
          bottom: -2.4rem;
          left: 0;
          right: 0;
          margin: auto;
        }
      }
    }
    .scalc-enter-active {
      animation: fadeAnimation 0.3s ease-in-out;
    }
    @keyframes fadeAnimation {
      0% {
        transform: scale(0);
      }
      50% {
        transform: scale(1.2);
      }
      100% {
        transform: scale(1);
      }
    }
  }
</style>
