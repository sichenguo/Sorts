/**
 * 生成随机数
 *
 * @param { Numer} n 数组长度
 * @returns
 */
function randomRange(n) {
  return new Array(n).fill(0).map(_ => (Math.random() * n) | 0)
}
/**
 * 交换数组项 正序
 *
 * @param {Array} ary
 * @param {*} x
 * @param {*} y
 */
function swap(ary, x, y) {
  if (x === y) return
  var temp = ary[x]
  ary[x] = ary[y]
  ary[y] = temp
}
var _toString = Object.prototype.toString

/**
 * 测试排序算法的耗时
 *
 * @param {*} count
 * @param {*} l
 * @param {*} sortFnArr
 */
function testPerformance(count, l, sortFnArr) {
  let unSortArr, sortArr, unSortArrCopy
  new Array(count).fill(0).forEach(it => {
    unSortArr = randomRange(l)
    _toString.call(sortFnArr) == '[object Function]'
      ? (sortFnArr = [sortFnArr])
      : null

    sortFnArr.forEach(fn => {
      console.time(fn.name + ' 函数用时')
      unSortArrCopy = [...unSortArr]
      sortArr = fn(unSortArr)
      console.timeEnd(fn.name + ' 函数用时')
    })
    console.log(`
        未排序数组：${unSortArrCopy}
        已排序数组：${sortArr}`)
  })
}

//----------------------------

// 采用自上而下的递归方法
function mergeSort(ary) {
  if (ary.length < 2) {
    return ary.slice()
  }

  var mid = Math.floor(ary.length / 2)
  var left = mergeSort(ary.slice(0, mid))
  var right = mergeSort(ary.slice(mid))
  var result = []

  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      result.push(left.shift())
    } else {
      result.push(right.shift())
    }
  }

  result.push(...left, ...right)

  return result
}
