<?php
  require_once('../config/config.php');

  if ($CONFIG['mode'] == 'dev') {
    ini_set('error_reporting', E_ALL);
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
  }

  require_once('../db/db.php');
  header('Content-Type: application/json');
  $query = 'SELECT * FROM `department`';
  $res = $mysqli->query($query);
  $i = 0;
  if ($res->num_rows != 0) {
    while ($row = $res->fetch_assoc()) {
      $result[$i]['id'] = $row['id'];
      $result[$i]['name'] = $row['name'];
      $i++;
    }
  }
  print json_encode($result);
?>
