
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}


window.onload=function(){
  //マウス移動時のイベントをBODYタグに登録する
  document.body.addEventListener("mousemove", function(e){

    //座標を取得する
    let mX = e.pageX;  //X座標
    let mY = e.pageY;  //Y座標

    //座標を表示する
  });
}


// classが `toggle-button` の要素を全て取得する。
const toggleButtonList = document.querySelectorAll(".toggle-button");

function toggle(event) {
  // event.currentTargetでクリックされた要素を取得できる。
  const button = event.currentTarget;

  // classList.contains('xxx')  => xxxという classが付いていれば trueを返す
  if (button.classList.contains('is-active')) {
    button.classList.remove('is-active');
    button.innerHTML = 'OFF';
  } else {
    button.classList.add('is-active');
    button.innerHTML = 'ON';
  }
}

for (let index = 0; index < toggleButtonList.length; index++) {
  const toggleButton = toggleButtonList[index];
  toggleButton.addEventListener("click", toggle);
}


//ランダムで暴走するaboutus

const random = document.querySelector(".random");




function bug(){
    let posX;
  let posY;
  posX = getRandomInt(-50, 1200);
  posY = getRandomInt(-50, 600);
      random.style.transform = "translate(" + posX + "px ," + posY + "px)";
  }

  random.addEventListener('mouseover', function() {
  setInterval(bug,600);
});


//消えるnews

const news = document.querySelector('.news');

news.addEventListener('mouseover', function() {
  news.style.opacity = 0;
});

news.addEventListener('mouseout', function() {
  news.style.opacity = 1;
});

//逃げるAccess
const run = document.querySelector(".run");

function runaway(){
    let posX;
  let posY;
  posX = getRandomInt(0, 1000);
  posY = getRandomInt(-100, 100);
      run.style.transform = "translate(" + posX + "px ," + posY + "px)";
  }

  run.addEventListener('mouseover',runaway);
