//index ejs
//topic
document.querySelector('.followBtn').addEventListener('click', addPost)
function addPost(item){
  console.log('love')
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
