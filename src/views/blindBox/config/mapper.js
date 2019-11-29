export default function (obj) {
  let mapperObj = []
  for (const res of Object.entries(obj)) {
    mapperObj.push(
      {
        label: res[1],
        value: res[0]
      }
    )
  }
  return mapperObj
}
