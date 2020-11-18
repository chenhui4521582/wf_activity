/*
*  配置文件控制 不同渠道不同  ui 展示方案
*  @ plantVersion  平台版本
*  @ operations   首页金刚位置
*  @ activityEntry  首页悬浮活动中心
*  @ basefooter  公共底部
*  @ baseHeader  公共头部
*  @ versionClass 不同版本ClassName
*  @ themes 当前的主题
*  @ achievement 任务大厅图标
*  @
*  @
*  @
*/
import _get from 'lodash.get'

const ModuleConfig = {
  superLotto: {
    dropDown: {
      out: {
        bg: {
          height: '.94rem',
        },
        line: {
          height: '.69rem',
          background: 'rgba(255,255,255,1)'
        },
        tabs: [
          {
            btnText: '获取号码',
            btnStyle: {
              color: '#FFFFFF',
              background: '#F9B397'
            },
            mainText: null
          },
          {
            btnbg: '#FF568E',
            btnText: '有奖排行榜',
            btncolor: '#FFFFFF',
            btnStyle: {
              color: '#FFFFFF',
              background: '#FF568E'
            },
            mainText: null
          }
        ]
      },
      inner: {
        bg: {
          background: '#278DC7',
          border: '.01rem solid rgba(255, 231, 149, 0.99)',
          borderRadius: '.2rem .2rem 0 0'
        },
        tabBg: {
          height: '.76rem'
        },
        tabs: {
          btnText: ['获得号码', '有奖排行榜'],
          btnDefaultStyle: {
            color: '#FFF',
            background: '#0067A1'
          },
          activeStyle: {
            color: '#FFF',
            background: '#FFA200'
          }
        },
        info: {
          titles: ['游戏支持金叶获奖杯', '专属礼包'],
          sideTitle: '计入活动的游戏：糖果萌消消、街机欢乐捕鱼、疯狂炸弹人、 三国大作战、欢乐竞技台球、众神风云、破晓方块消消乐、斗 西游、王者弹珠、欢乐的小鸟、天使之战'
        },
        percentBg: '#dc322a',
        packageImgs: [`${require(`./img/package.png`)}`, `${require(`./img/package.png`)}`, `${require(`./img/package.png`)}`],
        packageBlockBg: '#EAF7FF',
        packageBlockTextColor: '#9A5619',
        packageBlockBtnBg: '#E74615',
      }
    }
  }
}
export default ModuleConfig
