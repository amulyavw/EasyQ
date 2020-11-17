// posting questions
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const semester = urlParams.get('semester');
    const stream = urlParams.get('stream');
    console.log(semester, stream);
    var ul = document.getElementById('sidenav');
    fetch('/courses?stream='+stream+'&semester='+semester, {
      method: 'get'
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      courses = data.courses;
      courses.forEach(course => {
      console.log(course)
       var li = document.createElement('li');
        li.innerHTML ="<a class = 'side-link' href='#'>"+course.name+"</a>";
        ul.appendChild(li);
      })

})
showQuestions();
}

document.getElementById('postButton').addEventListener('click', function(){
  var question = document.getElementById('question').value;
  var regNo = localStorage.getItem('regNo');
  console.log("registration",regNo);
  var formData = new FormData()
  formData.append('question', question);
  formData.append('regNo', regNo);
  fetch('/compose',{
    method: 'post',
    body: formData
  })
  .then(
    function(response) {
      if (response.status !== 200) {
        alert("Invalid");
      } else {
        showQuestions();

      }
    })
}
);

function showQuestions(){
  var container = document.getElementById('quesBox')
fetch('/questions',{
  method: 'get'
})
.then(response => response.json())
.then(data => {
  console.log(data)
  questions = data.questions;
  container.innerHTML= "";
  questions.forEach(question => {
  console.log(question)
  var h6 = document.createElement('h6');
  h6.innerHTML = question.user_name;
   var p = document.createElement('p');
    p.innerHTML =question.question;
    container.appendChild(h6);
    container.appendChild(p);
  })
})
}
