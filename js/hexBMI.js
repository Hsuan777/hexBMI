// 取得 -> 各類型資料，物件、時間、瀏覽器各式資訊等等...
// 建立 -> 空物件、物件內資料、節點標籤等等...
// 事件 -> 各種事件，click、dblclick、load、scroll、input、submit等等...
// 判斷 -> 條件判斷，if、else、else if、switch、判斷運算子等等...
// 回傳 -> 回傳結果，萬用console.log();、各種條件判斷與計算結果(包含文字與值等等...)
// 組字串 -> 將資料組字串回寫到 html上
// 功能 -> 組合上述應用，依照需求重複使用

//‧取得 "資料" || 建立 "空[]"" -> 若 localStorage有資料則取出，否則存放 bmi紀錄至陣列作為物件資料使用
// - 由於瀏覽器只支援字串，必須先轉成 "字串" 再存入
// - 要使用資料時，再將資料轉成 "陣列"
// - || 優先檢查左邊，若為 true 優先回傳 "第一個"
var bmiArray = JSON.parse(localStorage.getItem('bmiRecord')) || [];
console.log(bmiArray);
// 判斷 & 組字串 -> 若有資料則顯示至頁面，若無則顯示文字
var table__BMI = document.querySelector('.table__BMI');
var tbody = document.createElement("tbody");
table__BMI.appendChild(tbody);
if (bmiArray.length === 0) {
  var tagNodata = document.createElement("h4");
  var textNodata = document.createTextNode('快來計算看看吧 !');
  tagNodata.className = 'mt-3 text-underweight';
  tagNodata.appendChild(textNodata);
  tbody.appendChild(tagNodata);
}

// 取得目前頁數，執行自動分頁，更新頁數資料
// - 預設第一頁
var pageLocalArray = JSON.parse(localStorage.getItem('pageLinkNumber')) || [1];
pageNumber(bmiArray.length);
updateBMI(pageLocalArray[0]);


// 事件 "click" -> 計算 BMI並顯示資料
var btnSubmit = document.querySelector('.js-record');
btnSubmit.addEventListener('click', function () {
  event.preventDefault();

  // 取得 input元素 "值" -> weight、height
  var weight = document.getElementById('weight').value;
  var height = document.getElementById('height').value;

  // 取得 BMI "值" -> BMI = weight 公斤 / height*height 米平方 ; 四捨五入至小數點後一位
  var bmi = (weight / ((height * height) / 10000)).toFixed(1);

  // 建立 一筆 {物件} 資料 -> 後續填完資料 bmiArray.push(bmiRecord);
  var bmiRecord = {
    "status": "",
    "BMI": bmi,
    "weight": weight,
    "height": height,
    "recordTime": "",
  };

  // 判斷 -> 使用者行為
  if (weight === "") {
    alert("請輸入體重");
  } else if (height === "") {
    alert("請輸入身高");
  } else if (bmi >= 40 || bmi <= 15) {
    alert("請勿亂打");
    location.reload();
  } else {

    // 取得 網頁元素 -> 判斷後顯示 result 
    btnSubmit.style.display = "none";
    var result = document.querySelector('.js-result');
    var resultBMI = document.querySelector('.js-resultBMI');
    var resultText = document.querySelector('.js-resultText');
    var reStart = document.querySelector('.js-reStart');
    resultBMI.textContent = bmi;

    // 判斷 -> bmi 數值範圍
    // - 寫入 {bmiRecord}.status 欄位
    // - 寫入 對應 class
    if (bmi < 18.5) {
      bmiRecord.status = "過輕";
      result.classList.add('d-block', 'result--underweight');
      resultText.textContent = "過輕";
      resultText.classList.add('d-md-block', 'text-underweight');
      reStart.classList.add('btn-underweight');
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      bmiRecord.status = "理想";
      result.classList.add('d-block', 'result--healthy');
      resultText.textContent = "理想";
      resultText.classList.add('d-md-block', 'text-healthy');
      reStart.classList.add('btn-healthy');

    } else if (bmi > 24.9) {
      bmiRecord.status = "危險";
      result.classList.add('d-block', 'result--danger');
      resultText.textContent = "危險";
      resultText.classList.add('d-md-block', 'text-danger');
      reStart.classList.add('btn-danger');
    }

    // 回傳 時間 -> 按下按鈕當前時間並寫入 {bmiRecord}.recordTime 欄位
    bmiRecord.recordTime = timeFunction();

    // 建立 陣列新資料 -> 存放至 bmiArray[]
    bmiArray.push(bmiRecord);

    // 建立 BOM localStorage新資料 -> 轉成字串後，存放至瀏覽器 localStorage
    localStorage.setItem('bmiRecord', JSON.stringify(bmiArray));

    // 強迫跳傳至第一頁
    // pageLocalArray[0] = 1;
    // localStorage.setItem('pageLinkNumber', JSON.stringify(pageLocalArray));
    // 跟重新整理按鈕意義衝突
  }
});


