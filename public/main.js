var thumbUp = document.getElementsByClassName("fa-thumbs-up");
var trash = document.getElementsByClassName("fa-trash");
var thumbDown = document.getElementsByClassName("fa-thumbs-down");


Array.from(thumbUp).forEach(function(element) {
      element.addEventListener('click', function(){
        const tag = this.parentNode.parentNode.childNodes[1].innerText
        const bill = this.parentNode.parentNode.childNodes[3].innerText
        const dicuss = this.parentNode.parentNode.childNodes[5].innerText
        const background = this.parentNode.parentNode.childNodes[7].innerText
        const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[9].innerText)
        fetch('messages', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'tag': tag,
            'bill': bill,
            'dicuss': dicuss,
            'background': background,
            'thumbUp':thumbUp
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
        const tag = this.parentNode.parentNode.childNodes[1].innerText
        const bill = this.parentNode.parentNode.childNodes[3].innerText
        const dicuss = this.parentNode.parentNode.childNodes[5].innerText
        const background = this.parentNode.parentNode.childNodes[7].innerText
        fetch('messages', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'tag': tag,
            'bill': bill,
            'dicuss': dicuss,
            'background': background
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
Array.from(thumbDown).forEach(function(element) {
      element.addEventListener('click', function(){
        const tag = this.parentNode.parentNode.childNodes[1].innerText
        const bill = this.parentNode.parentNode.childNodes[3].innerText
        const dicuss = this.parentNode.parentNode.childNodes[5].innerText
        const background = this.parentNode.parentNode.childNodes[7].innerText
        const thumbDown = parseFloat(this.parentNode.parentNode.childNodes[11].innerText)
        console.log(thumbDown)
        fetch('messagesTwo', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'tag': tag,
            'bill': bill,
            'dicuss': dicuss,
            'background': background,
            'thumbDown':thumbDown
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

Array.from(thumbUp).forEach(function(element) {
      element.addEventListener('click', function(){
        const msg = this.parentNode.parentNode.childNodes[1].innerText
        const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[3].innerText)
        fetch('msg', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'msg': msg,
            'thumbUp':thumbUp
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
        const msg = this.parentNode.parentNode.childNodes[1].innerText
        fetch('msgThree', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'msg': msg,

          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
Array.from(thumbDown).forEach(function(element) {
      element.addEventListener('click', function(){
        const msg = this.parentNode.parentNode.childNodes[1].innerText
        const thumbDown = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
        console.log(thumbDown)
        fetch('msgTwo', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'msg': msg,
            'thumbDown':thumbDown
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
