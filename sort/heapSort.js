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


  /**
   * 聚堆：将数组中的某一项作为堆顶，调整为最大堆。
   * 把在堆顶位置的一个可能不是堆，但左右子树都是堆的树调整成堆。
   * 
   * @param {*} ary 待排序数组
   * @param {*} topIndex 当前处理的堆的堆顶
   * @param {*} [endIndex=ary.length - 1] 数组的末尾边界
   */
  function reheap(ary, topIndex, endIndex = ary.length - 1) {
    if (topIndex > endIndex) {
      return
    }

    var largestIndex = topIndex
    var leftIndex = topIndex * 2 + 1
    var rightIndex = topIndex * 2 + 2

    if (leftIndex <= endIndex && ary[leftIndex] > ary[largestIndex]) {
      largestIndex = leftIndex
    }
    if (rightIndex <= endIndex && ary[rightIndex] > ary[largestIndex]) {
      largestIndex = rightIndex
    }

    if (largestIndex != topIndex) {
      swap(ary, largestIndex, topIndex)
      reheap(ary, largestIndex, endIndex)
    }
  }


  /**
   * 将数组调整为最大堆结构
   *
   * @param {*} ary
   * @returns
   */
  function heapify(ary) {
    for (var i = ary.length - 1; i >= 0; i--) {
      reheap(ary, i)
    }
    return ary
  }

 /**
  * 堆排序
  *
  * @param {*} ary
  * @returns
  */
 function heapSort(ary) {
    heapify(ary)
    for (var i = ary.length - 1; i >= 1; i--) {
      swap(ary, 0, i)
      reheap(ary, 0, i - 1)
    }
    return ary
  }