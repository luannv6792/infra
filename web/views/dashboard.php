<?php
$title = "Dashboard";
ob_start();
?>

<h1>Welcome!, <?= $_SESSION['user'] ?>!</h1>
<p>Welcome</p>

<?php
$content = ob_get_clean();
require "layout.php";
