<?php
require 'db.php';

$vehicle_number = $_POST['vehicle_number'];
$user_name = $_POST['user_name'];
$mall = $_POST['mall'];
$slot = $_POST['slot'];

$sql = "INSERT INTO registrations (vehicle_number, user_name, mall, slot)
        VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssss", $vehicle_number, $user_name, $mall, $slot);

if ($stmt->execute()) {
    echo "Registration successful! <a href='admin.php'>View Admin Panel</a>";
} else {
    echo "Error: " . $conn->error;
}

$stmt->close();
$conn->close();
?>
