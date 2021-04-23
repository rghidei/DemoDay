var thumbUp = document.getElementsByClassName("profileT");
var trash = document.getElementsByClassName("fa-trash");


Array.from(thumbUp).forEach(function(element) {
      element.addEventListener('click', function(){
      console.log('panda')
        const tag = this.parentNode.parentNode.querySelector('.tag').innerText
        const dicuss = this.parentNode.parentNode.querySelector('.dicuss').innerText
        const background = this.parentNode.parentNode.querySelector('.info').innerText
        const postId = this.parentNode.parentNode.querySelector('.postId span').innerText
        const thumbUp = parseFloat(this.parentNode.parentNode.querySelector('.thumb').innerText)
        console.log(tag, dicuss, background, postId, thumbUp)
        fetch('messages', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'tag': tag,
            'dicuss': dicuss,
            'background': background,
            'timestamp': new Date,
            'postId': postId,
            'thumbUp': thumbUp
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const tag = this.parentNode.parentNode.querySelector('.tag').innerText
        const dicuss = this.parentNode.parentNode.querySelector('.dicuss').innerText
        const background = this.parentNode.parentNode.querySelector('.info').innerText
        const objectId = this.parentNode.parentNode.querySelector('.postId').innerText
        const thumbUp = parseFloat(this.parentNode.parentNode.querySelector('.thumb').innerText)
        fetch('messages', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'},
          body: JSON.stringify({
            'tag': tag,
            'dicuss': dicuss,
            'background': background,
            '_id': objectId,
            'timestamp': new Date
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});

document.querySelector('.followBtn').addEventListener('click', addPost)
function addPost(item){
  console.log('bananas')
  const user = item.currentTarget.getAttribute('data-userId')
  const postId =  document.querySelector('#postid').innerText
  console.log(postId, user)
  fetch('/follow/add', {
  method: 'put',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
        'postId': postId,
        'user': user
      })
    })
    .then(response => {
      if (response.ok) return response.json()
    })
    .then(data => {
      console.log(data)
      window.location = '/follow/' + user
    })
  };
