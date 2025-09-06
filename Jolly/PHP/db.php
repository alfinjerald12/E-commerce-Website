<?php
$host = "localhost";   // XAMPP default
$user = "root";        // default username
$pass = "";            // default password (leave blank in XAMPP)
$dbname = "jollyfashion";

// Create connection
$conn = new mysqli($host, $user, $pass, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
