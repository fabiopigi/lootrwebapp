<?php
// The URL of the backend server that browser requests should be proxied to
$CMS_SERVERHOST = 'http://152.96.56.70:8080/lootrserver/api/v1/';

// The path to the proxy script on the frontend server
$PROXYNAME = '/api/v1/';



// This is needed for Gentics Content.Node to set the URL's to this proxy.
// You can add multiple parameters by just appending them with a &
$HTTP_URL_ADD_QUERY_PARAMETERS = 'proxyprefix=' . $PROXYNAME;

// Max times to follow a HTTP redirection response to a new URL
$HTTP_MAX_REDIRECTS = 10;
