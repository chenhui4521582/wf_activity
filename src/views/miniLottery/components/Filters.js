export default [
  {
    name: 'filter',
    method: url => {
      if (url && !url.includes('://') && !url.includes('data:image')) {
        return '//file.beeplaying.com' + url
      } else {
        return url
      }
    }
  },
  {
    name: 'tenThousand',
    method: amount => {
      function doTenThousand(amount) {
        let avg = (a, b) => {
            var res = parseFloat(a / b)
            return res
          },
          len = amount.toString().length
        if (len >= 5) {
          amount = avg(amount, 10000) + '万'
        }
        return amount
      }
      if (typeof amount == 'string') {
        return amount.replace(/\d+/, function(rs) {
          return doTenThousand(rs)
        })
      } else if (typeof amount == 'number') {
        return doTenThousand(amount)
      } else {
        return 0
      }
    }
  },
  {
    name: 'formatTime',
    method: (date, type) => {
      if (date instanceof Date) {
        date = data.getTime()
      } else {
        date = new Date(date)
      }
      let y = date.getFullYear()
      let m = date.getMonth() + 1
      let d = date.getDate()
      let h = date.getHours()
      let minute = date.getMinutes()
      let second = date.getSeconds()
      m = m < 10 ? `0${m}` : m
      d = d < 10 ? `0${d}` : d
      h = h < 10 ? `0${h}` : h
      minute = minute < 10 ? `0${minute}` : minute
      second = second < 10 ? `0${second}` : second
      if (type === 'y-m-d h:m:s') {
        return `${y}-${m}-${d} ${h}:${minute}:${second}`
      } else if (type === 'y-m-d') {
        return `${y}-${m}-${d}`
      } else if (type === 'm-d') {
        return `${m}-${d}`
      } else if (type === 'y.m.d') {
        return `${y}.${m}.${d}`
      } else if (type === 'm.d') {
        return `${m}.${d}`
      } else if (type === 'm-d h:f') {
        return `${m}-${d} ${h}:${minute}`
      } else {
        return `${y}-${m}-${d} ${h}:${minute}:${second}`
      }
    }
  },
  {
    name: 'amountComputen',
    method: (val)=> {
      if(!val){return 0}
      return val > 10000?(val/10000).toFixed(2) +'万' :val
    }
  }
  
]
