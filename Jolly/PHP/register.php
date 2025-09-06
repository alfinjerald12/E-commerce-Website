<?php

include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fullname = $_POST['fullname'];
    $email    = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_BCRYPT);
    $phone    = $_POST['number'];

    // Check if email already exists
    $check = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $check->bind_param("s", $email);
    $check->execute();
    $check->store_result();

    if ($check->num_rows > 0) {
        echo "<h2>⚠️ Email already registered!</h2>";
        echo "<a href='../HTML/home.html'><button>Continue Shopping</button></a>";
    } else {
        $stmt = $conn->prepare("INSERT INTO users (fullname, email, password, phone) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $fullname, $email, $password, $phone);

        if ($stmt->execute()) {
            echo "<h2>🎉 Registration Successful!</h2>";
            echo "<a href='../HTML/home.html'><button>Continue Shopping</button></a>";
        } else {
            echo "<h2>❌ Error: " . $stmt->error . "</h2>";
            echo "<a href='../HTML/home.html'><button>Go Back</button></a>";
        }
        $stmt->close();
    }

    $check->close();
    $conn->close();
}
?>
<style>
    body {
        font-family: Arial, sans-serif;
        text-align: center;
        margin-top: 50px;
    }
    h2 {
        color: #4CAF50;
    }
    button {
        background-color: #45a049;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
    }
    button:hover {
        background-color: #4CAF50;
         transform: scale(1.1);
         cursor: pointer;
    }
</style>