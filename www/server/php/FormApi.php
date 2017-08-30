<?php


//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////


class FormApi {

private $API_URL = "https://skyheyapi.azurewebsites.net/api/cirrus?code=4SRVu6pimaCpB9MgGU/bS9oz1Yxl4LDoEtOWh6cctqxkVHCERKKnUQ==&dummy=0";

private $API_URL_PARAM = "action=%action%&path=%path%&name=%name%";

private $m_apiKey = "";



/////////////////////////////////////////////
/////////////////////////////////////////////
public function __construct(){	
}

////////////////////
public function __destruct(){
}

/////////////////////////////////////////////
/////////////////////////////////////////////
private function getContent() {

	  $content;
    if ( ! ccrequest_getPostedContent($content) ) {
		  return "";
    }

    return $content;
}

/////////////////////////////////////////////
public function setApiKey($apiKey) {

	$this->m_apiKey = $apiKey;

}

/////////////////////////////////////////////
public function forwardCall() {

	$RESULT_ERROR = "";

	$content = $this->getContent();
	if (!cstring_xmlContains($content, "cmd")) { return $RESULT_ERROR; }

  $apiKey = $this->m_apiKey;
	if ($apiKey=="") { return $RESULT_ERROR; }
                 
	$data = cstring_xmlMakeTag("apiKey", $apiKey) . $content;
	$url = $this->API_URL;


	$resp;
  $ok = ccweb_httpPost($url, $data, $resp);
  if (!$ok) { return $RESULT_ERROR; }

	//set resp for cmd
	$cmd = cstring_xmlGet($content, "cmd");
	switch ($cmd) {
		case "generateFilledPdf":
			$downloadSession = cstring_xmlGet($resp, "downloadSession");
			$name = cstring_xmlGet($content, "name");
      $name = urlencode($name);
			$param = $this->API_URL_PARAM;
			$param = cstring_replacePlace($param, "action", "downloadFilledPdf");
			$param = cstring_replacePlace($param, "name", $name);
			$param = cstring_replacePlace($param, "path", $downloadSession);
			$downloadUrl = $this->API_URL . "&" . $param;
			$resp = $resp . cstring_xmlMakeTag("downloadUrl", $downloadUrl);
			break;
	}
            
	return $resp;

}

/////////////////////////////////////////////
/////////////////////////////////////////////


} //[class end]
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////


//[ccrequest]
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////
function ccrequest_getPostedContent(&$outData) {
	$postrawdata = file_get_contents("php://input");
	//parse it into vars
	//parse_str($postrawdata);	
	
	if (!isset($postrawdata)) {return FALSE;}
	if ($postrawdata=="") {return FALSE;}
	
	$outData = $postrawdata;
	return TRUE;	
}
/////////////////////////////////////////////



//[cstring]
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////
function cstring_xmlGet($data, $tag){        
    $strTagStart = "<" . $tag . ">";
    $strTagEnd = "</" . $tag . ">";

    return cstring_getPartBetween($data, $strTagStart, $strTagEnd);
}

/////////////////////////////////////////////
function cstring_xmlMakeTag($tag, $v){    
    $strDataTage = "<" . $tag . ">" . $v . "</" . $tag . ">";
    return $strDataTage;
}

/////////////////////////////////////////////
function cstring_xmlContains($data, $tag){    
    $strTagStart = "<" . $tag . ">";
    $strTagEnd = "</" . $tag . ">";

    return cstring_contains($data, $strTagStart);
}


/////////////////////////////////////////////

//////////
function cstring_getRight($s, $length) {
	$start = strlen($s) - $length;
	return substr($s, $start, $length);	
}


//////////
function cstring_getLeft($s, $length) {
	$start = 0;
	return substr($s, $start, $length);
}


//////////
function cstring_getPartBefore($s,$k) {	
	if ($s=="") {return "";}

	$pos=strpos($s, $k);


	if ($pos===false) {return "";}
	else {return substr($s,0,$pos);}
}

	
//////////	
function cstring_getPartAfter ($s,$k) {
	if ($s=="") {return "";}

	$pos=strpos($s, $k);
	if ($pos===false) {return "";}

	$len = strlen($s);
	$lenk = strlen($k);
	$pos2 = $pos+$lenk;
	
	if ($pos2>($len-1)) {return "";}

	return substr($s,$pos2);
}


