var commenThumbUp = document.getElementsByClassName("commentThumb");

document.querySelector('.stageT').addEventListener('click', addLike)


function addLike(){
console.log('panda2')
  const tag = this.parentNode.parentNode.querySelector('.tagStage').innerText
  const dicuss = this.parentNode.parentNode.querySelector('.dicussStage').innerText
  const background = this.parentNode.parentNode.querySelector('.infoStage').innerText
  const postId = this.parentNode.parentNode.querySelector('.postIdStage span').innerText
  const thumbUp = parseFloat(this.parentNode.parentNode.querySelector('.thumbStage').innerText)
  console.log(tag, dicuss, background, postId, thumbUp)
  fetch('bob', {
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
};

Array.from(commenThumbUp).forEach(function(element) {
      element.addEventListener('click', function(){
      console.log('panda3')
        const msg = this.parentNode.parentNode.querySelector('.msg').innerText
        const side = this.parentNode.parentNode.querySelector('.side').innerText
        const comId = this.parentNode.parentNode.querySelector('.comId span').innerText
        const thumbUp = parseFloat(this.parentNode.parentNode.querySelector('.thumbCom').innerText)
        console.log(msg, side, comId, thumbUp)
        fetch('greg', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'msg': msg,
            'side': side,
            'timestamp': new Date,
            'comId': comId,
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
