<template>
  <div class="black-name">
      <div class="head">
          <a href="javascript:" class="btn-arrow">
            <img src="./images/newback.png" alt="" class="h-arrow">
          </a>
          <span>手机绑定</span>
      </div>
      <div class="problemDetails">
        <textarea data-v-54cda256="" maxlength="300" placeholder="请将您的情况填写下来，我们将在2~3个工作日内给您回复（字数限制在5~300以内）。注意：同一设备登录多个账号、游戏作弊、使用模拟器、插件、外挂等工具参与游戏等行为会引发账号登录异常。 " name="" id="" cols="30" rows="10" class="detailsInput"></textarea>
        <input data-v-54cda256="" type="tel" placeholder="请留下您的手机号码，以便我们回复您。">
      </div>
  </div>
</template>
<script type="text/javascript">
  export default {

  }
</script>
<style lang="less" scoped>
  .black-name {
    width: 100%;
    height: 100%;
    background: #0F1726;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1;
  }
  .head {
        display: flex;
        font-size: 0.32rem;
        font-weight: bold;
        padding: 0.3rem;
        text-align: center;
        color: #fff;
        align-items: center;
        justify-content: center;
        position: relative;
    }
  .h-arrow {
    width: 0.3rem;
    height: 0.3rem;
    margin-top: 0.1rem;
  }
  .btn-arrow {
    width: 0.6rem;
    height: 0.5rem;
    position: absolute;
    left: 0.2rem;
    top: .28rem;
  }
  input,textarea {
    outline: none;
    width: 100%;
  }
</style>