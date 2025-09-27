<?php
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fullname = $_POST['fullname'];
    $email    = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_BCRYPT);
    $phone    = $_POST['number'];

    $check = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $check->bind_param("s", $email);
    $check->execute();
    $check->store_result();

    if ($check->num_rows > 0) {
        echo json_encode(["status" => "error", "message" => "Email already registered"]);
    } else {
        $stmt = $conn->prepare("INSERT INTO users (fullname, email, password, phone) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $fullname, $email, $password, $phone);

        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "user" => $fullname]);
        } else {
            echo json_encode(["status" => "error", "message" => "Registration failed"]);
        }
        $stmt->close();
    }

    $check->close();
    $conn->close();
}
?>
