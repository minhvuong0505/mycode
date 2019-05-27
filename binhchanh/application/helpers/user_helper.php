<?php
function JS_Msg($sMsg, $sScript = "history.go(-1)"){
    $sMsg = str_replace("<br>","\\n", $sMsg);
    $sMsg = str_replace("\"",'\'', $sMsg);
    $sMsg = str_replace(array("\r", "\n"), "", $sMsg);
    echo "<script type=\"text/javascript\">\n alert(\"$sMsg\");\n $sScript \n</script>";
}

function is_admin()
{
    if(isset($_SESSION['id']) && $_SESSION['id'] == 'admin')
        return true;
    return false;
}

function returnMain()
{
    header('Location: '. $_SERVER['HTTP_HOST']);
}