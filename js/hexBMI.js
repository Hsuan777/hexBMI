// 取得體重 input weight
var weightElement = document.getElementById('weight');

// 取得身高 input height
var heightElement = document.getElementById('height');





// 回寫數值
var submitBtn= document.querySelector('[type="submit"]');
submitBtn.addEventListener('click', function(){
    var weight = weightElement.value;
    var height = heightElement.value/100;

    // 計算 BMI = weight / height*height 單位: 公斤 / 米平方
    var bmi = (weight/(height*height)).toFixed(1);
    if(weight =="" || height =="" ){
      alert("請先輸入數字");
    }else{
        alert("您的BMI="+bmi+"體重:"+weight+"身高:"+heightElement.value);
    }
    
})



