<?php
/**
 * Created by PhpStorm.
 * User: chenjiang
 * Author: chenjiang <chenjiang@xiaomi.com>
 * Date: 17-2-16
 * Time: 下午7:35
 */
$files = $_POST['uploads'];
$response = array();
foreach ($files as $file) {
    $response[] = array(
        'name' => $file['filename'],
        'base64' => $file['base64'],
        'last_modified' => $file['last_modified'],
        'size' => $file['size'],
        'type' => $file['type'],
    );
}
echo json_encode($response);