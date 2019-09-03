<template>
  <div id="projects">
    {{canClick}}
    {{showcontrolcss}}
    <button @click="reset">重置</button>
    <div class="grid">
      <div class="projects">
        <div :class="classNames(item,index)" v-for="(item,index) in 9" @click="clickCard(item,index)">
          <template v-if="!(index==4&&!showcontrolcss)">
            <div class="mask">
              <div class="back"></div>
              <div class="front"></div>
            </div>
          </template>
          <template v-else>
            <span class="bottom"></span>
            <span class="bottom"></span>
            <span class="bottom"></span>
            <div class="mask"></div>
          </template>
        </div>
        <!--<div class="project ">-->
          <!--<div class="mask">-->
            <!--<div class="back"></div>-->
            <!--<div class="front"></div>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="project ">-->
          <!--<div class="mask">-->
            <!--<div class="back"></div>-->
            <!--<div class="front"></div>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="project ">-->
          <!--<div class="mask">-->
            <!--<div class="back"></div>-->
            <!--<div class="front"></div>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="project ">-->
          <!--<div class="mask">-->
            <!--<div class="back"></div>-->
            <!--<div class="front"></div>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="project ">-->
          <!--<div class="mask">-->
            <!--<div class="back"></div>-->
            <!--<div class="front"></div>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="project ">-->
          <!--<div class="mask">-->
            <!--<div class="back"></div>-->
            <!--<div class="front"></div>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="project ">-->
          <!--<div class="mask">-->
            <!--<div class="back"></div>-->
            <!--<div class="front"></div>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="project ">-->
          <!--<div class="mask">-->
            <!--<div class="back"></div>-->
            <!--<div class="front"></div>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="controls" @click="showcontrol" :class="{show:showcontrolcss}">-->
          <!--<span class="bottom"></span>-->
          <!--<span class="bottom"></span>-->
          <!--<span class="bottom"></span>-->
          <!--<div class="mask">-->
          <!--</div>-->
        <!--</div>-->
      </div>
    </div>
  </div>
</template>

<script>
  import utils from '../../common/js/utils.js'
  import AppCall from '../../common/js/AppCall.js';
  import API from '../../api';
  import base64url from 'base64-url'

  export default {
    name: 'app',
    data() {
      return {
        showcontrolcss:true,
        cardsClicked:[],
        canClick:false,
        currentCardIndex:[],
        classNamesArr:[]
      }
    },
    methods:{
      classNames(item,index){
        let arr=['project']
        if(index==4){
          arr.push("ani4")
          arr.push(!this.showcontrolcss?"controls":'show')
        }else{
          this.classNamesArr[index>4?index-1:index]&&arr.push(this.classNamesArr[index>4?index-1:index])
        }
        if(this.currentCardIndex.includes(index)) {
          arr.push('currentCardIndex')
        }
        return arr.join(' ')
      },
      addMove(){
        $('.project').each((index,item)=>{
          if(index!=4){
            setTimeout(()=>{
              this.classNamesArr.push('ani'+ index);
            },(index>4?index-1:index)*100);
          }
        })
      },
      subMove(){
        $('.project').each((index,item)=>{
          if(index!=4){
            setTimeout(()=>{
              this.classNamesArr.pop();
            },100*(index>4?index-1:index));
          }
        })
      },
      showcontrol(){
        if(this.showcontrolcss){
          this.showcontrolcss=false
          this.subMove();
        }else{
          this.showcontrolcss=true
          this.addMove();
        }
      },
      reset(){
        this.canClick=false
        this.showcontrolcss=false
        this.currentCardIndex=[]
        this.subMove();
      },
      clickCard(item,index){
        if(this.canClick||this.showcontrolcss){
          this.currentCardIndex.push(index)
        }
      }
    },
    mounted(){
      this.classNamesArr=['ani0','ani1','ani2','ani3','ani5','ani6','ani7','ani8']
      setTimeout(()=>{
        this.showcontrolcss=false
        this.subMove();
      },100)
      $('.project').get(7).addEventListener("transitionstart",()=>{
        this.canClick=false
      })
      $('.project').get(0).addEventListener("transitionend",()=>{
        this.canClick=this.showcontrolcss
        if(!this.showcontrolcss){
          this.showcontrolcss=true
          this.addMove();
        }
      })
    }
  }
</script>

