<?php

$host = 'localhost';
$db = 'u989967598_eshop';
$user = 'u989967598_eshop';
$pass = 'U989967598_eshop';

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die('Connection failed');
}

$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$mobile = $_POST['mobile'] ?? '';
$state = $_POST['state'] ?? '';
$gender = $_POST['gender'] ?? '';
$message = $_POST['message'] ?? '';

$stmt = $conn->prepare("INSERT INTO contact_submissions (name, email, mobile_no, state, gender, message) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssss", $name, $email, $mobile, $state, $gender, $message);
$success = $stmt->execute();

echo $success ? 'success' : 'error';

$stmt->close();
$conn->close();
?>
