
//参考(https://qiita.com/akebi_mh/items/02bb9038a8b6f4944fce)

const canvas = document.getElementById('canvas');
const ps = window.parent.screen;

// キャンバスをずらすためのマージン分
const shiftMargin = 512;

// 回転や反転の使用
const useTransform = true;

// 真面目にノイズを描くサイズ
// 小さくするほど初期処理は早くなる反面、繰り返しパターンは目立ちやすくなる
const rWidth = 480/2;
const rHeight = 320/2;

// ディスプレイサイズ + ずらすマージン分をキャンバスサイズとして確保
if(useTransform) {
    // 回転利用の場合は長辺基準で確保
    canvas.width = canvas.height = Math.max(ps.width, ps.height) + shiftMargin;
} else {
    canvas.width = ps.width + shiftMargin;
    canvas.height = ps.height + shiftMargin;
}

document.querySelector('.error').onclick = function(){

  drawCanvas();
//    setInterval(shiftCanvas, 1000 / 60);
  shiftCanvas();

}




/*function noise(){

    drawCanvas();
//    setInterval(shiftCanvas, 1000 / 60);
    shiftCanvas();

}

const trick = document.querySelector(".error");
trick.addEventListener('onclick',noise);*/


function drawCanvas() {
    const cWidth = canvas.width;
    const cHeight = canvas.height;
    const cCtx = canvas.getContext('2d');

    // rWidth x rHeightのサイズ分だけ真面目にノイズを描く
    for (let x = 0; x < rWidth; x++) {
        for (let y = 0; y < rHeight; y++) {
            const n = Math.random() * 256;
            cCtx.fillStyle = '#'+ ('00000' + (n << 16 | n << 8 | n).toString(16)).slice(-6);
            cCtx.fillRect(x, y, 1, 1);
        }
    }

    // 真面目に描いた範囲からランダムな位置の1/4サイズをコピーして余白に敷き詰める
    for (let x = 0; x < cWidth; x+= rWidth / 2) {
        for (let y = 0; y < cHeight; y+= rHeight / 2) {
            if (!(x < rWidth && y < rHeight)) {
                cCtx.putImageData(cCtx.getImageData(Math.random() * rWidth / 2, Math.random() * rHeight / 2, Math.ceil(rWidth / 2), Math.ceil(rHeight / 2)), x, y);
            }
        }
    }
}

// 確保したマージン分の範囲でキャンバスをランダムな位置にずらす
let transformScaleX = 1;
let transformScaleY = 1;
let filterInvert = 0;
function shiftCanvas() {
    window.requestAnimationFrame(shiftCanvas);

    // 位置シフト
    canvas.style.left = (- Math.random() * shiftMargin) + 'px';
    canvas.style.top = (- Math.random() * shiftMargin) + 'px';

    if(useTransform) {
        // 90度単位の回転、左右上下ネガポジ反転も加え、見かけ上のバリエーションを増やす
        // 50%の確率で左右反転
        if(Math.random() > .5) transformScaleX *= -1;
        // 50%の確率で上下反転
        if(Math.random() > .5) transformScaleY *= -1;
        // 90度単位の角度をランダムに選択
        const transformRotate = Math.floor(Math.random() * 4) * 90;
        canvas.style.transform = 'scale(' + transformScaleX + ', ' + transformScaleY + ') rotate(' + transformRotate + 'deg)';
        // 50%の確率でネガポジ反転
        if(Math.random() > .5) {
            canvas.style.filter = 'invert(' + (filterInvert ^= 1) + ')';
        }
    }
}
