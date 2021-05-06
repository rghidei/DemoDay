var commenThumbUp = document.getElementsByClassName("commentThumb");

document.querySelector('.stageT').addEventListener('click', addLike)


function addLike() {
  const tag = this.parentNode.parentNode.querySelector('.tagStage').innerText
  const dicuss = this.parentNode.parentNode.querySelector('#discussion').innerText
  const background = this.parentNode.parentNode.querySelector('.infoStage').innerText
  const postId = this.parentNode.parentNode.querySelector('.postIdStage span').innerText
  const thumbUp = parseFloat(this.parentNode.parentNode.querySelector('.thumbStage').innerText)
  fetch('stagePost', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
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
  element.addEventListener('click', function() {
    const msg = this.parentNode.parentNode.querySelector('.msg').innerText
    const side = this.parentNode.parentNode.querySelector('.side').innerText
    const comId = this.parentNode.parentNode.querySelector('.comId span').innerText
    const thumbUp = parseFloat(this.parentNode.parentNode.querySelector('.thumbComments').innerText)
    fetch('stageCom', {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
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

function getdate(dateTime) {
  return dateTime.toISOString().slice(0, 19).replace("T", " ");
}
