<template>
  <div class="cost-down" v-if="showFlag">
    <div class="task" v-if="type==2" @click="openRule">
      <span class="count-down">
        升级倒计时{{countdownTime}}
      </span>
      <span class="rule-icon"></span>
    </div>
    <div class="task-home" v-else @click="openRule">
      <span class="count-down">
        升级倒计时{{countdownTime}}
      </span>
      <span class="rule-icon"></span>
    </div>
    <commonPopNew v-if="showRule" title="温馨提示" btnName="知道了" @besure="hideRule" @close="hideRule">
      <div class="text">
        成就任务将在<span>{{countdownTime}}</span>之后进行升级，请及时领取奖励。如有不便，敬请谅解。<br>
        新版成就任务参与资格：累计充值大于20元。
      </div>
    </commonPopNew>
  </div>
</template>
<script>
import _get from "lodash.get";
import commonPopNew from "@/components/commonPopNew/commonPopNew";
export default {
  name: "costDown",
  props: ["type"],
  data: () => ({
    showFlag: false,
    countDownNum: "",
    countdownTime: "",
    showRule: false
  }),
  components: {
    commonPopNew
  },
  methods: {
    getUrlParam(ename) {
      var url = window.location.href;
      var Request = new Object();
      if (url.indexOf("?") != -1) {
        var str = url.split("?")[1];
        var strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
          Request[strs[i].split("=")[0]] = strs[i].split("=")[1];
        }
      } else {
        return "";
      }
      return Request[ename];
    },
    _getCostDown() {
      let url = "//platform-api.beeplaying.com/task/api/achievement/hide";
      this.axios.post(url).then(res => {
        let { code, data, message } = _get(res, "data");
        if (code === 200) {
          this.countDownNum = _get(res, "data.data.countdown");
          let showFlag = _get(res, "data.data.showFlag");
          if (!showFlag) {
            if (this.countDownNum > 0) {
              this.countDown(this.countDownNum);
              this.$emit("masterTaskStatus", true);
              this.showFlag = true;
              if (this.type == 2) {
                GLOBALS.marchSetsPoint("A_H5PT0061002220", {
                  from_project_id: this.getUrlParam("gametype")
                });
              } else {
                GLOBALS.marchSetsPoint("A_H5PT0033002223");
              }
            } else {
              this.$emit("masterTaskStatus", false);
              this.showFlag = false;
            }
          } else {
            this.showFlag = false;
            this.$emit("masterTaskStatus", true);
          }
        }
      });
    },
    countDown(data) {
      if (!data) return false;
      let date = data / 1000;
      this.timer = setInterval(() => {
        date = date - 1;
        if (date <= 0) {
          date = 0;
          clearInterval(this.timer);
          this.$emit("masterTaskStatus", false);
          this.showFlag = false;
        }
        let day = Math.floor(date / 86400);
        let hour = Math.floor(parseInt(date / 60 / 60) % 24);
        let minute = Math.floor(parseInt(date / 60) % 60);
        let second = Math.floor(date % 60);
        let countDay = day >= 10 ? day : "0" + day;
        let countHour = hour >= 10 ? hour : "0" + hour;
        let countMinute = minute >= 10 ? minute : "0" + minute;
        let countSecond = second >= 10 ? second : "0" + second;
        if (day > 0) {
          this.countdownTime = `${countDay}天${countHour}:${countMinute}:${countSecond}`;
        } else {
          this.countdownTime = `${countHour}:${countMinute}:${countSecond}`;
        }
      }, 1000);
    },
    openRule() {
      this.showRule = true;
      if (this.type == 2) {
        GLOBALS.marchSetsPoint("A_H5PT0061002219", {
          from_project_id: this.getUrlParam("gametype")
        });
      } else {
        GLOBALS.marchSetsPoint("A_H5PT0033002224");
      }
    },
    hideRule() {
      this.showRule = false;
    }
  },
  mounted() {
    this._getCostDown();
  }
};
</script>
<style scoped lang="less">
.cost-down {
  .task {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2.72rem;
    height: 0.4rem;
    background: rgba(163, 58, 77, 1);
    border-radius: 0 0 0 0.2rem;
    .count-down {
      margin-right: 0.1rem;
      white-space: nowrap;
      font-size: 0.22rem;
      color: #fedfac;
      line-height: 1;
    }
    .rule-icon {
      width: 0.25rem;
      height: 0.25rem;
      background: url(./img/rule-icon1.png) no-repeat center center / 0.24rem
        0.24rem;
    }
  }
  .task-home {
    margin: 0 auto 0.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2.72rem;
    height: 0.4rem;
    background: #a33a4d;
    border-radius: 0.04rem;
    .count-down {
      margin-right: 0.1rem;
      white-space: nowrap;
      font-size: 0.22rem;
      color: #fedfac;
      line-height: 1;
    }
    .rule-icon {
      width: 0.25rem;
      height: 0.25rem;
      background: url(./img/rule-icon1.png) no-repeat center center / 0.24rem
        0.24rem;
    }
  }

  .text {
    text-align: left;
    padding: 0.3rem;
    font-size: 0.24rem;
    color: #ffffff;
    line-height: 0.4rem;
    span {
      color: #fee1b0;
    }
  }
}
</style>