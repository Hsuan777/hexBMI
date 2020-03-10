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

        var table__BMI = document.querySelector('.table__BMI');
        var tbody = document.createElement("tbody");
        var tr = document.createElement("tr");
        var th = document.createElement("th");
        var td = document.createElement("td");
        // th.textContent = "理想";
        td.textContent = "BMI:" + bmi;

        // html
        table__BMI.appendChild(tbody).appendChild(tr).appendChild(th);
        table__BMI.appendChild(tr).appendChild(td);
        // 如何回寫不同 td值
        // CSS
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

    }


})



