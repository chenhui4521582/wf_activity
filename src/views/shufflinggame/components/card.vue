<template>
  <div class="grid" :class="{cannotclick:!(canClick&&isCanHit)}">
    <div class="projects">
      <div :class="classNames(item,index)" v-for="(item,index) in cardData" @click="clickCard(item,index)">
        <template v-if="!(index==4&&!showcontrolcss)">
          <div class="mask" :class="{level1:level==1,level2:level==2,level3:level==3}">
            <div class="back" :class="{level1:level==1,level2:level==2,level3:level==3}">
              <template v-if="item.status&&item.awardsType">
                <img src="../images/jd.png" alt="" v-if="item.awardsType=='jdk'">
                <img src="../images/huafei.png" alt="" v-if="item.awardsType=='hfq'">
                <img src="../images/fish.png" alt="" v-if="item.awardsType=='yg'">
                <img src="../images/leaf.png" alt="" v-if="item.awardsType=='jyz'">
                <img src="../images/card.png" alt="" v-if="item.awardsType=='fbk'">
              </template>
              <span v-if="item.status&&item.awardsName">{{item.awardsName}}</span>
            </div>
            <div class="front" :class="{level1:level==1,level2:level==2,level3:level==3}">
              <span>{{item.consumeNum}}点翻开</span>
            </div>
          </div>
        </template>
        <template v-else>
          <span class="bottom"></span>
          <span class="bottom"></span>
          <span class="bottom"></span>
          <div class="mask" :class="{level1:level==1,level2:level==2,level3:level==3}">
            <span>{{item.consumeNum}}点翻开</span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
  import {betSingle} from '../utils/api'

  export default {
    name: 'app',
    props: {
      level: {
        type: Number,
        default: 0
      },
      isReset: {
        type: Boolean,
        default: false
      },
      cardData: {
        type: Array,
        default: []
      },
      isBeginAnimate: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        showcontrolcss: true,
        cardsClicked: [],
        canClick: false,
        currentCardIndex: [],
        classNamesArr: [],
        isCanHit:true
      }
    },
    methods: {
      classNames(item, index) {
        let arr = ['project']
        if (index == 4) {
          arr.push("ani4")
          arr.push(!this.showcontrolcss ? "controls" : 'show')
        } else {
          this.classNamesArr[index > 4 ? index - 1 : index] && arr.push(this.classNamesArr[index > 4 ? index - 1 : index])
        }
        if (this.currentCardIndex.includes(index)) {
          arr.push('currentCardIndex')
        }
        return arr.join(' ')
      },
      addMove() {
        $('.project').each((index, item) => {
          if (index != 4) {
            setTimeout(() => {
              this.classNamesArr.push('ani' + index);
            }, (index > 4 ? index - 1 : index) * 100);
          }
        })
      },
      subMove() {
        $('.project').each((index, item) => {
          if (index != 4) {
            setTimeout(() => {
              this.classNamesArr.pop();
            }, 100 * (index > 4 ? index - 1 : index));
          }
        })
      },
      showcontrol() {
        if (this.showcontrolcss) {
          this.showcontrolcss = false
          this.subMove();
        } else {
          this.showcontrolcss = true
          this.addMove();
        }
      },
      reset() {
        this.canClick = false
        this.showcontrolcss = false
        this.currentCardIndex = []
        this.subMove();
      },
      clickCard(item, index) {
        if (this.canClick&&this.isCanHit) {
          if (!item.status) {//未翻
            this.goHit(item, index)
          }
        }
      },
      async goHit(item, index) {
        this.isCanHit=false
        const {code, data, message} = await betSingle({value: item.sort})
        if (code === 200) {
          this.cardData.splice(index, 1, data[0])
          this.currentCardIndex.push(index)
          setTimeout(() => {
            this.$emit('getawards', data)
            this.$emit('refreshCardInfo')
            this.$emit('refreshUserInfo')
          }, 1000)
          this.isCanHit=true
        } else if (code == 102) {
          this.isCanHit=true
          this.$emit('getawards', null)
        } else {
          this.isCanHit=true
          this.$toast.show({
            message,
            duration: 3000
          })
        }
      },
    },
    mounted() {
      this.classNamesArr = ['ani0', 'ani1', 'ani2', 'ani3', 'ani5', 'ani6', 'ani7', 'ani8']
      $('.project').get(7).addEventListener("transitionstart", () => {
        this.canClick = false
      })
      $('.project').get(0).addEventListener("transitionend", () => {
        if (!this.showcontrolcss) {
          this.showcontrolcss = true
          this.addMove();
        }
      })
      $('.project').get(8).addEventListener("transitionend", () => {
        if(this.classNamesArr.length==8){
          this.canClick = true
        }
      })
    },
    watch: {
      isReset(val) {
        if (val) {
          this.canClick&&this.isCanHit&&this.reset()
        }
      },
      showcontrolcss(val) {
        if (val) {
          this.$emit('reset')
        }
      },
      cardData: {
        handler(val) {
          this.canClick = true
          this.currentCardIndex = val.filter(item => item.status).map(item => item.sort - 1)
        },
        immediate: true
      },
      isBeginAnimate:{
        handler(val) {
          if(val){
            setTimeout(() => {
              this.showcontrolcss = false
              this.subMove();
            }, 100)
          }else{
            this.canClick=true
          }
        },
        immediate: true
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../common/css/base.css';

  #projects, #projects .grid {
  }

  #projects {
    /*background-color: #ef4036;*/
    overflow: hidden;
  }

  .project {
    position: absolute;
    right: 1.75rem;
    top: 2.2rem;
  }

  .project {
    float: left;
    width: 164*0.01rem;
    height: 210*0.01rem;
  }

  .grid {
    //width: 1170*0.01rem;
    margin: 0 auto;
    position: relative;
    &.cannotclick{
      height: 100%;
      z-index: 1;
    }
  }

  div.projects {
    height: 650*0.01rem;
  }

  div.projects {
    float: left;
    width: 5.15rem;
    position: relative;
    left: 50%;
    top: 1.6rem;
    transform: translateX(-50%);
  }

  div.projects .controls {
    position: absolute;
    left: 1.75rem;
    top: 2.2rem;
  }

  div.projects .controls {
    float: left;
    width: 164*0.01rem;
    height: 210*0.01rem;
  }

  .controls .mask {
    float: left;
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    &.level1 {
      background: url('../images/level1/card.png') no-repeat;
      background-size: 100% 100%;
    }
    &.level2 {
      background: url('../images/level2/card.png') no-repeat;
      background-size: 100% 100%;
    }
    &.level3 {
      background: url('../images/level3/card.png') no-repeat;
      background-size: 100% 100%;
    }
    span {
      position: absolute;
      top: 1.5rem;
      width: 1.18rem;
      height: .4rem;
      font-size: .2rem;
      font-weight: 400;
      color: #fffcd6;
      left: .22rem;
      line-height: .48rem;
      text-align: center;
    }
  }

  div.projects .controls .bottom {
    -webkit-transition: all .3s ease;
    -moz-transition: all .3s ease;
    -o-transition: all .3s ease;
    -ms-transition: all .3s ease;
    transition: all .3s ease;
  }

  .project.ani0 {
    right: 3.5rem;
    top: 0;
  }

  .project.ani1 {
    left: 1.75rem;
    top: 0;
  }

  .project.ani2 {
    right: 0;
    top: 0;
  }

  .project.ani3 {
    right: 3.5rem;
    top: 2.2rem;
  }

  .project.ani4 {
    left: 1.75rem;
    top: 2.2rem;
  }

  .project.ani5 {
    right: 0;
    top: 2.2rem;
  }

  .project.ani6 {
    right: 3.5rem;
    top: 4.4rem;
  }

  .project.ani7 {
    left: 1.75rem;
    top: 4.4rem;
  }

  .project.ani8 {
    right: 0;
    top: 4.4rem;
  }

  .project .front {
    position: relative;
    background: url('../images/level1/card.png') no-repeat;
    background-size: 100% 100%;
    &.level2 {
      background: url('../images/level2/card.png') no-repeat;
      background-size: 100% 100%;
    }
    &.level3 {
      background: url('../images/level3/card.png') no-repeat;
      background-size: 100% 100%;
    }
    span {
      position: absolute;
      top: 1.5rem;
      width: 1.18rem;
      height: .4rem;
      font-size: .2rem;
      font-weight: 400;
      color: #fffcd6;
      left: .22rem;
      line-height: .48rem;
      text-align: center;
    }
  }

  .project .back, .project .front {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .project .back {
    background: url(../images/level1/card1.png) no-repeat;
    background-size: 100% 100%;
    &.level2 {
      background: url('../images/level2/card1.png') no-repeat;
      background-size: 100% 100%;
    }
    &.level3 {
      background: url('../images/level3/card1.png') no-repeat;
      background-size: 100% 100%;
    }
    img {
      position: absolute;
      top: .5rem;
      width: .84rem;
      height: .88rem;
      left: .4rem;
    }
    span {
      position: absolute;
      top: 1.5rem;
      width: 1.18rem;
      height: .4rem;
      font-size: .2rem;
      font-weight: 400;
      color: #fffcd6;
      left: .24rem;
      line-height: .48rem;
      text-align: center;
      overflow: hidden; /*超出部分隐藏*/
      white-space: nowrap; /*不换行*/
      text-overflow: ellipsis; /*超出部分文字以...显示*/
    }
  }

  .project .back, .project .front {
    position: absolute;
    left: 0;
    top: 0;
    width: 164*0.01rem;
    height: 210*0.01rem;
    padding: 0 16*0.01rem;
    text-align: center;
  }

  .project, .project .back, .project .front, .socials a, .transform_holder .back, .transform_holder .front, .transform_holder .transform {
    -webkit-transition: all 1s cubic-bezier(0.68, -.55, .265, 1.55);
    -moz-transition: all 1s cubic-bezier(0.68, -.55, .265, 1.55);
    -o-transition: all 1s cubic-bezier(0.68, -.55, .265, 1.55);
    -ms-transition: all 1s cubic-bezier(0.68, -.55, .265, 1.55);
    transition: all 1s cubic-bezier(0.68, -.55, .265, 1.55);
  }

  .project {
    -webkit-perspective: 1000;
    -moz-perspective: 1000;
    -o-perspective: 1000;
    perspective: 1000;
    -ms-transform: perspective(1000*0.01rem);
    -moz-transform: perspective(1000*0.01rem);
    -ms-transform-style: preserve-3d;
    -moz-transform-style: preserve-3d;
  }

  .project .back, .project .front {
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    -o-backface-visibility: hidden;
    -ms-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transform-style: preserve-3d;
    -moz-transform-style: preserve-3d;
    -o-transform-style: preserve-3d;
    -ms-transform-style: preserve-3d;
    transform-style: preserve-3d;
  }

  .project .front {
    -webkit-transform: rotateY(0deg);
    -ms-transform: rotateY(0deg);
  }

  .project .back {
    -webkit-transform: rotateY(180deg);
    -moz-transform: rotateY(180deg);
    -o-transform: rotateY(180deg);
    -ms-transform: rotateY(180deg);
    transform: rotateY(180deg);
  }

  .project.currentCardIndex .front {
    -webkit-transform: rotateY(180deg);
    -moz-transform: rotateY(180deg);
    -o-transform: rotateY(180deg);
    transform: rotateY(180deg);
  }

  .project.currentCardIndex .back {
    -webkit-transform: rotateY(0deg);
    -moz-transform: rotateY(0deg);
    -o-transform: rotateY(0deg);
    -ms-transform: rotateY(0deg);
    transform: rotateY(0deg);
  }
</style>
