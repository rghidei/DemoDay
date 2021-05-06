var trashPost = document.getElementsByClassName("postTrash");
var trashCom = document.getElementsByClassName("comTrash");


Array.from(trashPost).forEach(function(element) {
  console.log('honey')
  element.addEventListener('click', function() {
    const dicuss = this.parentNode.parentNode.querySelector('.Title').innerText
    const postId = this.parentNode.parentNode.querySelector('#Id').innerText
    console.log(dicuss, postId)
    fetch('messages', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'dicuss': dicuss,
        'postId': postId
      })
    }).then(function(response) {
      window.location.reload()
    })
  });
});

Array.from(trashCom).forEach(function(element) {
  console.log('blueberry')
  element.addEventListener('click', function() {
    const msg = this.parentNode.parentNode.querySelector('.msg').innerText
    const side = this.parentNode.parentNode.querySelector('.side').innerText
    const comId = this.parentNode.parentNode.querySelector('.comId').innerText
    console.log(msg, side, comId)
    fetch('comments', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'msg': msg,
        'side': side,
        'comId': comId

      })
    }).then(function(response) {
      window.location.reload()
    })
  });
});
