<template>
    <div class="bottom">
        <div class="bottom_img">
            <div class="inner"><span><img src="../images/bottom-left.png"></span><span class="text">点击获得更多游戏币</span><span><img src="../images/bottom-right.png"></span></div>
        </div>
    </div>
</template>
<style lang="less">
.bottom{
        position: fixed;
    bottom: 0;
}
.bottom_img{
      background: url("../images/bottom-top.png");
    background-size: 100% 100%;
    width: 7.2rem;
    height: 1rem;

}
.inner{
display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: 0.36rem;
    width: 65%;
    margin: 0 auto;
    -webkit-box-align: absolute;
    -ms-flex-align: absolute;
    align-items: absolute;
    position: relative;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    /* display: block; */
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    text-align: center;
    justify-content: space-around;
}
.inner img{
    width: 0.69rem;
    height: 0.36rem;
}
.text{
    color: #7B3317;
    font-weight: bold;
    font-size: 0.30rem;
}
</style>