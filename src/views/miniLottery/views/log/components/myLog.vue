<template>
  <div class="my-log">
    <div class="title">
      <div class="item">夺宝名称</div>
      <div class="item">幸运儿信息</div>
      <div class="item">夺宝结果</div>
    </div>
    <ul>
      <li>
        <div class="item">第40期</div>
        <div class="item">
          <p>彭于晏12336**87</p>
          <p>参与58次</p> 
        </div>
        <div class="item">
          <p>09-26 21:45结束</p>
          <p>幸运码：123004567</p>
        </div>
      </li>
      <li>
        <div class="item">第40期</div>
        <div class="item">
          <p>彭于晏12336**87</p>
          <p>参与58次</p> 
        </div>
        <div class="item">
          <p>09-26 21:45结束</p>
          <p>幸运码：123004567</p>
        </div>
      </li>
      <li>
        <div class="item">第40期</div>
        <div class="item">
          <p>彭于晏12336**87</p>
          <p>参与58次</p> 
        </div>
        <div class="item">
          <p>09-26 21:45结束</p>
          <p>幸运码：123004567</p>
        </div>
      </li>
      <li>
        <div class="item">第40期</div>
        <div class="item">
          <p>彭于晏12336**87</p>
          <p>参与58次</p> 
        </div>
        <div class="item">
          <p>09-26 21:45结束</p>
          <p>幸运码：123004567</p>
        </div>
      </li>
      <li>
        <div class="item">第40期</div>
        <div class="item">
          <p>彭于晏12336**87</p>
          <p>参与58次</p> 
        </div>
        <div class="item">
          <p>09-26 21:45结束</p>
          <p>幸运码：123004567</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'myLog',
  
}
</script>
<style lang="less" scoped>
.my-log {
  position: absolute;
  left: 0;
  top: .96rem;
  right: 0;
  bottom: .96rem;
  padding: 0 .24rem;
  .title {
    height: .5rem;
    line-height: .5rem;
    background: #FFFAD4;
    display: flex;
    justify-content: flex-start;
    box-shadow:0px 3px 6px rgba(0,0,0,0.08);
    border-radius: .16rem .16rem 0px 0px;
    .item {
      text-align: center;
      font-size: .24rem;
      color: #000;
      &:nth-child(1) {
        width: 1.7rem;
      }
      &:nth-child(2) {
        width: 2.5rem;
      }
      &:nth-child(3) {
        flex: 1;
      }
    }
  }
  ul {
    height: calc(100% - .96rem);
    li {
      height: .9rem;
      line-height: .9rem;
      .item {
        text-align: center;
        font-size: .24rem;
        color: #000;
        &:nth-child(1) {
          width: 1.7rem;
        }
        &:nth-child(2) {
          width: 2.5rem;
        }
        &:nth-child(3) {
          flex: 1;
        }
      }
    }
  }
}
</style>