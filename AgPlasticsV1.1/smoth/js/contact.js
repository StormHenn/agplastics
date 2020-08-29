function displayResponse(state, message) {
    var button = document.querySelector('.send-mail-btn');
    
    if (state === "sending") {
        button.innerHTML = '<img src="../img/ajax-loader.gif" alt="ajax loader">';
    } else if (state === "success") {
        button.classList.add('btn-success', 'animate__animated', 'animate__fadeInUp');
        button.innerHTML = message;
    } else if (state === "failed") {
        button.classList.add('btn-danger', 'animate__animated', 'animate__fadeInUp');
        button.innerHTML = message;
    }
}

function submitForm() {
    var name = document.getElementById('name').value; 
    var email = document.getElementById('email').value; 
    var message = document.getElementById('message').value; 
    var subject = document.getElementById('subject').value; 
    var submit = ''; 
    
    var data = {
        name: name,
        email: email,
        message: message,
        subject: subject,
        submit: submit
    };
    
    data = checkData(data);
    
    if (data.errors.length > 0) { 
        displayResponse('failed', data.errors[0]);       
    } else {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (this.readyState == 1) {
                displayResponse('sending', '');
            }
            if (this.readyState == 4 && this.status == 200) {   
                if (this.responseText == 'success') {
                    displayResponse('success', 'Your message has been sent!');
                    Swal.fire({
                        icon: 'success',
                        title: 'Your Message Has Been Sent!',
                        text: 'Thanks for getting in touch with us. We will get back to you within 1 working day.',
                        confirmButtonText: 'Close'
                    })
                    name = '';
                    email = '';
                    message = '';
                    subject = '';
                    setTimeout(function() {
                        var button = document.querySelector('.send-mail-btn');
                        button.classList.remove('btn-success');
                        button.innerHTML = 'Send Mail';
                    }, 5000);
                }
            }
        }
        request.open("POST", 'mail.php', true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.send(`name=${data.name}&subject=${data.subject}&email=${data.email}&message=${data.message}&submit=${data.submit}`);
    }
}

function checkData(dataObj) {
    dataObj.errors = [];
    var regex = /<[^>]+>/g;
    var name = dataObj.name.replace(regex, '').trim();
    var email = dataObj.email.replace(regex, '').trim();
    var subject = dataObj.subject.replace(regex, '').trim();
    var message = dataObj.message.replace(regex, '').trim();
    
    if (name !== '' && name.length < 30) {
        dataObj.name = name;
    } else {
        dataObj.errors.push('Name must be 1-30 characters');
    }
    
    if (email !== '' && email.length < 50) {
        dataObj.email = email;
    } else {
        dataObj.errors.push('Email must be 1-50 characters');
    }
   
    if (subject !== '' && subject.length < 30) {
        dataObj.subject = subject;
    } else {
        dataObj.errors.push('Subject must be 1-30 characters');
    }
    
    if (message !== '' && message.length < 500) {
        dataObj.message = message;
    } else {
        dataObj.errors.push('Message must be 1-500 characters');
    }
    
    return dataObj
}