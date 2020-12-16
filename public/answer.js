window.onload = function() {
  showAnswers();
}


document.getElementById('ansButton').addEventListener('click', function(){
  const urlParams = new URLSearchParams(window.location.search);
  const questionId = urlParams.get('questionId');
  var answer = document.getElementById('answer').value;
  var regNo = localStorage.getItem('regNo');
  console.log("registration",regNo);
  var formData = new FormData()
  formData.append('answer', answer);
  formData.append('regNo', regNo);
  formData.append('questionId', questionId)
  fetch('/answer',{
    method: 'post',
    body: formData
  })
  .then(
    function(response) {
      if (response.status !== 200) {
        alert("Invalid");
      } else{
        showAnswers();
      }

    })
  })



  function showAnswers(){
    var container = document.getElementById('ansBox')
    var cont = document.getElementById('question')
    const urlParams = new URLSearchParams(window.location.search);
    const questionId = urlParams.get('questionId');
  fetch('/answers?questionId='+questionId,{
    method: 'get'
  })
  .then(response => response.json())
  .then(data => {
    console.log(data)
    answers = data.answers;
    cont.innerHTML=""
    container.innerHTML= "";
    var queP= document.createElement('p');
    queP.innerHTML=data.question;
    cont.appendChild(queP);

    answers.forEach(answer => {
    var answerId = answer.answer_id;
    var h6 = document.createElement('h6');
    h6.innerHTML = answer.user_name;
     var p = document.createElement('p');
      p.innerHTML = answer.answer
      container.appendChild(h6);
      container.appendChild(p);

    })
  })
  }
