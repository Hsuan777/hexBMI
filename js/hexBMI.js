// 取得、建立、事件、判斷、回寫(物件資料、瀏覽器畫面與 cookie )

// 建立 空[] -> 存放 bmi紀錄至陣列，若 localStorage有資料則取出
// - 由於瀏覽器只支援字串，必須先轉成 "字串" 再存入
// - 要使用資料時，再將資料轉成 "陣列"
// - || 優先檢查左邊，若為 true 優先回傳 第一個
var bmiArray = JSON.parse(localStorage.getItem('bmiRecord')) || [];


var table__BMI = document.querySelector('.table__BMI');
var tbody = document.createElement("tbody");
table__BMI.appendChild(tbody);
for (i = 0; i < bmiArray.length; i++) {
  var tr = document.createElement("tr");
  var th = document.createElement("th");
  var td = document.createElement("td");
  tbody.appendChild(tr);
  // var textStatus = document.createTextNode('BMI : ' + bmiArray[i].status);
  // th.appendChild(textStatus);
  th.textContent = bmiArray[i].status;
  tr.appendChild(th);
  // createTextNode or textContent ?
  var tdBMI = document.createElement("td");
  var textBMI = document.createTextNode('BMI : ' + bmiArray[i].BMI);
  tdBMI.appendChild(textBMI);
  tr.appendChild(tdBMI);

  var tdWeight = document.createElement("td");
  var textWeight = document.createTextNode('體重 : ' + bmiArray[i].weight);
  tdWeight.appendChild(textWeight);
  tr.appendChild(tdWeight);

  var tdHeight = document.createElement("td");
  var textHeight = document.createTextNode('身高 : ' + bmiArray[i].height);
  td.appendChild(textHeight);
  tr.appendChild(td);

  var tdTime = document.createElement("td");
  var textTime = document.createTextNode('紀錄時間 : ' + bmiArray[i].recordTime);
  tdTime.appendChild(textTime);
  tr.appendChild(tdTime);

 
  if (bmiArray[i].BMI < 18.5) {
    tr.classList.add('table-underweight');
  } else if (bmiArray[i].BMI >= 18.5 && bmiArray[i].BMI <= 24.9) {
    tr.classList.add('table-success');
  } else if (bmiArray[i].BMI > 24.9) {
    tr.classList.add('table-danger');
  }

}


// 事件 "click" submit  -> 計算 BMI並顯示資料
var submitBtn = document.querySelector('[type="submit"]');
submitBtn.addEventListener('click', function () {
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

  // 判斷 使用者行為
  if (weight == "" || height == "") {
    alert("請先輸入數字");
  } else {
    // 取得 節點 -> BMI紀錄表格
    var table__BMI = document.querySelector('.table__BMI');

    // 建立 節點 tbody、tr、th
    var tbody = document.createElement("tbody");
    var tr = document.createElement("tr");
    var th = document.createElement("th");
    table__BMI.appendChild(tbody).appendChild(tr).appendChild(th);

    // 判斷並回寫 -> bmi 數值範圍對應資料並回寫 {bmiRecord}
    if (bmi < 18.5) {
      tr.classList.add('table-underweight');
      th.textContent = "過輕";
      bmiRecord.status = "過輕";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      tr.classList.add('table-success');
      th.textContent = "理想";
      bmiRecord.status = "理想";
    } else if (bmi > 24.9) {
      tr.classList.add('table-danger');
      th.textContent = "危險";
      bmiRecord.status = "危險";
    }

    // 建立 節點 td -> BMI、體重、身高
    var tdBMI = document.createElement("td");
    tdBMI.className = 'table-BMI';
    var textBMI = document.createTextNode('BMI : ' + bmi);
    tdBMI.appendChild(textBMI);
    tr.appendChild(tdBMI);

    // var tdWeight = document.createElement("td").setAttribute('id','table-weight');
    var tdWeight = document.createElement("td");
    tdWeight.className = 'table-weight';
    var textWeight = document.createTextNode('體重 : ' + weight);
    tdWeight.appendChild(textWeight);
    tr.appendChild(tdWeight);

    // var tdHeight = document.createElement("td").setAttribute('id','table-height');
    var tdHeight = document.createElement("td");
    tdHeight.className = 'table-height';
    var textHeight = document.createTextNode('身高 : ' + height);
    tdHeight.appendChild(textHeight);
    tr.appendChild(tdHeight);

    var tdTime = document.createElement("td");
    var todayTime = new Date();
    console.log(todayTime);
    var formatTime = todayTime.getFullYear() + "/" + (todayTime.getMonth() + 1) + "/" + todayTime.getDay();
    tdTime.className = 'table-update';
    var textTime = document.createTextNode('紀錄時間 : ' + formatTime);
    tdTime.appendChild(textTime);
    tr.appendChild(tdTime);

    // 回寫 物件資料 ->  bmiRecord.recordTime
    bmiRecord.recordTime = formatTime;

    // 回寫 物件資料 -> 存放至 bmiArray
    bmiArray.push(bmiRecord);

    // 回寫 物件資料 -> localStorage
    localStorage.setItem('bmiRecord', JSON.stringify(bmiArray));
  }
})


