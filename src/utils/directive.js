// timestamp to date
function timestampToTime(timestamp) {
  var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + "-";
  var M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  var D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
  var h =
    (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
  var m =
    (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
    ":";
  var s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  return Y + M + D + h + m + s;
}
//获取当前时间戳
function getUnix() {
  var date = new Date();
  return date.getTime();
}
//获取今天0点0分0秒的时间戳
function getTodayUnix() {
  var date = new Date();
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date.getTime();
}
//获取今年1月1日0点0分0秒的时间戳
function getYearUnix() {
  var date = new Date();
  date.setMonth(0);
  date.setDate(1);
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date.getTime();
}
//获取标准年月日
function getLastDate(time) {
  var date = new Date(time);
  var month =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  return date.getFullYear() + "-" + month + "-" + day;
}

// timestamp to relativeTime
function getFormatTime(timestamp) {
  timestamp = timestamp * 1000;
  var now = getUnix(); // 当前时间戳
  var today = getTodayUnix(); // 今天0点的时间戳
  // eslint-disable-next-line no-unused-vars
  var year = getYearUnix(); // 今年0点的时间戳
  var timer = (now - timestamp) / 1000; // 转换为秒级时间戳
  var tip = "";
  if (timer <= 0) {
    tip = "刚刚";
  } else if (Math.floor(timer / 60) <= 0) {
    tip = "刚刚";
  } else if (timer < 3600) {
    tip = Math.floor(timer / 60) + "分钟前";
  } else if (timer >= 3600 && timestamp - today >= 0) {
    tip = Math.floor(timer / 3600) + "小时前";
  } else if (timer / 86400 <= 31) {
    tip = Math.ceil(timer / 86400) + "天前";
  } else {
    tip = getLastDate(timestamp);
  }
  return tip;
}

// 数字金额每逢三位加, 比如 123,464.23
function numberToCurrency(value) {
  if (!value) return "0.00";
  // 将数值截取，保留两位小数
  value = value.toFixed(2);
  // 获取整数部分
  const intPart = Math.trunc(value);
  // 整数部分处理，增加,
  const intPartFormat = intPart
    .toString()
    .replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
  // 预定义小数部分
  let floatPart = ".00";
  // 将数值截取为小数部分和整数部分
  const valueArray = value.toString().split(".");
  if (valueArray.length === 2) {
    // 有小数部分
    floatPart = valueArray[1].toString();
    // 取得小数部分
    return intPartFormat + "." + floatPart;
  }
  return intPartFormat + floatPart;
}

/**
 * 时间戳(s)转换成相对时间
 * @example  1585775349 => 2天前
 */
// const relativeTime = app.directive("relativeTime", {
//   mounted: function(el, binding) {
//     el.innerHTML = getFormatTime(binding.value);
//   }
// });
const relativeTime = {
  mounted: function(el, binding) {
    el.innerHTML = getFormatTime(binding.value);
  }
};
/**
 * 时间戳(s)转换成时间
 * @example  1585775349 => 2020-04-22 15:59:29
 */
// const timeTransform = app.directive("time", {
//   mounted: function(el, binding) {
//     el.innerHTML = timestampToTime(binding.value);
//   }
// });
/**
 * 给数字添加逗号
 * @example 123464.23 => 123,464.23
 */
// const number = app.directive("number", {
//   mounted: function(el, binding) {
//     el.innerHTML = numberToCurrency(binding.value);
//   }
// });
/**
 * 按钮防止重复快速点击
 */
// const preventReClick = app.directive("preventReClick", {
//   mounted: function(el, binding) {
//     el.addEventListener("click", () => {
//       if (!el.disabled) {
//         el.disabled = true;
//         setTimeout(() => {
//           el.disabled = false;
//         }, binding.value || 2000);
//       }
//     });
//   }
// });
// export { timeTransform, relativeTime, number, preventReClick };
export { relativeTime };