// 事件 -> 點擊上下頁
// TODO: 直接點擊第二頁，pageLocalArray[0] - 1 === 0 為 true
var pageLink = document.querySelectorAll('.page-link');
pageLink[0].addEventListener('click', function () {
  if (pageLocalArray[0] - 1 === 0) {
    alert('已經在第一頁 !')
    return;
  } else {
    pageLocalArray[0] = pageLocalArray[0] - 1;
    localStorage.setItem('pageLinkNumber', JSON.stringify(pageLocalArray));
    var tr = document.querySelectorAll("tr");
    for (i = 0; i < tr.length; i++) {
      tbody.removeChild(tr[i]);
    }
    updateBMI(pageLocalArray[0]);
  }

});
var pageLink = document.querySelectorAll('.page-link');
console.log(pageLink[pageLink.length - 1]);
pageLink[pageLink.length - 1].addEventListener('click', function () {
  if (pageLocalArray[0] + 1 === pageLink.length -1) {
    alert('最後一頁囉 !')
    return;
  } else {
    pageLocalArray[0] = pageLocalArray[0] + 1;
    localStorage.setItem('pageLinkNumber', JSON.stringify(pageLocalArray));
    var tr = document.querySelectorAll("tr");
    for (i = 0; i < tr.length; i++) {
      tbody.removeChild(tr[i]);
    }
    updateBMI(pageLocalArray[0]);
  }
});


// 事件 "click" -> 清空 localStorage資料
var btnClear = document.querySelector('.js-clear');
btnClear.addEventListener('click', function () {
  event.preventDefault();
  localStorage.clear('bmiRecord');
  location.reload();
}, false);


// 事件 -> 重新整理頁面
var reStart = document.querySelector('.js-reStart');
reStart.addEventListener('click', function () {
  location.reload();
});


// 事件 BOM 'onscroll' -> 每當畫面捲動觸發一次 scrollFunction();
// - 參考網址: https://mrcodingroom.freesite.host/htmlcssjs%E7%B0%A1%E6%98%93%E7%BD%AE%E9%A0%82%E6%8C%89%E9%88%95/
window.onscroll = function () {
  scrollFunction();
};





// 功能 -> 自動分頁
// - 主要代入 bmiArray.length，計算分頁
// - 預設 10筆資料
// - 若無資料，則不顯示
function pageNumber(num) {
  // 取得 -> 分頁 ul 與 清空按鈕
  var pagination = document.querySelector('.pagination');
  var btnClear = document.querySelector('.js-clear');
  // 判斷 -> 若無資料則都不顯示，若有資料則增加分頁節點
  if (num === 0) {
    pagination.style.display = 'none';
    btnClear.style.display = 'none';
  } else {
    var refPageItem = document.querySelectorAll('.page-item')[1];
    for (i = 0; i < Math.ceil(num / 10); i++) {
      var newPageItem = document.createElement('li');
      var newPageLink = document.createElement('a');
      newPageItem.classList.add('page-item');
      newPageLink.classList.add('page-link', 'bg-secondary', 'text-primary');
      var newPageNum = document.createTextNode(i + 1);
      newPageItem.appendChild(newPageLink).appendChild(newPageNum);
      pagination.insertBefore(newPageItem, refPageItem);
    }
    // - 讓外層 myList 來監聽 click 事件，並由它來抓取目標
    // - 參考 https://ithelp.ithome.com.tw/articles/10192015
    pagination.addEventListener('click', function (e) {
      // 判斷 -> 目標元素若是 a 則執行 
      if (e.target.tagName.toLowerCase() === 'a') {
        console.log(e.target); // <a></a>
        console.log(e.target.tagName); // A
        // 清空節點，重寫該分頁資料
        var tr = document.querySelectorAll("tr");
        for (i = 0; i < tr.length; i++) {
          tbody.removeChild(tr[i]);
        }
        updateBMI(parseInt(e.target.textContent));
        // 紀錄分頁資訊，重新整理也會在該頁面
        var pageArray = [parseInt(e.target.textContent)];
        localStorage.setItem('pageLinkNumber', JSON.stringify(pageArray));
      }
    }, false);
  }
}




