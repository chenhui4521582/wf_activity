<template>
  <div class="prov-user">
    <div class="title">
      <span>上期幸运儿</span>
      <span class="prov-btn">往期揭晓</span>
    </div>
    <div class="user">
      <div class="avatar">
        <img src="../img/avatar.png" alt="">
      </div>
      <div class="text">
        <div class="name">获奖者：彭于晏16236****32</div>
        <div class="ip">IP:100.23.***.***.11（广东 广州）</div>
        <div class="people">参与次数：26人次</div>
        <div class="time">开奖时间：2018/09/26 17:30:24</div>
        <div class="award-num">幸运号码：100045942</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'provUser'
}
</script>
<style lang="less" scoped>
.prov-user{
  margin-top: .2rem;
  padding: 0 .2rem .26rem;
  background: #fff;
  border-radius: .16rem;
  .title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: .84rem;
    font-size: .28rem;
    font-weight: bold;
    color: #000;
    .prov-btn {
      font-size: .24rem;
      color: #5186CA;
      font-weight: normal;
    }
  }
  .user {
    padding: .2rem;
    display: flex;
    justify-content: flex-start;
    background: #FFFDEF;
    .avatar {
      margin-right: .17rem;
      width: .8rem;
      height: .8rem;
      img {
        vertical-align: top;
        width: .8rem;
        height: .8rem;
      }
    }
    .text {
      font-size: .24rem;
      color: #888888;
      .name,.ip,.people,.time{
        margin-bottom: .18rem;
      }
      .award-num {
        color: #FF7800;
      }
    }
  }
}
</style>