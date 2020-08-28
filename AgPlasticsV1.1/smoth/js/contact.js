function displayResponse(state, message) {
    let messageBlock = document.querySelector('.response_layer');
    
    if (state === "sending") {
        messageBlock.style.display = "block";
        messageBlock.innerHTML = '<img src="../img/ajax-loader.gif" alt="ajax loader">';
    } else if (state === "success") {
        messageBlock.classList.add('success', 'animate__animated', 'animate__fadeInUp');
        messageBlock.innerHTML = message;
        setTimeout(function () {
            messageBlock.classList.remove('success', 'animate__animated', 'animate__fadeInUp');
            messageBlock.innerHTML = '';
        }, 5000);
    } else if (state === "failed") {
        messageBlock.classList.add('error', 'animate__animated', 'animate__fadeInUp');
        messageBlock.innerHTML = message;
        setTimeout(function () {
            messageBlock.classList.remove('error', 'animate__animated', 'animate__fadeInUp');
            messageBlock.innerHTML = '';
        }, 5000);
    }
}
jQuery(document).ready(function ($) {
    submitForm = function () {
        var name = $('#name').val();
        var email = $('#email').val();
        var subject = $('#subject').val();
        var message = $('#message').val();
        
        if ((name !== "" && name.length > 1) && (email !== "" && email.length > 1) && (subject !== "" && subject.length > 1) && (message !== "" && message.length > 1)) {
            displayResponse('sending', '');
            $.ajax({
                url: "../mail.php",
                data: {
                    'name': name,
                    'email': email,
                    'message': message,
                    'subject': subject,
                    'submit': ''
                },
                dataType: 'json',
                type: 'POST',
                async: true,
                success: function (result) {
                    console.log(result);
                },
                error: function(xhr, status, error) {
                    console.log(xhr);
                    console.log(status);
                    console.log(error);
                    displayResponse("failed", "Shits done hit the fan")
                }
            })
        } else {
            displayResponse("failed", "Please fill out the fields to submit the form");
        }
    } 
})
