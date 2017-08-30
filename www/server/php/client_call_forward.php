<?php


include_once ("./FormApi.php");	


/////////////////////////////////////////////
/////////////////////////////////////////////

    //specify your api key here
    $API_KEY = "MzNkNGY1ZDJjMjUwMTJlOWM4N2Q2ZTMxMzczMGQ2MjY=-NjM2MzQ2NTEzMjc1MDE4MjYyZFVZOWRnaTc2ZGdkeDg3NjN6MTY=";

    $api = new FormApi();
    $api->setApiKey($API_KEY);
    $result = $api->forwardCall();
		echo $result;

/////////////////////////////////////////////
/////////////////////////////////////////////
    
?>







