let inputBox;
let slider;
let button;
let dropdown;
let iframe;

function setup() {  //這是一個設定函數，只會執行一次
  // 產生一個畫布，充滿整個視窗，背景顏色為ffc2d1
  createCanvas(windowWidth, windowHeight)
  background('#ffc2d1');
  // createCanvas(400, 400);  //建立一個400x400的畫布
  inputBox = createInput('教育科技學系');  // 產生一個輸入的文字框，預設內容為 "教育科技學系"
  inputBox.position(10, 10);  // 文字框位置為 (10,10)
  inputBox.size(300, 50);  // 文字框寬為 300，高為 50

  slider = createSlider(12, 40, 24);  // 產生一個滑桿物件，範圍從 12 到 40，初始值為 24
  slider.position(380, 30);  // 滑桿位置為 (380,30)
  slider.size(200);  // 滑桿寬為 200

  button = createButton('跳動');  // 產生一個按鈕，文字為 "跳動"
  button.position(680, 30);  // 按鈕位置為 (680,30)
  button.size(100, 24);  // 設置按鈕大小為 100x24
  button.mousePressed(toggleJump);  // 當按鈕被按下時，執行 toggleJump 函數
  //按鈕顏色為e0aaff
  button.style('background-color', '#e0aaff');
  //按鈕文字顏色為003049
  button.style('color', '#003049');

  dropdown = createSelect();  // 產生一個下拉式選單
  dropdown.position(800, 30);  // 下拉式選單位置為 (800,30)
  dropdown.size(100);  // 下拉式選單寬為 100
  dropdown.option('淡江大學');  // 選項一顯示淡江大學
  dropdown.option('教育科技學系');  // 選項二顯示教育科技學系
  dropdown.option('教學平台');  // 選項三顯示教學平台
  dropdown.changed(openWebsite);  // 當選擇改變時，執行 openWebsite 函數

  iframe = createElement('iframe');  // 產生一個 iframe 元素
  iframe.position((windowWidth - (windowWidth - 400)) / 2, (windowHeight - (windowHeight - 400)) / 2);  // iframe 位置置中
  iframe.size(windowWidth - 400, windowHeight - 400);  // iframe 寬為視窗寬度-20，高為視窗高度-80
}

let isJumping = false;

function toggleJump() {
  isJumping = !isJumping;
}

function openWebsite() {
  let url;
  if (dropdown.value() === '淡江大學') {
    url = 'https://www.tku.edu.tw/';
  } else if (dropdown.value() === '教育科技學系') {
    url = 'https://www.et.tku.edu.tw/';
  } else if (dropdown.value() === '教學平台') {
    url = 'https://hackmd.io/@YuuuuuY/ByUuQbZhye';
  }
  iframe.attribute('src', url);  // 設定 iframe 的 src 屬性為選擇的網址
}

function draw() {  //這是一個繪圖函數，每一幀都會執行
  background('#ffc2d1');  // 每一幀都會執行，背景顏色為 ffc2d1
  let textSizeValue = slider.value();  // 取得滑桿的值作為文字大小
  textSize(textSizeValue);  // 設定文字大小
  fill('blue');   // 文字顏色為藍色
  textStyle(BOLD);  // 文字粗細為 BOLD
  textAlign(CENTER);  // 文字對齊方式為 CENTER
  let textContent = inputBox.value();  // 取得輸入框的內容
  let x = 0;
  let y = 100;  // 將 y 座標設為 100
  let lineIndex = 0;
  while (y < windowHeight) {  // 當 y 座標小於視窗高度時
    while (x < windowWidth) {  // 當 x 座標小於視窗寬度時
      let yOffset = isJumping ? sin(frameCount * 0.1 + x * 0.05 + lineIndex) * 5 : 0;  // 每個文字跳動距離不同
      text(textContent, x, y + yOffset);
      x += textWidth(textContent) + 10;  // 字串與字串間空 10
    }
    x = 0;  // 重置 x 座標
    y += textAscent() + textDescent() + 20;  // 更新 y 座標，行與行間空 20
    lineIndex++;
  }
  
  textSize(16);  // 設定文字大小為 16
  textAlign(LEFT);  // 文字對齊方式為 LEFT
  text('Font Size', 445, 60);  // 在滑桿下方顯示 "Font Size"
}

function windowResized() {  // 當視窗大小改變時，會執行這個函數
  resizeCanvas(windowWidth, windowHeight);  // 調整畫布大小
  iframe.size(windowWidth - 20, windowHeight - 80);  // 調整 iframe 大小
  iframe.position((windowWidth - (windowWidth - 20)) / 2, (windowHeight - (windowHeight - 80)) / 2);  // 調整 iframe 位置置中
}
