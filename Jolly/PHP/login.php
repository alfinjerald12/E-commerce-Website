<?php
session_start();
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email    = $_POST['email'];
    $password = $_POST['password'];

    $stmt = $conn->prepare("SELECT id, fullname, password FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($id, $fullname, $hashed_password);
        $stmt->fetch();

        if (password_verify($password, $hashed_password)) {
            $_SESSION['user'] = $fullname;
            echo "<h2>✅ Login Successful! Welcome, $fullname</h2>";
            echo "<a href='../HTML/home.html'><button>Continue Shopping</button></a>";
        } else {
            echo "<h2>❌ Invalid password!</h2>";
        echo "<a href='../HTML/home.html'><button>Go Back</button></a>";
        }
    } else {
        echo "<h2>⚠️ User not found!</h2>";
        echo "<a href='../HTML/home.html'><button>Go Back</button></a>";
    }

    $stmt->close();
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