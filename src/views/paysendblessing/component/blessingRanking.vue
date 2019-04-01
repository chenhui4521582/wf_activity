<template>
  <div>
    <div class="ranking" v-if="showList">
      <div class="rankint-list">
        <ul>
          <li class="one" v-if="rankingList[0]">
            <div class="user">
              <div class="avatar">
                <img :src="rankingList[0].profilePhoto | filter " alt="" v-if="!!rankingList[0].profilePhoto">
                <img src="../images/avatar.png" alt="" v-else>
              </div>
              <div class="user-info">
                <div class="nick-name">{{rankingList[0].nickname}}</div>
                <div class="blessing-num"><i>福气值：</i><span>{{rankingList[0].amount}}</span></div>
              </div>
            </div>
            <div class="blessing-log btn" @click="handleClick('log')">
              <img src="../images/blessing-log-btn.png" alt="">
            </div>
          </li>
          <li class="two" v-if="rankingList[1]">
            <div class="user">
              <div class="avatar">
                <img :src="rankingList[1].profilePhoto | filter" alt="" v-if="!!rankingList[0].profilePhoto">
                <img src="../images/avatar.png" alt="" v-else>
                <div class="index"><span>第二名</span></div>
              </div>
              <div class="user-info">
                <div class="nick-name">{{rankingList[1].nickname}}</div>
                <div class="blessing-num"><i>福气值：</i><span>{{rankingList[1].amount}}</span></div>
              </div>
            </div>
          </li>
          <li class="three" v-if="rankingList[2]">
            <div class="user">
              <div class="avatar">
                <img :src="rankingList[2].profilePhoto | filter" alt="" v-if="!!rankingList[2].profilePhoto">
                <img src="../images/avatar.png" alt="" v-else>
                <div class="index"><span>第三名</span></div>
              </div>
              <div class="user-info">
                <div class="nick-name">{{rankingList[2].amount}}</div>
                <div class="blessing-num"><i>福气值：</i><span>{{rankingList[2].amount}}</span></div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="check-btn btn" @click="handleClick('ranking')">
        <div class="container">
          <div class="border">
            <img src="../images/check-ranking-btn.png" alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="ranking" v-else>
      <div class="rankint-list">
        <ul>
          <li class="one">
            <div class="user">
              <div class="avatar">
                <img src="../images/avatar.png" alt="">
              </div>
              <div class="user-info">
                <div class="nick-name">***</div>
                <div class="blessing-num"><i>福气值：</i><span>***</span></div>
              </div>
            </div>
            <div class="blessing-log btn" @click="handleClick('log')">
              <img src="../images/blessing-log-btn.png" alt="">
            </div>
          </li>
          <li class="two">
            <div class="user">
              <div class="avatar">
                <img src="../images/avatar.png" alt="">
                <div class="index"><span>第二名</span></div>
              </div>
              <div class="user-info">
                <div class="nick-name">***</div>
                <div class="blessing-num"><i>福气值：</i><span>***</span></div>
              </div>
            </div>
          </li>
          <li class="three">
            <div class="user">
              <div class="avatar">
                <img src="../images/avatar.png" alt="">
                <div class="index"><span>第三名</span></div>
              </div>
              <div class="user-info">
                <div class="nick-name">***</div>
                <div class="blessing-num"><i>福气值：</i><span>***</span></div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="check-btn btn" @click="handleClick('ranking')">
        <div class="container">
          <div class="border">
            <img src="../images/check-ranking-btn.png" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    props: {
	  rankingList: Array
    },
	name: 'blessing-ranking',
	methods: {
	  handleClick (text) {
	    if(text == 'ranking') {
		  //H5平台-充值送福气-查看排名 埋点
		  GLOBALS.marchSetsPoint('A_H5PT0074000678','A_H5PT0074000679')
        }
		this.$emit('handleClick', text)
	  }
	},
    computed: {
      showList () {
        return this.rankingList.length
      }
    }
  }
</script>

<style scoped lang="less">
.ranking {
  padding: 0 .15rem;
  box-sizing: border-box;
  .one {
    position: relative;
    width: 100%;
    height: 3.54rem;
    background: url("../images/one.png") no-repeat center top / 100% 100%;
    .user {
       padding: .63rem 0 0 2.58rem;
       height: .97rem;
       display: flex;
       justify-content: flex-start;
       align-items: center;
       .avatar {
         margin-right: .22rem;
         width: .94rem;
         height: .94rem;
         img {
           width: 100%;
           height: 100%;
           vertical-align: top;
         }

       }
       .user-info {
         color: #fff;
         .nick-name {
           margin-bottom: .1rem;
           font-size: .47rem
         }
         .blessing-num {
           font-size: .3rem;
           span {
             color: #FFE26B;
           }
         }
       }
     }
    .blessing-log {
      position: absolute;
      right: .3rem;
      top: -.33rem;
      width: 1.43rem;
      height: .81rem;
      img {
        width: 100%;
        height: 100%;
        vertical-align: top;
      }
    }
  }
  .two,.three {
    margin-top: .2rem;
    width: 100%;
    height: 1.63rem;
    background: url("../images/two.png") no-repeat center top / 100% 100%;

    .user {
      padding: .26rem 2.86rem 0 .35rem;
      height: .97rem;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .avatar {
        position: relative;
        margin-right: .22rem;
        width: .97rem;
        height: .97rem;
        img {
          width: 100%;
          height: 100%;
          vertical-align: top;
        }
        .index {
          position: absolute;
          left: -.04rem;
          bottom: -.2rem;
          background: #2ED6BF;
          color: #fff;
          width: 1.05rem;
          height: .34rem;
          display: flex;
          align-items: center;
          text-align: center;
          justify-content: center;
          border-radius:17px;
        }
      }
      .user-info {
        color: #fff;
        .nick-name {
          margin-bottom: .1rem;
          font-size: .4rem
        }
        .blessing-num {
          font-size: .28rem;
          span {
            color: #FFE26B;
          }
        }
      }
    }
  }
  .three {
    margin: .2rem 0;
  }
  .check-btn {
    margin-bottom: .2rem;
    width: 100%;
    box-sizing: border-box;
    .container {
      width: 100%;
      height: .81rem;
      padding: 3px;
      box-sizing: border-box;
      background:linear-gradient(-32deg, rgba(45, 61, 217, 0.97), rgba(82, 166, 236, 0.97));
      border-radius:10px;
    }
    .border {
      border-radius:10px;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background:linear-gradient(-54deg,rgba(61,80,203,1),rgba(94,120,235,1));
    }
    img {
      width: 1.74rem;
      height: .28rem;
    }
  }
}
</style>