<style lang="less" scoped>
  @import '../../common/css/base.css';
  #projects, #projects .grid {
    height: 1100*0.01rem;
  }
  #projects {
    background-color: #ef4036;
    overflow: hidden;
  }

  .project {
    position: absolute;
    right: 1.75rem;
    top: 2.2rem;
  }
  .project {
    float: left;
    width: 164*0.01rem;
    height: 210*0.01rem;
  }
  .grid {
    //width: 1170*0.01rem;
    margin: 0 auto;
    position: relative;
  }
  div.projects {
    height: 650*0.01rem;
  }
  div.projects {
    float: left;
    width: 5.15rem;
    position: relative;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
  }
  div.projects .controls {
    position: absolute;
    left: 1.75rem;
    top: 2.2rem;
  }
  div.projects .controls {
    float: left;
    width: 164*0.01rem;
    height: 210*0.01rem;
  }
  .controls .mask {
    float: left;
    position: relative;
    background: url(https://www.17sucai.com/preview/505487/2017-01-13/poker/project_card_bg.png) no-repeat;
    background-size: 100% 100%;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  div.projects .controls .bottom{
    -webkit-transition: all .3s ease;
    -moz-transition: all .3s ease;
    -o-transition: all .3s ease;
    -ms-transition: all .3s ease;
    transition: all .3s ease;
  }
  div.projects .controls .bottom {
    background: url(https://www.17sucai.com/preview/505487/2017-01-13/poker/project_card_bot_bg.png) no-repeat;
    position: absolute;
    bottom: -9*0.01rem;
    right: 0;
    width: 164*0.01rem;
    height: 66*0.01rem;
  }
  .project.ani0 {
    right: 3.5rem;
    top: 0;
  }
  .project.ani1 {
    left: 1.75rem;
    top: 0;
  }
  .project.ani2 {
    right: 0;
    top: 0;
  }
  .project.ani3 {
    right: 3.5rem;
    top: 2.2rem;
  }
  .project.ani4 {
    left: 1.75rem;
    top: 2.2rem;
  }
  .project.ani5 {
    right: 0;
    top: 2.2rem;
  }
  .project.ani6 {
    right: 3.5rem;
    top: 4.4rem;
  }
  .project.ani7 {
    left: 1.75rem;
    top: 4.4rem;}
  .project.ani8 {
    right: 0;
    top: 4.4rem;
  }

  .project .front {
    background: url(https://www.17sucai.com/preview/505487/2017-01-13/poker/project_front_bg.png) no-repeat;
    background-size: 100% 100%;
  }
  .project .back, .project .front {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .project .back {
    background: url(https://www.17sucai.com/preview/505487/2017-01-13/poker/project_back_bg.png) no-repeat;
    background-size: 100% 100%;
  }
  .project .back, .project .front {
    position: absolute;
    left: 0;
    top: 0;
    width: 164*0.01rem;
    height: 210*0.01rem;
    padding: 0 16*0.01rem;
    text-align: center;
  }

  .project, .project .back, .project .front, .socials a, .transform_holder .back, .transform_holder .front, .transform_holder .transform {
    -webkit-transition: all 1s cubic-bezier(0.68,-.55,.265,1.55);
    -moz-transition: all 1s cubic-bezier(0.68,-.55,.265,1.55);
    -o-transition: all 1s cubic-bezier(0.68,-.55,.265,1.55);
    -ms-transition: all 1s cubic-bezier(0.68,-.55,.265,1.55);
    transition: all 1s cubic-bezier(0.68,-.55,.265,1.55);
  }
  .project {
    -webkit-perspective: 1000;
    -moz-perspective: 1000;
    -o-perspective: 1000;
    perspective: 1000;
    -ms-transform: perspective(1000*0.01rem);
    -moz-transform: perspective(1000*0.01rem);
    -ms-transform-style: preserve-3d;
    -moz-transform-style: preserve-3d;
  }
  .project .back, .project .front {
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    -o-backface-visibility: hidden;
    -ms-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transform-style: preserve-3d;
    -moz-transform-style: preserve-3d;
    -o-transform-style: preserve-3d;
    -ms-transform-style: preserve-3d;
    transform-style: preserve-3d;
  }

  .project .front {
    -webkit-transform: rotateY(0deg);
    -ms-transform: rotateY(0deg);
  }
  .project .back {
    -webkit-transform: rotateY(180deg);
    -moz-transform: rotateY(180deg);
    -o-transform: rotateY(180deg);
    -ms-transform: rotateY(180deg);
    transform: rotateY(180deg);
  }
  .project.currentCardIndex .front {
    -webkit-transform: rotateY(180deg);
    -moz-transform: rotateY(180deg);
    -o-transform: rotateY(180deg);
    transform: rotateY(180deg);
  }

  .project.currentCardIndex .back {
    -webkit-transform: rotateY(0deg);
    -moz-transform: rotateY(0deg);
    -o-transform: rotateY(0deg);
    -ms-transform: rotateY(0deg);
    transform: rotateY(0deg);
  }
</style>
