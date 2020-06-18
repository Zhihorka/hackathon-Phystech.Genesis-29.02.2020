<?php
  if (isset($_GET['act'])){
    switch ($_GET['act']) {
      case 'new':
          include('modules/new.php');
        break;
    }
  }
 ?>