//////////	
function cstring_getPartBetween($s,$k1,$k2) {
	if ($s=="") {return "";}
	$d=$s;
	$d=cstring_getPartAfter($d,$k1);
	$d=cstring_getPartBefore($d,$k2);
	return $d;
}



//////////
function cstring_revGetPartBefore ($s,$k) {	
	if ($s=="") {return "";}
	
	$pos=strrpos($s, $k);
	
	if ($pos===false) {return "";}

	return substr($s,0,$pos);
	
}

//////////
function cstring_revGetPartAfter ($s,$k) {	
	if ($s=="") {return "";}
	
	$pos=strrpos($s, $k);
	
	if ($pos===false) {return "";}

	
	$len = strlen($s);
	$lenk = strlen($k);
	$pos2 = $pos+$lenk;
	
	if ($pos2>($len-1)) {return "";}

	return substr($s,$pos2);
	
}


//////////
function cstring_contains ($s,$k) {	

	$pos=strpos($s, $k);


	if ($pos===false) {return FALSE;}
	else {return TRUE;}
}



//////////
function cstring_startWith ($s,$k) {	

	if ($s=="") {return FALSE;}

	$pos=strpos($s, $k);

	if ($pos===false) {return FALSE;}
	
	return ($pos==0);
}


//////////
function cstring_endWith ($s,$k) {	
	if ($s=="") {return FALSE;}

	$len=strlen($s);
	$klen=strlen($k);
	if (len<klen) return FALSE;
		
	$pos=strpos($s, $k, $len-$klen);

	if ($pos===false) {return FALSE;}

	return TRUE;
}



//////////
function cstring_replace ($s,$k1,$k2) {	
	//if ($s=="") {return "";}
	return str_replace($k1, $k2, $s);
}


//////////
function cstring_replacePlace ($s,$k,$v) {	
	
	return cstring_replace($s, "%".$k."%", $v);
}


//////////
//////////
function cstring_toString ($v) {		
	if ($v===false) {return "0";}
	else if ($v===true) {return "1";}
	
	//if ( ! $v ) {return "";}
	
	return (string)$v;
}

/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////


//[ccweb]
//imports: cstring
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
//[get]

function ccweb_downloadText($url, &$outResponse) { 
	$response = file_get_contents($url);	
	
	if ($response === false) {return FALSE;} 
	if ($response =="") {return FALSE;} 
	
	$outResponse = $response;
	return TRUE;	
}

/////////////////////////////////////////////
function ccweb_httpGet($url, &$outResponse) { 
	$NL = "\r\n";
	
	$host = _ccweb_getHost($url);
	$uri = _ccweb_getUri($url);

	
	
	// Generate the request header 
	$req = "GET %uri% HTTP/1.1".$NL;
	$req .= "Host: %host%".$NL;
	$req .= "Connection: Close".$NL.$NL;
	
	
	//replace place holders
	$req = cstring_replacePlace($req, "uri", $uri);
	$req = cstring_replacePlace($req, "host", $host);
	
	return _ccweb_sockcall($host, $req, $outResponse);	
}


/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
//[post]


/////////////////////////////////////////////
function _ccweb_getHost($url) { 
	$s = $url;
	if (cstring_contains($s, "://")) { $s=cstring_getPartAfter($s, "://"); }
	if (cstring_contains($s, "/")) { $s=cstring_getPartBefore($s, "/"); }	
	return $s;
} 


/////////////////////////////////////////////
function _ccweb_getUri($url) { 
	$s = $url;
	if (cstring_contains($s, "://")) { $s=cstring_getPartAfter($s, "://"); }
	if (cstring_contains($s, "/")) { $s=cstring_getPartAfter($s, "/"); }
	return "/".$s;
} 


