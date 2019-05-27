<h3>List HTML files</h3>

<?php 
foreach (glob("*.*") as $filename) {
	if($filename != 'index.php')
	{
		echo '<a target="blank" href="/html/'.$filename.'">'.$filename.'</a><br />';
	}
    
}
 ?>