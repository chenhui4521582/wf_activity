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
          background: '#FFA200',
          height: '.94rem',
          borderRadius: '.2rem .2rem 0 0'
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
          background: '#FFA200',
          borderRadius: '.2rem .2rem 0 0'
        },
        tabBg: {
          height: '.76rem'
        },
        tabs: {
          btnText: ['获得号码', '有奖排行榜'],
          btnDefaultStyle: {
            color: '#FFF',
            background: '#FF7101'
          },
          activeStyle: {
            color: '#FFF',
            background: '#FFA200'
          }
        },
        info: {
          titles: ['每日任务送号码（每日重置）', '玩游戏得号码', '超值礼包额外加赠'],
          sideTitle: '在游戏中（除套圈，枪火英雄，麻将，斗地主，飞机大战， 生肖大作战及跑得快）消耗金叶可以获得对应数量的号码'
        },
        percentBg: '#dc322a',
        packageImgs: [`${require(`./img/common/package1.png`)}`, `${require(`./img/common/package2.png`)}`, `${require(`./img/common/package3.png`)}`],
        packageBlockBg: '#C7D4FF',
        packageBlockTextColor: '#9A5619',
        packageBlockBtnBg: '#E74615',
        rank: {
          title: {
            url: `${require(`./img/common/rank_title.png`)}`,
            style: {
              width: '4.66rem',
              height: '.46rem'
            }
          }
        }
      }
    }
  }
}

export default ModuleConfig
