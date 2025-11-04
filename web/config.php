<?php
// cấu hình frontend -> backend
// chỉnh BACKEND_HOST thành IP node (ví dụ: 192.168.49.2) hoặc hostname truy cập từ cluster
// nếu bạn giữ NodePort 32001 cho backend thì endpoint LOGIN_URL = http://<NODE_IP>:32001/api/login
return [
    'BACKEND_BASE' => 'http://NODE_IP:32001/api', // <-- sửa NODE_IP thành địa chỉ node của bạn
    // ví dụ: 'http://192.168.49.2:32001/api'
];
