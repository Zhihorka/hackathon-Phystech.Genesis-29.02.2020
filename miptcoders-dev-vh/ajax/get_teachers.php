<?php
  require_once('../config/config.php');

  if ($CONFIG['mode'] == 'dev') {
    ini_set('error_reporting', E_ALL);
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
  }

  require_once('../db/db.php');
  header('Content-Type: application/json');

  $query = 'SELECT
                  `teachers`.`id` AS `id`,
                  `teachers`.`name` AS `name`,
                  `teachers`.`last_name` AS `last_name`,
                  `teachers`.`patronymic` AS `patronymic`
            FROM `teachers_departments`
            INNER JOIN `teachers` ON `teachers`.`id` = `teachers_departments`.`teacher`
            WHERE `teachers_departments`.`department` = "'.(int)$_GET['department'].'"';
  $res = $mysqli->query($query);
  $i = 0;
  if ($res->num_rows != 0) {
    if ($res->num_rows != 0) {
      while ($row = $res->fetch_assoc()) {
        $result[$i]['id'] = $row['id'];
        $result[$i]['name'] = $row['name'];
        $result[$i]['last_name'] = $row['last_name'];
        $result[$i]['patronymic'] = $row['patronymic'];
        $i++;
      }
    }
  }

  print json_encode($result);
?>
