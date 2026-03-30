<?php
require 'db.php';

$sql = "SELECT * FROM registrations ORDER BY registered_at DESC";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html>
<head>
  <title>Admin Panel</title>
</head>
<body>
  <h2>Registered Vehicles</h2>
  <table border="1" cellpadding="8">
    <tr>
      <th>ID</th>
      <th>Vehicle Number</th>
      <th>User Name</th>
      <th>Mall</th>
      <th>Slot</th>
      <th>Time</th>
    </tr>
    <?php while($row = $result->fetch_assoc()): ?>
    <tr>
      <td><?= $row['id'] ?></td>
      <td><?= $row['vehicle_number'] ?></td>
      <td><?= $row['user_name'] ?></td>
      <td><?= $row['mall'] ?></td>
      <td><?= $row['slot'] ?></td>
      <td><?= $row['registered_at'] ?></td>
    </tr>
    <?php endwhile; ?>
  </table>
</body>
</html>
