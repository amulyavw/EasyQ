// posting questions
window.onload = function() {
    var courseId=localStorage.getItem('currentCourseId')
    const urlParams = new URLSearchParams(window.location.search);
    const semester = urlParams.get('semester');
    const stream = urlParams.get('stream');
    console.log(semester, stream);
    var ul = document.getElementById('sidenav');
    var url = window.location.href;
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
        li.innerHTML ="<a class = 'side-link' id='course_"+course.id+"' onclick=showQuestions("+course.id+")>"+course.name+"</a>";

        ul.appendChild(li);
      })
      showQuestions(courses[0].id);
    })
}
document.getElementById('postButton').addEventListener('click', function(){
  var question = document.getElementById('question').value;
  var regNo = localStorage.getItem('regNo');
  console.log("registration",regNo);
  var courseId=localStorage.getItem('currentCourseId')
  var formData = new FormData()
  formData.append('question', question);
  formData.append('regNo', regNo);
  fetch('/compose?courseId='+ courseId,{
    method: 'post',
    body: formData
  })
  .then(
    function(response) {
      if (response.status !== 200) {
        alert("Invalid");
      } else {
        showQuestions(courseId);

      }
    })
}
);

function showQuestions(courseId){
  document.getElementById('question').value=''
var element = document.getElementById('course_'+courseId);
  var container = document.getElementById('quesBox')
fetch('/questions/?courseId='+courseId,{
  method: 'get'
})
.then(response => response.json())
.then(data => {
  console.log(data)
  questions = data.questions;
  container.innerHTML= "";
  questions.forEach(question => {
  console.log(question)
  var questionId = question.question_id;
  var h6 = document.createElement('h6');
  h6.innerHTML = question.user_name;
   var p = document.createElement('p');
    p.innerHTML = "<a class='question-link' href='answer?questionId="+questionId+"'>"+question.question+"</a>"
    container.appendChild(h6);
    container.appendChild(p);
  })
})
var prevCourseId=localStorage.getItem('currentCourseId')
var prevElement = document.getElementById('course_'+prevCourseId);
prevElement.classList.remove("activeCourse");
localStorage.setItem('currentCourseId', courseId);
element.classList.add("activeCourse");
}
