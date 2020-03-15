// 取得體重 input weight
var weightElement = document.getElementById('weight');

// 取得身高 input height
var heightElement = document.getElementById('height');

// 回寫數值
var submitBtn = document.querySelector('[type="submit"]');
submitBtn.addEventListener('click', function () {
  var weight = weightElement.value;
  var height = heightElement.value / 100;
  // 計算 BMI = weight / height*height 單位: 公斤 / 米平方
  var bmi = (weight / (height * height)).toFixed(1);

  if (weight == "" || height == "") {
    alert("請先輸入數字");
  } else {
    // alert("您的BMI="+bmi+"體重:"+weight+"身高:"+heightElement.value); 

    // 抓取表格
    var table__BMI = document.querySelector('.table__BMI');

    // 建立節點
    var tbody = document.createElement("tbody");
    var tr = document.createElement("tr");
    var th = document.createElement("th");
    table__BMI.appendChild(tbody).appendChild(tr).appendChild(th);
    // 判斷要顯示的狀態
    if (bmi < 18.5) {
      tr.classList.add('table-underweight');
      th.textContent = "過輕";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      th.textContent = "理想";
      tr.classList.add('table-success');
    } else if (bmi > 24.9) {
      th.textContent = "危險";
      tr.classList.add('table-danger');
    }

    // 建立 3個td -> BMI、體重、身高
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
    var textHeight = document.createTextNode('身高 : ' + heightElement.value);
    tdHeight.appendChild(textHeight);
    tr.appendChild(tdHeight);
  

  }
})



