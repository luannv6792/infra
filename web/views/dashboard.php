<?php
$title = "Dashboard";
ob_start();
?>

<h1>Chào mừng, <?= $_SESSION['user'] ?>!</h1>
<p>Đây là dashboard mẫu. Bạn có thể thêm chart, thống kê, v.v.</p>

<?php
$content = ob_get_clean();
require "layout.php";
