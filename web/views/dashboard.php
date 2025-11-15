<?php
$title = "Dashboard";
ob_start();
?>

<h1>Dashboard</h1>
<p>Chào mừng, <?= $_SESSION["user"] ?>!</p>
<p>Đây là giao diện dashboard mẫu. Bạn có thể yêu cầu thêm chart, thống kê, v.v.</p>

<?php
$content = ob_get_clean();
require "views/layout.php";
