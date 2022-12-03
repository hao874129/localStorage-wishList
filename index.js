const wishList = JSON.parse(window.localStorage.getItem('wishList')) || []

console.log(wishList);

// init render WishList

function setWishList() {
  // for (let i = 0; i < wishList.length; i++) {
  //   const item = document.createElement('li')
  //   item.classList.add('wishItem')
  //   item.innerHTML = `
  //     <span class="del">X</span>
  //     <span class="value">${wishList[i]}</span>
  //   `
  //   document.querySelector('.wishList').appendChild(item)
  // }
  let innerContent = ''
  wishList.forEach(element => {
    innerContent += `
    <li class="wishItem">
      <span class="del">X</span>
      <span class="value">${element}</span>
    </li>
    `
  });
  document.querySelector('.wishList').innerHTML = innerContent
}

setWishList()

// add a wish item to wish list

document.querySelector(".submit").addEventListener('click', () => {
  postWish(saveWish())
})

function updateWishList(newArray) {
  window.localStorage.setItem('wishList', JSON.stringify(newArray))
}

function saveWish() {
  const value = document.querySelector('.text').value
  if (!value) return alert('you need to enter some wishes!')
  wishList.push(value)
  updateWishList(wishList)
  document.querySelector('.text').value = ''
  return value
}

function postWish(value) {
  if (!value) return
  const item = document.createElement('li')
  item.classList.add('wishItem')
  item.innerHTML = `
    <span class="del">X</span>
    <span class="value">${value}</span>
  `
  document.querySelector('.wishList').appendChild(item)
}

// clear all items of wish list

document.querySelector('.clearWishList').addEventListener('click', () => {
  removeWishList()
})

function removeWishList() {
  window.localStorage.clear()
  let ele = document.querySelector('.wishList')

  ele.textContent = ''

  wishList.length = 0
}

// delete target wish item 

document.querySelector('.wishList').addEventListener('click', (e) => {
  deleteWishItem(e)
})

function deleteWishItem(e) {
  if (!e.target.classList.contains('del')) return

  let item = e.target.parentElement
  item.remove()

  let itemContent = item.children[1].textContent
  let index = wishList.indexOf(itemContent)
  wishList.splice(index, 1)
  updateWishList(wishList)
}