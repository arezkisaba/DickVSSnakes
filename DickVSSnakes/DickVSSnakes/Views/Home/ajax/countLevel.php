<?php

$i = 0;
$dir = opendir('../level/');
if($dir) {
	while($item = readdir($dir)) {
		if($item != '.' && $item != '..') {
			$i += 1;
		}
	}
	closedir($dir);
}
echo $i;

?>