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

//思路一：利用二分查找logN
//思路二： 利用链表可以方便你的插入，但是不可以二分查找
//思路三： 所以利用排序二叉树来兼顾插入方便以及查找的效率是logN 。但是需要占用额外空间。BST 比较平衡的状态， logN  * N  + N （时间复杂度）

/**
 * 插入排序
 *
 * @param {*} ary
 * @returns {Arrray} 排序完成的数组
 */
function insertSort(ary) {
  return ary.reduce(insert, [])
}

/**
 * 使用二分法完成查找插值位置，并完成插值操作。
 * 时间复杂度 logN
 * @param {*} sortAry 有序数组部分
 * @param {*} val
 * @returns
 */
function insert(sortAry, val) {
  var l = sortAry.length
  if (l == 0) {
    sortAry.push(val)
    return sortAry
  }

  var i = 0,
    j = l,
    mid
  //先判断是否为极端值
  if (val < sortAry[i]) {
    return sortAry.unshift(val), sortAry
  }
  if (val >= sortAry[l - 1]) {
    return sortAry.push(val), sortAry
  }

  while (i < j) {
    mid = ((j + i) / 2) | 0
    //结束条件 等价于j - i ==1
    if (i == mid) {
      break
    }
    if (val < sortAry[mid]) {
      j = mid
    }
    if (val == sortAry[mid]) {
      i = mid
      break
    }
    //结束条件 统一对外输出i
    if (val > sortAry[mid]) {
      i = mid
    }
  }
  //分为三个字符串连接
  var midArray = [val]
  var lastArray = sortAry.slice(i + 1)
  sortAry = sortAry
    .slice(0, i + 1)
    .concat(midArray)
    .concat(lastArray)
  return sortAry
}

function BStTree(ary) {
  return ary.reduce((root, val) => {
    return insert2BST(root, val)
  }, null)
}
//BST排序 排序二叉树排序
var root = ary2tree
function insert2BST(root, val) {
  //如果没有结点创建一个节点
  if (!root) {
    return {
      val: val,
      left: null,
      right: null
    }
  }
  //如果该数小于root 结点值，保留左节点指针，进入栈，在往下进行判断，
  if (val <= root.val) {
    root.left = insert2BST(root.left, val)
  }
  if (val > root.val) {
    root.right = insert2BST(root.right, val)
  }
  return root
}
