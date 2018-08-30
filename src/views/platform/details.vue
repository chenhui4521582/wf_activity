<template>
  <div class="container">
    <div class="header">
      资讯详情
    </div>
    <div class="body">
      <div class="title">
        {{articleDetails.mainTitle}}
      </div>
      <div class="time">
        {{articleDetails.updateTime}}
      </div>
      <div class="content" v-html="articleDetails.content">

      </div>
    </div>
    <div class="footer">
      <div class="backtolist" @click="backtolist(articleDetails)">
        返回列表
      </div>
      <div class="gotogame" @click="gotogame(articleDetails)">
        进入游戏
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { jumpToGame } from "./js/utils";

export default {
  methods: {
    backtolist(item) {
      let params = {
        awards_name: item.mainTitle,
        awards_id: item.id,
        target_project_id: item.gameType,
        event_name: "资讯-返回列表",
        event_id: 1202040102
      };
      this.checkPoint(params, this.userInfo, this);
      if (this.$router) {
        if (this.fromWhichList == -1) {
          this.$router.push({ name: "app", params: { tab: 2 } });
          // history.go(-1)
          // location.href = "/activities/platform.html";
        } else {
          this.$router.push({
            name: "gameNews",
            params: {
              gameType: this.fromWhichList,
              gameName: this.articleDetails.gameName
            }
          });
        }
      }
    },
    gotogame(item) {
      let params = {
        awards_name: item.mainTitle,
        awards_id: item.id,
        target_project_id: item.gameType,
        event_name: "资讯-进入游戏",
        event_id: 1202040101
      };
      this.checkPoint(params, this.userInfo, this);
      this.$load.show();
      jumpToGame(item);
      var _this = this;
      setTimeout(() => {
        _this.$load.hide()
      }, 2000);
    }
  },
  computed: {
    ...mapGetters(["articleDetails", "fromWhichList", "userInfo"])
  },
  mounted() {
    this.$nextTick(_ => {
      setTimeout(() => {
        let imgArr = document.getElementsByTagName("img");
        for (let i of imgArr) {
          i.style.width = 100 + "%";
        }
      }, 1);
    });
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$load.show()
      vm.$store
        .dispatch("GetArticle", {
          id: vm.$route.params.id,
          fromWhichList: vm.$route.params.fromWhichList
        })
        .then(_ => {
          vm.$nextTick(_ => {
            vm.$load.hide()
            setTimeout(() => {
              let imgArr = document.getElementsByTagName("img");
              for (let i of imgArr) {
                i.style.width = 100 + "%";
              }
            }, 1);
          });
        });
    });
  },
  beforeRouteUpdate(to, from, next) {
    if (to.params.id) {
      this.$store
        .dispatch("GetArticle", {
          id: to.params.id
        })
        .then(
          a => {
            next();
          },
          b => {
            this.backtolist();
          }
        );
    } else {
      this.backtolist();
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
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

