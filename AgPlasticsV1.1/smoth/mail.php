<?php
if (isset($_POST["submit"])) {
    $error = [];
    $name = strip_tags(trim($_POST["name"]));
    $name = str_replace(array("\r", "\n"), array(" ", " "), $name);
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $subject = trim($_POST["subject"]);
    $message = trim($_POST["message"]);

    function validate_post_variables($name, $email, $subject, $message)
    {
        if (trim($name) !== "" && strlen(trim($name)) > 30 && !empty($name)) {
            $error["error_message"] = "Name can not be longer than 30 characters";
        }
        if (trim($email) !== "" && strlen(trim($email)) > 50 && !empty($email)) {
            $error["error_message"] = "Email can not be longer than 50 characters";
        }
        if (trim($subject) !== "" && strlen(trim($subject)) > 30 && !empty($subject)) {
            $error["error_message"] = "Subject can not be longer than 30 characters";
        }
        if (trim($message) !== "" && strlen(trim($message)) > 30 && !empty($message)) {
            $error["error_message"] = "Message can not be longer than 30 characters";
        }

        if (count($error) > 0) {
            return false;
        } else {
            return true;
        }
    }

    $error["is_ok"] = validate_post_variables($name, $email, $subject, $message);

    // Set the recipient email address.
    // FIXME: Update this to your desired email address.
    $recipient = "jaredbecker46@gmail.com";

    // Set the email subject.
    $subject = "New contact from $name";

    // Build the email content.
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Subject: $subject\n\n";
    $email_content .= "Message:\n$message\n";

    // Build the email headers.
    $email_headers = "From: $name <$email>";

    // Send the email.
    if ($error["is_ok"]) {
        if (mail($recipient, $subject, $email_content, $email_headers)) {
            // Set a 200 (okay) response code.
            // http_response_code(200);
            $is_sent = true;
            // header("Location: index.php#contact-form");
        } else {
            // Set a 500 (internal server error) response code.
            // http_response_code(500);
            $is_sent = false;
            // header("Location: index.php#contact-form");
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@9.17.1/dist/sweetalert2.all.min.js"></script>
    <style>
        body {
            font-family: 'Open Sans', sans-serif;
        }
    </style>
    <title>Document</title>
</head>

<body>
    <?
    if ($is_sent) {
    ?>
    <script>
        Swal.fire({
            icon: 'success',
            title: 'Yeah son!',
            text: 'Your message has been sent!',
            footer: '<a href="index.php">Click here to return to site</a>'
        })
    </script>
    <?
    } else {
        ?>
    <script>
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href="index.php#contact-form">Please try again</a>'
        })
    </script>
    <?
    }
    ?>
</body>

</html>