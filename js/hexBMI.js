// 取得 -> 各類型資料，物件、時間、瀏覽器各式資訊等等...
// 建立 -> 空物件、物件內資料、節點標籤等等...
// 事件 -> 各種事件，click、dblclick、load、scroll、input、submit等等...
// 判斷 -> 條件判斷，if、else、else if、switch、判斷運算子等等...
// 回寫 -> 回傳結果，萬用console.log();、各種條件判斷與計算結果(包含文字與值等等...)

// 取得資料 或 建立空[] -> 若 localStorage有資料則取出，否則存放 bmi紀錄至陣列作為物件資料使用
// - 由於瀏覽器只支援字串，必須先轉成 "字串" 再存入
// - 要使用資料時，再將資料轉成 "陣列"
// - || 優先檢查左邊，若為 true 優先回傳 "第一個"
var bmiArray = JSON.parse(localStorage.getItem('bmiRecord')) || [];

// 回寫 -> 若有資料則顯示至頁面
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
for (i = 0; i < bmiArray.length; i++) {
  // - createTextNode or textContent ? -> 視情況使用，同一節點多行文字，或是改變整段文字
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
    tr.classList.add('table-underweight');
  } else if (bmiArray[i].BMI >= 18.5 && bmiArray[i].BMI <= 24.9) {
    tr.classList.add('table-success');
  } else if (bmiArray[i].BMI > 24.9) {
    tr.classList.add('table-danger');
  }

}
// 事件 "click" -> 清空 localStorage資料
var btnClear = document.querySelector('.js-clear');
btnClear.addEventListener('click', function () {
  localStorage.clear('bmiRecord');
}, false)

// 事件 "click" -> 計算 BMI並顯示資料
var btnSubmit = document.querySelector('.js-record');
btnSubmit.addEventListener('click', function () {
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
  if (weight == "" ) {
    alert("請輸入體重");
  }else if(height == ""){
    alert("請輸入身高");
  }else {
    // 判斷 -> bmi 數值範圍並寫入 {bmiRecord}.status 欄位
    if (bmi < 18.5) {
      bmiRecord.status = "過輕";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      bmiRecord.status = "理想";
    } else if (bmi > 24.9) {
      bmiRecord.status = "危險";
    }

    // 回傳 時間 -> 按下按鈕當前時間並寫入 {bmiRecord}.recordTime 欄位
    bmiRecord.recordTime = time();

    // 建立 陣列新資料 -> 存放至 bmiArray[]
    bmiArray.push(bmiRecord);

    // 建立 BOM localStorage新資料 -> 轉成字串後，存放至瀏覽器 localStorage
    localStorage.setItem('bmiRecord', JSON.stringify(bmiArray));
  }
})

// 取得 -> 格式化時間
function time() {
  var todayTime = new Date();
  // year/month/day
  var formatTime = todayTime.getFullYear() + "/" + (todayTime.getMonth() + 1) + "/" + todayTime.getDay();
  return formatTime;
}

// 事件 -> 回到頂部，需要的 BOM scroll、scrollTop
// TODO: 寫出原生 TOP
var top = document.querySelector('.top');
top.addEventListener('click', function(){
  event.preventDefault();

  // $('html,body').animate({ scrollTop: 0 }, 1000);
}, false)