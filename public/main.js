//Profile//
// var thumbUpPost = document.getElementsByClassName("postThumb");
// var thumbUpCom = document.getElementsByClassName("comThumb");
var trashPost = document.getElementsByClassName("postTrash");
var trashCom = document.getElementsByClassName("comTrash");




Array.from(trashPost).forEach(function(element) {
  console.log('honey')
      element.addEventListener('click', function(){
        const dicuss = this.parentNode.parentNode.querySelector('.Title').innerText
        const postId = this.parentNode.parentNode.querySelector('#Id').innerText
        console.log(dicuss, postId)
        fetch('messages', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'},
          body: JSON.stringify({
            'dicuss': dicuss,
            'postId': postId
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});

Array.from(trashCom).forEach(function(element) {
  console.log('blueberry')
      element.addEventListener('click', function(){
        const msg = this.parentNode.parentNode.querySelector('.msg').innerText
        const side = this.parentNode.parentNode.querySelector('.side').innerText
        const comId = this.parentNode.parentNode.querySelector('.comId').innerText
        console.log(msg, side, comId)
        fetch('comments', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'},
          body: JSON.stringify({
            'msg': msg,
            'side': side,
            'comId': comId

          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});


// Array.from(thumbUpPost).forEach(function(element) {
//       element.addEventListener('click', function(){
//       console.log('panda')
//         const tag = this.parentNode.parentNode.querySelector('.tag').innerText
//         const dicuss = this.parentNode.parentNode.querySelector('.dicuss').innerText
//         const background = this.parentNode.parentNode.querySelector('.info').innerText
//         const postId = this.parentNode.parentNode.querySelector('.postId span').innerText
//         const thumbUp = parseFloat(this.parentNode.parentNode.querySelector('.numPost').innerText)
//         console.log(tag, dicuss, background, postId, thumbUp)
//         fetch('messages', {
//           method: 'put',
//           headers: {'Content-Type': 'application/json'},
//           body: JSON.stringify({
//             'tag': tag,
//             'dicuss': dicuss,
//             'background': background,
//             'timestamp': new Date,
//             'postId': postId,
//             'thumbUp': thumbUp
//           })
//         })
//         .then(response => {
//           if (response.ok) return response.json()
//         })
//         .then(data => {
//           console.log(data)
//           window.location.reload(true)
//         })
//       });
// });
//
// Array.from(thumbUpCom).forEach(function(element) {
//       element.addEventListener('click', function(){
//       console.log('panda')
//         const msg = this.parentNode.parentNode.querySelector('.msg').innerText
//         const side = this.parentNode.parentNode.querySelector('.side').innerText
//         const comId = this.parentNode.parentNode.querySelector('.comId').innerText
//         const thumbUp = parseFloat(this.parentNode.parentNode.querySelector('.numCom').innerText)
//         console.log(msg, side, comId, comId, thumbUp)
//         fetch('cindy', {
//           method: 'put',
//           headers: {'Content-Type': 'application/json'},
//           body: JSON.stringify({
//             'msg': msg,
//             'side': side,
//             'timestamp': new Date,
//             'comId': comId,
//             'thumbUp': thumbUp
//           })
//         })
//         .then(response => {
//           if (response.ok) return response.json()
//         })
//         .then(data => {
//           console.log(data)
//           window.location.reload(true)
//         })
//       });
// });
