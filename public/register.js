document.getElementById('loginButton').addEventListener('click',
  function() {
    const urlParams = new URLSearchParams(window.location.search);
    const userType = urlParams.get('user');
    if (!userType) {
      alert('Invalid page');
      return;
    }

    var regNo = document.getElementById('regNo').value;
    var password = document.getElementById('password').value;
    console.log(regNo, password);
    var formData = new FormData()
    formData.append('regNo', regNo);
    formData.append('password', password);
    fetch('/login', {
        method: 'post',
        body: formData
      })
      .then(
        function(response) {
          if (response.status !== 200) {
            alert("Incorrect registeration number or password");
          } else {
            localStorage.setItem('regNo', regNo);
            getStreams();
            document.querySelector('.reg-form').style.display = 'flex';
          }
        })
      .catch(function(err) {
        console.log('Fetch Error :-S', err);
      });
  });

// for signup
document.getElementById('signupButton').addEventListener('click',
  function() {
    const urlParams = new URLSearchParams(window.location.search);
    const userType = urlParams.get('user');
    var fname = document.getElementById('fname').value;
    var lname = document.getElementById('lname').value;
    var email = document.getElementById('email').value;
    var sRegNo = document.getElementById('sRegNo').value;
    var sPassword = document.getElementById('sPassword').value;
    var rPassword = document.getElementById('rPassword').value;
    var formData = new FormData()
    formData.append('fname', fname);
    formData.append('lname', lname);
    formData.append('email', email);
    formData.append('sRegNo', sRegNo);
    formData.append('sPassword', sPassword);
    formData.append('rPassword', rPassword);
    formData.append('userType', userType);
    fetch('/reg', {
        method: 'post',
        body: formData

      })
      .then(
        function(response) {
          if (response.status !== 200) {
            alert("Please fill all the entries");
          } else {
            localStorage.setItem('regNo', sRegNo)
            document.querySelector('.reg-form').style.display = 'flex';
          }
        })
      .catch(function(err) {
        console.log('Fetch Error :-S', err);
      });
  });


// sem  popup form
function add_option(select_id, text, id) {
  var select = document.getElementById(select_id);
  select.options[select.options.length] = new Option(text, id);
}

function getStreams() {
  fetch('/details/', {
      method: 'get'
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      streams = data.streams;
      streams.forEach(stream => {
        console.log(stream)
        add_option("inputStream", stream.name, stream.id);
      })
      data.semesters.forEach(sem => {
        console.log(sem)
        add_option("inputSem", sem);
      })
    })
}
document.getElementById('submitButton').onclick = function navCourses() {
  let params = (new URL(document.location)).searchParams;
  var semester = document.getElementById('inputSem').value;
  var stream = document.getElementById('inputStream').value;
  console.log(semester, stream);
  window.location.href = "/Q&A?stream="+stream+"&semester="+semester;
}
