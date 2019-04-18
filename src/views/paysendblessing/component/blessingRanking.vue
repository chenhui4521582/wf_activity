<template>
  <div>
    <div class="ranking">
      <div class="rankint-list">
          <li class="one first-nickname" v-if="rankingList[0]">
            <div class="user">
              <div class="avatar">
                <img :src="rankingList[0].profilePhoto | filter " alt="" v-if="!!rankingList[0].profilePhoto">
                <img src="../images/avatar.png" alt="" v-else>
                <div class="index"><span><img src="../images/new/first-rank.png" alt=""></span></div>
              </div>
              <div class="user-info first-nickname">
                <div class="nick-name">{{rankingList[0].nickname}}</div>
                <div class="blessing-num"><i>福气值：</i><span>{{rankingList[0].amount}}</span></div>
              </div>
            </div>
            <div class="blessing-log " >
              <img src="../images/new/adver-pai.png" alt="">
            </div>
          </li>
          <li class="one first-nickname" v-else>
            <div class="user">
              <div class="avatar">
                <img src="../images/avatar.png" alt="">
                  <div class="index"><span><img src="../images/new/first-rank.png" alt=""></span></div>
              </div>
              <div class="user-info">
                <div class="nick-name">***</div>
                <div class="blessing-num"><i>福气值：</i><span>***</span></div>
              </div>
            </div>
            <div class="blessing-log " >
                <img src="../images/new/adver-pai.png" alt="">
            </div>
          </li>
          <li class="two" v-if="rankingList[1]">
            <div class="user">
              <div class="avatar">
                <img :src="rankingList[1].profilePhoto | filter" alt="" v-if="!!rankingList[1].profilePhoto">
                <img src="../images/avatar.png" alt="" v-else>
                <div class="index"><span><img src="../images/new/two-rank.png" alt=""></span></div>
              </div>
              <div class="user-info">
                <div class="nick-name">{{rankingList[1].nickname}}</div>
                <div class="blessing-num"><i>福气值：</i><span>{{rankingList[1].amount}}</span></div>
              </div>
            </div>
          </li>
          <li class="two" v-else>
            <div class="user">
              <div class="avatar">
                <img src="../images/avatar.png" alt="">
                <div class="index"><span><img src="../images/new/two-rank.png" alt=""></span></div>
              </div>
              <div class="user-info">
                <div class="nick-name">***</div>
                <div class="blessing-num"><i>福气值：</i><span>***</span></div>
              </div>
            </div>
          </li>
          <li class="three" v-if="rankingList[2]">
            <div class="user">
              <div class="avatar">
                <img :src="rankingList[2].profilePhoto | filter" alt="" v-if="!!rankingList[2].profilePhoto">
                <img src="../images/avatar.png" alt="" v-else>
                <div class="index"><span><img src="../images/new/three-rank.png" alt=""></span></div>
              </div>
              <div class="user-info">
                <div class="nick-name">{{rankingList[2].nickname}}</div>
                <div class="blessing-num"><i>福气值：</i><span>{{rankingList[2].amount}}</span></div>
              </div>
            </div>
          </li>
          <li class="three" v-else>
            <div class="user">
              <div class="avatar">
                <img src="../images/avatar.png" alt="">
                <div class="index"><span><img src="../images/new/three-rank.png" alt=""></span></div>
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
          <div class="border">查看更多排名>></div>
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
		  GLOBALS.marchSetsPoint('A_H5PT0074000679')
        }
		this.$emit('handleClick', text)
	  }
	}
  }
</script>

<style scoped lang="less">
.ranking {
  box-sizing: border-box;
  .rankint-list {
      padding: 0 .15rem;
  }
  .first-nickname {
    .index {
        position: relative;
        top:-.13rem;
    }
  }
  .one {
    position: relative;
    width: 100%;
    height: 4.37rem;
    background: url("../images/new/one.png") no-repeat center top / 100% 100%;
    .user {
        width:4.5rem;
       padding-top:2.91rem;
       height: .97rem;
       display: flex;
       align-items: center;
        margin:0 auto;
       .avatar {
         margin-right: .22rem;
         width: 1.03rem;
         height: 1.03rem;
         img {
           width: 100%;
           height: 100%;
           vertical-align: top;
         }

       }
       .user-info {
         color: #652B19;
           margin-left:0.25rem;
         .nick-name {
           margin-bottom: .02rem;
           font-size: .42rem
         }
         .blessing-num {
           font-size: .3rem;
           span {
             color: #652B19;
           }
         }
       }
     }
    .blessing-log {
      position: absolute;
      right: .05rem;
      top: -0.22rem;
      width: 1.4rem;
      height: 1.4rem;
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
    height: 1.59rem;
    background: url("../images/new/two.png") no-repeat center top / 100% 100%;

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
            font-size: 0.4rem;
            padding-top: 0.1rem;
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
    background: url("../images/new/three.png") no-repeat center top / 100% 100%;
  }
  .check-btn {
    width: 100%;
    /*position: fixed;*/
      /*left:0;*/
      /*bottom:0;*/
    box-sizing: border-box;
    .container {
      width: 100%;
      height: .81rem;
      box-sizing: border-box;
    }
    .border {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      /*background:linear-gradient(-54deg,rgba(61,80,203,1),rgba(94,120,235,1));*/
      background:#272D9F;
        font-size:0.27rem;
        color: #fff;
    }
    img {
      width: 1.74rem;
      height: .28rem;
    }
  }
}
</style>
