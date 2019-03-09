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


//-----------------------------

//快排粗暴版本

function quickSort1(ary) {
  if (ary.length < 2) {
    return ary.slice()
  }
  var pivot = ary[Math.floor(Math.random() * ary.length)]
  var left = []
  var middle = []
  var right = []
  for (var i = 0; i < ary.length; i++) {
    var val = ary[i]
    if (val < pivot) {
      left.push(val)
    }
    if (val === pivot) {
      middle.push(val)
    }
    if (val > pivot) {
      right.push(val)
    }
  }

  return quickSort1(left).concat(middle, quickSort(right))
}


function quickSort2(ary, comparator = (a, b) => a - b) {
  return partition(ary, comparator)
}
function partition(ary, comparator, start = 0, end = ary.length - 1, ) {
  if (start >= end) {
    return
  }

  var pivotIndex = Math.floor(Math.random() * (end - start + 1) + start)
  var pivot = ary[pivotIndex]

  swap(ary, pivotIndex, end)

  for (var i = start - 1, j = start; j < end; j++) {
    if (comparator(ary[j], pivot) < 0) {
      i++
      swap(ary, i, j)
    }
  }

  swap(ary, i + 1, end)
  partition(ary, comparator, start, i)
  partition(ary, comparator, i + 2, end)
  return ary
}
