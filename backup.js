// saveWish //儲存資料在 localstrage 並輸出在頁面
// postWish //新增資料
// setWishList //製作資料清單
// removeWishList //清除資料清單
// updateWishList //更新資料


// 儲存的變數，這邊要特別注意，在第一次提取會取不到資料（null），因此如果無資料就建立空陣列
const wishList = JSON.parse(window.localStorage.getItem('wishList')) || [];

function saveWish() {
  /*
  | 得到 input 內容，先確認是否為空值
  | push 到陣列
  | 執行 localStroage
  | 刪除 input 內容
  | 回傳 input 內容
  */
  const value = document.querySelector('.text').value;
  if (!value) return alert('你沒有輸入願望喔！');
  wishList.push(value);
  updateWishList(wishList);
  document.querySelector('.text').value = '';
  return value;
}

function setWishList() {
  /*
  | 用 for 將陣列印在網頁上
  */
  for (let i = 0; i < wishList.length; i++) {
    const item = document.createElement('li');
    item.classList.add('wishItem');
    item.innerHTML = `
                <span class="del">X</span><span class="value">${wishList[i]}</span>
                `
    document.querySelector('.wishList').appendChild(item);
  }
}

function postWish(value) {
  /*
  | 得到 input 內容，先確認是否為空值
  | 將內容新增至 wishList
  */
  if (!value) return;
  const item = document.createElement('li');
  item.classList.add('wishItem');
  item.innerHTML = `
            <span class="del">X</span><span class="value">${value}</span>
            `
  document.querySelector('.wishList').appendChild(item);
}

function removeWishList() {
  /*
  | 刪除 localstorage 資料
  */
  window.localStorage.clear();
  let element = document.querySelector('.wishList')

  /*
  | 用迴圈的方式刪除所有的 li
  */
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
  wishList.length = 0;
}

function updateWishList(newArr) {
  /*
  | 將陣列轉成字串，存入 localstorage
  */
  window.localStorage.setItem('wishList', JSON.stringify(newArr));
}


// 監聽事件
document.querySelector(".submit").addEventListener('click', function () {
  postWish(saveWish());
});

document.querySelector(".clearWishList").addEventListener('click', function () {
  removeWishList();
});

document.querySelector(".wishList").addEventListener('click', function (e) {
  /*
  | 得到點擊的位置，先確認是否是刪除按鈕（利用判斷 class）
  | 取得 li
  | 刪除 li
  */
  if (!e.target.classList.contains("del")) return;
  let item = e.target.parentElement
  item.remove();

  /*
  | 先得到 li 內容，並找出對應的位置
  | 從清單上刪除
  | 更新至 localStroage
  */
  let itemContent = item.children[1].textContent;
  let index = wishList.indexOf(itemContent)
  wishList.splice(index, 1)
  updateWishList(wishList);
});


// 一開始印出願望清單在網頁上
setWishList();