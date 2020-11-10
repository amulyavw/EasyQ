document.getElementById('loginButton').addEventListener('click',
 function(){
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
      }
      else{
        document.querySelector('.reg-form').style.display = 'flex';
      }
    })
    .catch(function(err) {
   console.log('Fetch Error :-S', err);
 });
});

// for signup
document.getElementById('signupButton').addEventListener('click',
 function(){
   var fname = document.getElementById('fname').value;
   var lname = document.getElementById('lname').value;
   var email = document.getElementById('email').value;
   var regNo = document.getElementById('regNo').value;
   var password = document.getElementById('password').value;
   var rpassword = document.getElementById('rpassword').value;
   var formData = new FormData()
   formData.append('fname', fname);
   formData.append('lname', lname);
   formData.append('email', email);
   formData.append('regNo', regNo);
   formData.append('password', password);
   formData.append('repassword', rpassword);
   fetch('/reg', {
        method: 'post',
          body: formData
    })
    .then(
      function(response) {
      if (response.status !== 200) {
        alert("Please fill all the entries");
      }
      else{
        document.querySelector('.reg-form').style.display = 'flex';
      }
    })
    .catch(function(err) {
   console.log('Fetch Error :-S', err);
 });
});
