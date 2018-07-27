<template>
  <div class="container">
    <div class="header">
      活动详情
    </div>
    <div class="body">
      <div class="title">
        {{activityInfo.title}}
      </div>
      <div class="time">
        {{activityInfo.updateTime}}
      </div>
      <div class="content" v-html="activityInfo.content">

      </div>
    </div>
    <div class="footer">
      <div class="backtolist" @click="backtolist(activityInfo)">
        返回列表
      </div>
      <div class="gotogame" @click="gotogame(activityInfo)">
        进入游戏
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { jumpToGame } from "./js/utils";

export default {
  computed: {
    ...mapGetters(["activityInfo", "userInfo"])
  },
  methods: {
    backtolist(item) {
      let params = {
        target_project_id: item.gameType,
        awards_id: item.id,
        awards_name: item.name,
        game_phase: item.activityStartTime + "-" + item.activityEndTime,
        event_id: 1202020101,
        event_name: "活动-返回列表"
      };
      this.checkPoint(params, this.userInfo, this);
      this.$router.push({ name: "app", params: { tab: 0 } });
    },
    gotogame(item) {
      let params = {
        target_project_id: item.gameType,
        awards_id: item.id,
        awards_name: item.name,
        game_phase: item.activityStartTime + "-" + item.activityEndTime,
        event_name: "活动-进入游戏",
        event_id: 1202020102
      };
      this.checkPoint(params, this.userInfo, this);
      this.$load.show();
      jumpToGame(item);
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (vm.$route.params.id) {
        vm.$store
          .dispatch("GetActivity", { id: vm.$route.params.id })
          .then(_ => {
            vm.$nextTick(_ => {
              setTimeout(() => {
                let imgArr = document.getElementsByTagName("img");
                for (let i of imgArr) {
                  i.style.width = 100 + "%";
                }
              }, 1);
            });
          });
      } else {
        vm.$router.push({ name: "app" });
      }
    });
  },
  mounted() {
    this.$nextTick(_ => {
      setTimeout(() => {
        let imgArr = document.getElementsByTagName("img");
        for (let i of imgArr) {
          console.log(1);
          i.style.width = 100 + "%";
        }
      }, 1);
    });
  },
  beforeRouteUpdate(to, from, next) {
    if (to.params.id) {
      this.$store
        .dispatch("GetActivity", { id: this.$route.params.id })
        .then(_ => {
          next();
        })
        .catch(_ => {
          this.$router.push({ name: "app" });
        });
    } else {
      this.$router.push({ name: "app" });
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  .header {
    font-size: 0.3rem;
    color: #fff;
    height: 0.88rem;
    line-height: 0.88rem;
    width: 100%;
    background-color: #d73c1e;
    text-align: center;
    position: fixed;
    top: 0;
    left: 0;
  }
  .body {
    box-sizing: border-box;
    padding: 1.26rem 0.25rem 1rem 0.27rem;
    .title {
      font-size: 0.38rem;
      color: #2c2c2c;
      margin-bottom: 0.2rem;
    }
    .time {
      color: #666666;
      font-size: 0.2rem;
      margin-bottom: 0.38rem;
    }
    .content {
      font-size: 0.32rem;
      color: #2c2c2c;
      // text-indent: 2em;
    }
  }
  .footer {
    height: 0.96rem;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    text-align: center;
    font-size: 0.3rem;
    display: flex;
    line-height: 0.96rem;
    .backtolist {
      color: #ffc6b7;
      width: 50%;
      background: linear-gradient(#ef720c, #d73c1e);
    }
    .gotogame {
      color: #fffefe;
      width: 50%;
      background: linear-gradient(#fff000, #ff8a00);
    }
  }
}
</style>
