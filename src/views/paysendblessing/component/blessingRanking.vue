<template>
  <div class="ranking">
    <div class="rankint-list">
      <ul>
        <li class="one">
          <div class="user">
            <div class="avatar">
              <img src="../images/back.png" alt="">
            </div>
            <div class="user-info">
              <div class="nick-name">dadddd</div>
              <div class="blessing-num"><i>福气值:</i><span>88888</span></div>
            </div>
          </div>
        </li>
        <li class="two">
          <div class="user">
            <div class="avatar">
              <img src="../images/back.png" alt="">
              <div class="index"><span>第二名</span></div>
            </div>
            <div class="user-info">
              <div class="nick-name">dadddd</div>
              <div class="blessing-num"><i>福气值:</i><span>88888</span></div>
            </div>
          </div>
        </li>
        <li class="three">
          <div class="user">
            <div class="avatar">
              <img src="../images/back.png" alt="">
              <div class="index"><span>第三名</span></div>
            </div>
            <div class="user-info">
              <div class="nick-name">dadddd</div>
              <div class="blessing-num"><i>福气值:</i><span>88888</span></div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      list: Array
    },
	name: 'blessing-ranking'
  }
</script>

<style scoped lang="less">
.ranking {
  position: absolute;
  padding: 0 .15rem;
  bottom: 1.22rem;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  .one {
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
}
</style>