/////////////////////////////////////////////
function ccweb_httpPost($url, $data, &$outResponse) { 
	$NL = "\r\n";

	$host = _ccweb_getHost($url);
	$uri = _ccweb_getUri($url);
	$contentlength = cstring_toString(strlen($data));
	
	// Generate the request header 
	$req = "POST %uri% HTTP/1.1".$NL;
	$req .= "Host: %host%".$NL;
	$req .= "Connection: Close".$NL;
	//$req .= "Content-Type: application/x-www-form-urlencoded".$NL;
	
  //[rev]
  //$req .= "Content-Type: text/xml".$NL;
  
	$req .= "Content-Length: %contentlength%".$NL.$NL;
	$req .= "%data%".$NL;
	
	
	//replace place holders
	$req = cstring_replacePlace($req, "uri", $uri);
	$req = cstring_replacePlace($req, "host", $host);
	$req = cstring_replacePlace($req, "contentlength", $contentlength);
	$req = cstring_replacePlace($req, "data", $data);
		
	
	return _ccweb_sockcall($host, $req, $outResponse);
} 



/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
//[util]
function _ccweb_sockcall($host, &$req, &$outResponse) { 
	$NL = "\r\n";

	$port = 80;

	// Open the connection to the host 
	$socket = fsockopen($host, $port, $errno, $errstr); 

	if (!$socket) {
		//$Result["errno"] = $errno; 
		//$Result["errstr"] = $errstr; 
		//return $Result; 
		return FALSE;
	} 
	
	//write to socket	
	//fputs($socket, $req); 
	fwrite($socket, $req); 
	 
	
	//read response
	$s = _ccweb_readStream($socket);
	

	//close stream
	fclose($socket);
	

	//get content from raw data
	$s = _ccweb_getContent($s);


	
	
	//return
	$outResponse = $s;
	return TRUE;	
}

/////////////////////////////////////////////
function _ccweb_readStream($streamhandle) { 
	//$s = "";
	//$chunk="";
	//while (1) {
	//	$chunk = fread($socket, 1024);
	//	if (strlen($chunk)==0) {break;} 
	//	$s .= $chunk; 
	//}	

	$s = "";
	while (!feof($streamhandle)) {
		//$s .= fgets($socket, 1024);
		$s .= fread($streamhandle, 1024);
	}	
	return $s;
}
	
   
/////////////////////////////////////////////
//function _ccweb_getContent($data) { 		
//	$NL = "\r\n";
//		
//	$data = cstring_getPartAfter($data, $NL.$NL);
//	
//	if (cstring_contains($data, "\r\n")) {$data=cstring_replace($data, "\r\n", "\n");}
//	if (cstring_contains($data, "\r")) {$data=cstring_replace($data, "\r", "\n");}	
//
//	if (!cstring_contains($data, "\n")) {return $data;}
//
//	//$contentlength = cstring_getPartBefore($data, "\n");
//	//$contentlength = cstring_trim($contentlength);	
//	//$contentlength = hexdec($contentlength);		
//	//if ($contentlength>strlen($data)) {return $data;}		
//	//$data = cstring_getPartAfter($data, "\n");
//	//$contentlength = cstring_toInt($contentlength);	
//	//return cstring_substr($data, 0, $contentlength);
//
//	$data = cstring_getPartAfter($data, "\n");
//	return $data;
//}

/////////////////////////////////////////////
function _ccweb_getContent($data) { 		
	//$NL = "\r\n";
	//$data = cstring_getPartAfter($data, $NL.$NL);

	$NLNL = "\r\n\r\n";
		
	$data = cstring_getPartAfter($data, $NLNL);


	//[rev] workaround fix for fedora linux
	//non-microsoft windows		
	if( ! stristr($_SERVER['SERVER_SOFTWARE'],'microsoft') ){ 
		if (cstring_startWith($data, $NLNL)) {
			$data = cstring_getPartAfter($data, $NLNL);
		}
	}

	
	return $data;
}


/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
//[require PHP 5]
function ccweb_httpPost2($url, $data, &$outResponse) { 
     $params = array('http' => array('method' => 'POST', 'content' => $data));          
     $context = stream_context_create($params);

     $fh = fopen($url, 'rb', false, $context);
     if (!$fh) {return FALSE;} 
          
     $response = stream_get_contents($fh);     
     if ($response === false) {return FALSE;} 
          
     $outResponse = $response; 
     return TRUE;     
} 

/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
//[ccio]
function ccio_appendData($filename, $data) {
	//$fh = fopen($filename, "ab");
	$fh = fopen($filename, "at");
	fwrite($fh, $data);		
	fclose($fh);
	return TRUE;
}


//////////////////////////////////////////////////////////////////////////////////////////////





//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////


?>








