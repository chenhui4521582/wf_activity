<template lang="html">
    <div class="container">
        <div class="spinner">
            <div class="bar1" :style="{'background': color}"></div>
            <div class="bar2" :style="{'background': color}"></div>
            <div class="bar3" :style="{'background': color}"></div>
            <div class="bar4" :style="{'background': color}"></div>
            <div class="bar5" :style="{'background': color}"></div>
            <div class="bar6" :style="{'background': color}"></div>
            <div class="bar7" :style="{'background': color}"></div>
            <div class="bar8" :style="{'background': color}"></div>
            <div class="bar9" :style="{'background': color}"></div>
            <div class="bar10" :style="{'background': color}"></div>
            <div class="bar11" :style="{'background': color}"></div>
            <div class="bar12" :style="{'background': color}"></div>
        </div>
    </div>
</template>

<script>
export default {
    name : 'loading-animation',
    props: {
        color: {
            type: String,
            default: '#fff'
        }
    }
}
</script>

<style lang="less" scoped>
.container {
    width: 30px;
    height: 30px;
    -webkit-border-radius: 10%;
}
.spinner {
    height: 100%;
    width: 100%;
    position: relative;
    margin: 0 auto;
}
.spinner div {
     width: 10%;
     height: 26%;
     background-color: white;
     position: absolute;
     left: 44.5%;
     top: 37%;
     opacity: 0;
     -webkit-border-radius: 30%;
     -webkit-animation: fade 1s linear infinite;
}
.spinner div.bar1 {-webkit-transform:rotate(0deg) translate(0, -142%); -webkit-animation-delay: 0s;}
.spinner div.bar2 {-webkit-transform:rotate(30deg) translate(0, -142%); -webkit-animation-delay: -0.9167s;}
.spinner div.bar3 {-webkit-transform:rotate(60deg) translate(0, -142%); -webkit-animation-delay: -0.833s;}
.spinner div.bar4 {-webkit-transform:rotate(90deg) translate(0, -142%); -webkit-animation-delay: -0.75s;}
.spinner div.bar5 {-webkit-transform:rotate(120deg) translate(0, -142%); -webkit-animation-delay: -0.667s;}
.spinner div.bar6 {-webkit-transform:rotate(150deg) translate(0, -142%); -webkit-animation-delay: -0.5833s;}
.spinner div.bar7 {-webkit-transform:rotate(180deg) translate(0, -142%); -webkit-animation-delay: -0.5s;}
.spinner div.bar8 {-webkit-transform:rotate(210deg) translate(0, -142%); -webkit-animation-delay: -0.41667s;}
.spinner div.bar9 {-webkit-transform:rotate(240deg) translate(0, -142%); -webkit-animation-delay: -0.333s;}
.spinner div.bar10 {-webkit-transform:rotate(270deg) translate(0, -142%); -webkit-animation-delay: -0.25s;}
.spinner div.bar11 {-webkit-transform:rotate(300deg) translate(0, -142%); -webkit-animation-delay: -0.1667s;}
.spinner div.bar12 {-webkit-transform:rotate(330deg) translate(0, -142%); -webkit-animation-delay: -0.0833s;}

@-webkit-keyframes fade{
 from {opacity: .8;}
 to {opacity: 0.25;}
}
</style>
