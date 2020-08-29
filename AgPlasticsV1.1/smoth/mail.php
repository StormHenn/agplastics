<?php
if (isset($_POST["submit"])) {
    $errors = [];
    $name = strip_tags(trim($_POST["name"]));
    $name = str_replace(array("\r", "\n"), array(" ", " "), $name);
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $subject = trim($_POST["subject"]);
    $message = trim($_POST["message"]);

    function validate_post_variables($name, $email, $subject, $message) {
        if (trim($name) == "" || strlen($name) > 30) {
            $errors["error_message"] = "Name can not be longer than 30 characters";
        }
        if (trim($email) == "" || strlen($email) > 50) {
            $errors["error_message"] = "Email can not be longer than 50 characters";
        }
        if (trim($subject) == "" || strlen($subject) > 30) {
            $errors["error_message"] = "Subject can not be longer than 30 characters";
        }
        if (trim($message) == "" || strlen($message) > 500) {
            $errors["error_message"] = "Message can not be longer than 500 characters";
        }
        
        
        if (count($errors) > 0) {
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
            echo 'success';
        }
    } else {
        echo json_encode($errors);
    }
}

?>