// 功能 -> 更新分頁顯示資料
function updateBMI(num) {
  if (num === 0) {
    return;
  } else {
    
    var lastLength = '';
    var pageTotal = Math.ceil(bmiArray.length / 10);
    // TODO: 可新增 5筆、15筆、20筆資料
    // - 小於 10 筆資料
    // - 滿 10 筆資料且不是最後一頁
    // - 最後一頁且有餘數
    if (bmiArray.length < 10) {
      lastLength = bmiArray.length % 10;
    } else if (bmiArray.length % 10 === 0 || num !== pageTotal) {
      lastLength = num * 10;
    } else if (bmiArray.length % 10 !== 0 && num === pageTotal) {
      lastLength = (num - 1) * 10 + bmiArray.length % 10;
    }
    // - 順向 for (i = (num - 1) * 10; i < lastLength; i++)
    // - 反向 for (i =  lastLength-1 ; i >= (num - 1) * 10 ; i--)
    for (i =  lastLength-1 ; i >= (num - 1) * 10 ; i--) {
      // ? createTextNode or textContent ? -> 視情況使用，同一節點多行文字，或是改變整段文字
      // - 若不使用不同變數名稱存入 td資料，將視為同一 td內多行文字，<td> BMI 體重 身高 紀錄時間 </td>
      var tr = document.createElement("tr");
      var th = document.createElement("th");
      var tdBMI = document.createElement("td");
      var tdWeight = document.createElement("td");
      var tdHeight = document.createElement("td");
      var tdTime = document.createElement("td");
      tbody.appendChild(tr);
      tr.appendChild(th);
      tr.appendChild(tdBMI);
      tr.appendChild(tdWeight);
      tr.appendChild(tdHeight);
      tr.appendChild(tdTime);
      th.className = 'font-weight-bold';
      th.textContent = bmiArray[i].status;
      tdBMI.textContent = 'BMI : ' + bmiArray[i].BMI;
      tdWeight.textContent = '體重 : ' + bmiArray[i].weight;
      tdHeight.textContent = '身高 : ' + bmiArray[i].height;
      tdTime.textContent = '紀錄時間 : ' + bmiArray[i].recordTime;

      // 判斷 -> 不同數值範圍對應不同 class底色
      if (bmiArray[i].BMI < 18.5) {
        th.classList.add('text-underweight');
        tr.classList.add('table-underweight');
      } else if (bmiArray[i].BMI >= 18.5 && bmiArray[i].BMI <= 24.9) {
        th.classList.add('text-success');
        tr.classList.add('table-success');
      } else if (bmiArray[i].BMI > 24.9) {
        th.classList.add('text-danger');
        tr.classList.add('table-danger');
      }
    }
  }
}







// 功能 -> 取得並格式化時間
function timeFunction() {
  var todayTime = new Date();
  // year/month/day
  // var formatTime = todayTime.getFullYear() + "/" + (todayTime.getMonth() + 1) + "/" + todayTime.getDay();

  var year = todayTime.getFullYear();
  var month = ("0" + (todayTime.getMonth() + 1)).slice(-2);
  var day = ("0" + (todayTime.getDate())).slice(-2);
  var hour = ("0" + (todayTime.getHours())).slice(-2);
  var minute = ("0" + todayTime.getMinutes()).slice(-2);
  var second = ("0" + todayTime.getSeconds()).slice(-2);
  var formatTime = year + '/' + month + '/' + day + ' ' + hour + ':' + minute + ':' + second
  return formatTime;
}

// 功能 -> 網頁捲動超過 100pixel顯示
function scrollFunction() {
  var top = document.querySelector('.top');

  // 判斷 -> 若滾動頁面超過 100 ，則顯示
  // - document.documentElement -> <html>, For Chrome, Firefox, IE and Opera
  // - document.body -> <body>, for  Safari
  if (window.pageYOffset > 100 || document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    top.style.display = "block";
  } else {
    top.style.display = "none";
  }

  // 事件 'click' -> 回到頂部
  top.addEventListener('click', function (event) {
    event.preventDefault();
    topFunction(0);
  }, false)
}


// 功能 -> 指定 scrollTop的值，可到頁面中某一位置
// - 由於 scrollTop屬於 DOM的一種，若了解 animation原理，能有更多效果
// - 參考 動畫與過度 : https://www.w3cplus.com/animation/controlling-css-animations-transitions-javascript.html
// - 參考 animate 原理 : https://segmentfault.com/a/1190000008570887 
// - 參考 https://codepen.io/dsheiko/pen/XZEgXW

function topFunction(scrollNumber) {
  // BOM -> 平滑滾動
  window.scrollTo({
    top: scrollNumber,
    behavior: "smooth"
  });

  // 使用錨點至 <head>

  // window.pageYOffset 歸零只有數值等於零，無回到頁面頂部效果
  // window.pageYOffset = 0;

  // 從目前位置歸零 無延遲效果 
  // document.body.scrollTop = scrollNumber;
  // document.documentElement.scrollTop = scrollNumber;
}


// ? class添加不能使用 className，要用效能更高的 classList.add() ? 差別?

// ? 如何延長完成時間?
//   jQuery 
// - $('html,body').animate({ scrollTop: 0 }, 1000);
// - $('html,body') -> document.documentElement and document.body.scrollTop 
// - animate( {} , 1000) -> 原生 JavaScript語法可能長怎樣 ?
// - 目前已知 每毫秒或每秒跑多少?  設定多久完成動作 ?