<template>
  <div class="adverContainer" :style="{backgroundImage:`url(${backgroundImage})`}">
    <div class="gotodetails" @click="gotodetail">
      查看详情>
    </div>
    <div class="gotogame" @click="gotogame">
      进入游戏
    </div>
  </div>
</template>

<script>
import API from "./js/api.js";
import { mapGetters } from "vuex";
import { jumpToGame } from "./js/utils.js";
export default {
  name: "adver",
  data() {
    return {
      backgroundImage: "",
      gameItem: {
        url: ""
      },
      detailLink: ""
    };
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  methods: {
    gotodetail() {
      let params = {
        event_id: 1207000903,
        event_name: "H5平台-逐日战神限时活动悬浮-查看详情",
        platform_id: 40000,
        project_name: "平台"
      };
      this.checkPoint(params, this.userInfo, this);
      location.href = this.detailLink;
    },
    gotogame() {
      let params = {
        event_id: 1207000902,
        event_name: "H5平台-逐日战神限时活动悬浮-开始游戏",
        platform_id: 40000,
        project_name: "平台"
      };
      this.checkPoint(params, this.userInfo, this);
      this.$load.show();
      jumpToGame(this.gameItem);
      setTimeout(() => {
        this.$load.hide();
      }, 1000);
    }
  },
  beforeRouteEnter(to, from, next) {
    //does NOT have access to `this` component instance}
    next(vm => {
      vm.$load.show();
      vm.axios
        .post(API.adverDetails)
        .then(res => {
          if (res.code == 200) {
            try {
              let link = JSON.parse(res.data.link);
              if (link.linkUrl && !link.linkUrl.includes("http")) {
                vm.backgroundImage = "//file.beeplaying.com" + link.linkUrl;
              } else {
                vm.backgroundImage = link.linkUrl;
              }
              vm.gameItem.url = link.inGameUrl;
              vm.detailLink = link.detailUrl;
              vm.$load.hide();
            } catch (error) {
              vm.$toast.show({
                message: "获取信息失败"
              });
              vm.$load.hide();
            }
          }
        })
        .catch(err => {
          vm.$toast.show({
            message: "获取信息失败"
          });
          vm.$load.hide();
        });
    });
  }
};
</script>

<style scoped lang="less">
.adverContainer {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  // background-image: url()
  background-size: 100% 100%;
  background-repeat: no-repeat;
  text-align: center;
  .gotodetails {
    width: 1.56rem;
    height: 0.53rem;
    line-height: 0.53rem;
    color: #521c0f;
    font-size: 0.26rem;
    background-image: url("./image/readDetails.png");
    background-size: 100% 100%;
    position: absolute;
    right: 0.45rem;
    top: 0.79rem;
  }
  .gotogame {
    font-size: 0.36rem;
    color: #5b1e0f;
    width: 5.31rem;
    height: 0.91rem;
    line-height: 0.91rem;
    font-family: "SourceHanSansCN-Bold";
    position: absolute;
    bottom: 0.88rem;
    left: 50%;
    transform: translateX(-50%);
    background-image: url(./image/gotogame.png);
    background-size: 100% 100%;
  }
}
</style>
