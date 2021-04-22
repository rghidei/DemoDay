var thumbUp = document.getElementsByClassName("profileT");
var trash = document.getElementsByClassName("fa-trash");
// var stageThumbUp = document.getElementsByClassName("stageT");
// var thumbDown = document.getElementsByClassName("fa-thumbs-down");


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


      // document.querySelector('.stageT').addEventListener('click', addLike)
      //
      //
      // function addLike(){
      // console.log('panda2')
      //   const tag = this.parentNode.parentNode.querySelector('.tagStage').innerText
      //   const dicuss = this.parentNode.parentNode.querySelector('.dicussStage').innerText
      //   const background = this.parentNode.parentNode.querySelector('.infoStage').innerText
      //   const postId = this.parentNode.parentNode.querySelector('.postIdStage span').innerText
      //   const thumbUp = parseFloat(this.parentNode.parentNode.querySelector('.thumbStage').innerText)
      //   console.log(tag, dicuss, background, postId, thumbUp)
      //   fetch('bob', {
      //     method: 'put',
      //     headers: {'Content-Type': 'application/json'},
      //     body: JSON.stringify({
      //       'tag': tag,
      //       'dicuss': dicuss,
      //       'background': background,
      //       'timestamp': new Date,
      //       'postId': postId,
      //       'thumbUp': thumbUp
      //     })
      //   })
      //   .then(response => {
      //     if (response.ok) return response.json()
      //   })
      //   .then(data => {
      //     console.log(data)
      //     window.location.reload(true)
      //   })
      // };


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
// Array.from(thumbDown).forEach(function(element) {
//       element.addEventListener('click', function(){
//         const tag = this.parentNode.parentNode.childNodes[1].innerText
//         const bill = this.parentNode.parentNode.childNodes[3].innerText
//         const dicuss = this.parentNode.parentNode.childNodes[5].innerText
//         const background = this.parentNode.parentNode.childNodes[7].innerText
//         const thumbDown = parseFloat(this.parentNode.parentNode.childNodes[11].innerText)
//         console.log(thumbDown)
//         fetch('messagesTwo', {
//           method: 'put',
//           headers: {'Content-Type': 'application/json'},
//           body: JSON.stringify({
//             'tag': tag,
//             'bill': bill,
//             'dicuss': dicuss,
//             'background': background,
//             'thumbDown':thumbDown
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

// Array.from(thumbUp).forEach(function(element) {
//       element.addEventListener('click', function(){
//         const msg = this.parentNode.parentNode.childNodes[1].innerText
//         const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[3].innerText)
//         fetch('msg', {
//           method: 'put',
//           headers: {'Content-Type': 'application/json'},
//           body: JSON.stringify({
//             'msg': msg,
//             'thumbUp':thumbUp
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
// Array.from(trash).forEach(function(element) {
//       element.addEventListener('click', function(){
//         const msg = this.parentNode.parentNode.childNodes[1].innerText
//         fetch('msgThree', {
//           method: 'delete',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//             'msg': msg,
//
//           })
//         }).then(function (response) {
//           window.location.reload()
//         })
//       });
// });
document.querySelector('.followerBtn').addEventListener('click', addPost)

function addPost(){

}
