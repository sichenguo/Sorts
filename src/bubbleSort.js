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

// 假设我们最终需要的是依次递增的有序数组
// 1. 从数组的第一位开始，依次向后比较相邻元素的大小，如果前一个比后一个小，那么交换二者位置，直至数组末尾。
// 2. 下一轮比较的起始位置加1，然后重复第一步。
// 重复1~2，直至排序结束。

function bubbleSort1(ary) {
  var l = ary.length
  for (var i = 0; i < l; i++) {
    for (var j = 0; j < l; j++) {
      if (ary[j] > ary[j + 1]) {
        swap(ary, j, j + 1)
      }
    }
  }
  return ary
}

// 优化：
// 上述排序对于一个长度为 n 的数组排序需要进行 n * n 次排序。（内外两层循环次数都是 n ）
// 可以预见到的是，每进行一轮从前之后的比较，从数组末尾起有序的元素就会加一，这就意味着数组末尾的有序数组进行比较的操作是无用的。
function bubbleSort2(ary) {
  var l = ary.length
  for (var i = l - 1; i >= 0; i--) {
    // 优化的部分 arr[i]及之后的部分都是有序的
    for (var j = 0; j < i; j++) {
      if (ary[j] > ary[j + 1]) {
        swap(ary, j, j + 1)
      }
    }
  }
  return ary
}
// 优化点：对于一些比较极限情况的处理，举一个比较极限的例子，假如给定的数组已经是有序数组了，那么 bubbleSort1 和
// bubbleSort2 还是傻傻的去走完预定的次数 分别为 n*n 和 n!。
// 当然这种情况并不容易遇到，但是在排序的后段部分很容易遇到的是，理论上应该是未排序的部分其实已经是有序的了，我`们需要对这种情况进行甄别并处理。
// 引入一个 swapedFlag ，如果在排序的上一步没有进入内层循环，那么表明剩余元素都是有序的，排序完成。
/**
 * 冒泡排序 优化
 *
 * @param {Array} ary
 * @returns
 */
function bubbleSort3(ary) {
  var l = ary.length
  var swapedFlag
  for (var i = l - 1; i >= 0; i--) {
    swapedFlag = false
    for (var j = 0; j < i; j++) {
      if (ary[j] > ary[j + 1]) {
        swapedFlag = true
        swap(ary, j, j + 1)
      }
    }
    if (!swapedFlag) {
      break
    }
  }
  return ary
}
