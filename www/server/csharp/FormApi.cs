using System;
using System.Web;

using System.IO;
using System.Net;
using System.Text;



using skyhey.Util;



namespace skyhey
{
    public class FormApi
    {

        ////private const String API_URL = "http://localhost/api/index.aspx?dummy=0";
        private const String API_URL = "https://skyheyapi.azurewebsites.net/api/cirrus?code=4SRVu6pimaCpB9MgGU/bS9oz1Yxl4LDoEtOWh6cctqxkVHCERKKnUQ==&dummy=0";

        private const String API_URL_PARAM = "action=%action%&path=%path%&name=%name%";


        private String m_apiKey = "";

        public FormApi()
		{
     	}


        ///////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////
        private string getContent(HttpRequest req)
        {
            string data = "";

            if (req.RequestType == "POST")
            {
                req.InputStream.Seek(0, SeekOrigin.Begin);
                using (StreamReader reader = new StreamReader(req.InputStream))
                {
                    data = reader.ReadToEnd();
                }

            }

            return data;
        }

        ///////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////
        public void setApiKey(String apiKey)
        {
            m_apiKey = apiKey;
        }

        public String forwardCall(HttpRequest req)
        {
            var RESULT_ERROR = "";

            var content = getContent(req);
            if (!CString.XmlContains(content, "cmd")) { return RESULT_ERROR; }
            if (m_apiKey=="") { return RESULT_ERROR; }
            
       

            var data = CString.XmlMakeTag("apiKey", m_apiKey) + content;

            var url = API_URL;

            int TIME_OUNT = 600000;
            String resp;
            bool ok = CWeb.PostText(url, data, TIME_OUNT, out resp);
            if (!ok) { return RESULT_ERROR; }


            //set resp for cmd
            var cmd = CString.XmlGet(content, "cmd");
            switch (cmd) {
                case "generateFilledPdf":
                    var downloadSession = CString.XmlGet(resp, "downloadSession");
                    var name = CString.XmlGet(content, "name");
                    name = HttpUtility.UrlEncode(name);
                    var param = API_URL_PARAM;
                    param = CString.ReplacePlace(param, "action", "downloadFilledPdf");
                    param = CString.ReplacePlace(param, "name", name);
                    param = CString.ReplacePlace(param, "path", downloadSession);
                    var downloadUrl = API_URL + "&" + param;
                    resp += CString.XmlMakeTag("downloadUrl", downloadUrl);
                    break;
            }
            
            return resp;
        }

        ///////////////////////////////////////////////////////////////////////////////////////////
        //public String generateFilledPdf(String formId, String formName, String formData)
        //{
        //}
        /////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////


    }
}





////////////////////////////////////////////////////////////////////////////////////////////////
//[CWeb]
//
//purpose:  http web util
////////////////////////////////////////////////////////////////////////////////////////////////


namespace skyhey.Util
{
	

	/////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////
	//[CWeb]
	public class CWeb
	{

        ///////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////        
        ///////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////
        public static bool AcceptAllCertifications(object sender, System.Security.Cryptography.X509Certificates.X509Certificate certification, System.Security.Cryptography.X509Certificates.X509Chain chain, System.Net.Security.SslPolicyErrors sslPolicyErrors)
        {
            return true;
        }


    	///////////////////////////////////////////////////////////////////////////////////////
        public static bool HttpGet(String strUrl, int timeout, out String outResponse)
        {
            //*****parameters: timout in ms
            outResponse = "";

            //-----Request    
            // Initialize the WebRequest.
            System.Net.WebRequest myRequest;
            try {
                myRequest = System.Net.WebRequest.Create(strUrl);
                myRequest.Timeout = timeout;
            }
            catch (Exception ex) {
                String msg = ex.Message;
                return false;
            }


            //-----Response
            // return the response. 
            System.Net.WebResponse myResponse = null;


            //[rev]
            if (CString.StartWith(strUrl, "https"))
            {
                ServicePointManager.ServerCertificateValidationCallback = new System.Net.Security.RemoteCertificateValidationCallback(AcceptAllCertifications);
            }

            try {
                myResponse = myRequest.GetResponse();
                String strResponse = StreamToUTF8String(myResponse.GetResponseStream());

                outResponse = strResponse;

                // Code to use the WebResponse goes here.
                // Close the response to free resources.
                myResponse.Close();

                //OK
                return true;
            }
            //catch (Exception ex) {
            //    String msg = ex.Message;
            //    if (myResponse !=null) {
            //        myResponse.Close();
            //    }

            //    return false;
            //}
            catch (WebException ex) {

                if (ex.Status == WebExceptionStatus.ProtocolError && ex.Response != null)
                {
                    var resp = (HttpWebResponse) ex.Response;
                    if (resp.StatusCode == HttpStatusCode.NotFound)
                    {
                        outResponse = "NotFound";
                    }
                    else if (resp.StatusCode == HttpStatusCode.BadRequest)
                    {
                        outResponse = "BadRequest";
                    }
                    else
                    {
                        outResponse = "";
                    }
                }
                else
                {
                    outResponse = "";
                }

                //String msg = ex.Message;
                if (myResponse !=null) {
                    myResponse.Close();
                }

                return false;
            }


        }


        private static String StreamToUTF8String(System.IO.Stream stream) 
        {
            StreamReader sr  = new StreamReader(stream, Encoding.UTF8);
            String data = sr.ReadToEnd();
            return data;
        }    

      	/////////////////////////////////////////////////////////////////////////////////////////
        public static bool HttpPost(String strUrl, byte[] byteArray, int timeout, out String outResponse) 
        {
            //*****parameters: timout in ms

            outResponse = "";


            //[rev]
            if (CString.StartWith(strUrl, "https"))
            {
                ServicePointManager.ServerCertificateValidationCallback = new System.Net.Security.RemoteCertificateValidationCallback(AcceptAllCertifications);
            }

            //-----Request
            // Create a request using a URL that can receive a post. 
            WebRequest request;

            try {
                request = WebRequest.Create(strUrl);

                request.Timeout = timeout;

                // Set the Method property of the request to POST.
                request.Method = "POST";

                ////Add custom headers
                //if ( ccHeaders!=null ) {
                //    int c = ccHeaders.Count;
                //    String key, strValue;
                //    for (int i = 0; i<c; i++) {
                //        key = ccHeaders.Key(i);
                //        strValue = (String)ccHeaders.Item(i);
                //        request.Headers.Add(key, strValue);
                //    }
                //}

                // Set the ContentType property of the WebRequest.
                //request.ContentType = "application/x-www-form-urlencoded"
                //request.ContentType = "multipart/form-data"
                request.ContentType = "application/octet-stream";


                // Set the ContentLength property of the WebRequest.
                request.ContentLength = byteArray.Length;
            }
            catch (Exception ex) {
                String msg = ex.Message;
                return false;
            }

            //-----Stream
            // Get the request stream.
            Stream dataStream  = null;
            try {
                dataStream = request.GetRequestStream();

                // Write the data to the request stream.
                dataStream.Write(byteArray, 0, byteArray.Length);

                // Close the Stream object.
                dataStream.Close();
            }
            catch (Exception ex) {
                String msg = ex.Message;
                if (dataStream != null ) {
                    dataStream.Close();
                }

                return false;
            }

            //-----Response
            //Get the response.
            Stream responseDataStream = null;
            WebResponse response = null;
            StreamReader reader = null;
            try {
                response = request.GetResponse();

                // Display the status.
                //Console.WriteLine(CType(response, HttpWebResponse).StatusDescription)

                // Get the stream containing content returned by the server.
                responseDataStream = response.GetResponseStream();

                // Open the stream using a StreamReader for easy access.
                reader = new StreamReader(responseDataStream);

                // Read the content.
                String responseFromServer = reader.ReadToEnd();

                // Display the content.
                //Console.WriteLine(responseFromServer)
                outResponse = responseFromServer;

                // Clean up the streams.
                reader.Close();
                responseDataStream.Close();
                response.Close();

                //OK
                return true;
            }
            catch (Exception ex) {
                String msg = ex.Message;
                if (reader != null) {
                    reader.Close();
                }

                if (responseDataStream != null) {
                    responseDataStream.Close();
                }

                if (response != null) {
                    response.Close();
                }

                return false;
            }


        }


      	/////////////////////////////////////////////////////////////////////////////////////////
        private static byte[] StringToBytesByUTF8(String data)
        {
            //System.Text.Encoding encoding = System.Text.Encoding.Unicode;
            System.Text.Encoding encoding = System.Text.Encoding.UTF8;
            return encoding.GetBytes(data);
        }

      	/////////////////////////////////////////////////////////////////////////////////////////
        public static bool PostText(String strUrl, String data, int timeout, out String outResponse) 
        {
            outResponse = "";

            byte[] bytes = StringToBytesByUTF8(data);

         
            //-----Post
            String strResponse;
            if ( ! HttpPost(strUrl, bytes, timeout, out strResponse) ) {
                return false;
            }

            //-----return
            outResponse = strResponse;
            return true;
        }


	} //class_end

} //namespace_end





////////////////////////////////////////////////////////////////////////////////////////////////
//[CString]
//
//purpose:  string util
////////////////////////////////////////////////////////////////////////////////////////////////


namespace skyhey.Util
{
	

	/////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////////////////////////////////////
	//[CString]
	public class CString
	{


		/////////////////////////////////////////////////////////////////////////////////////////
		public static String XmlGet(String data, String tag) 
		{
            String tagStart = "<" + tag + ">";
            String tagEnd = "</" + tag + ">";        
            return GetPartBetween(data,tagStart,tagEnd);
		}   


		/////////////////////////////////////////////////////////////////////////////////////////
		public static String XmlMakeTag(String tag, String data) 
		{
            String tagStart = "<" + tag + ">";
            String tagEnd = "</" + tag + ">";
            return tagStart + data + tagEnd;
		}

        /////////////////////////////////////////////////////////////////////////////////////////
        public static bool XmlContains(String data, String tag)
        {
            String tagStart = "<" + tag + ">";
            //String tagEnd = "</" + tag + ">";
            return Contains(data, tagStart);
        } 

		/////////////////////////////////////////////////////////////////////////////////////////
		/////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////////
        public static String Replace(String s, String s1, String s2) 
		{
			StringBuilder sb = new StringBuilder(s);
			sb.Replace(s1, s2);
			return sb.ToString();
		}   


		/////////////////////////////////////////////////////////////////////////////////////////
		public static String ReplacePlace(String data, String k, String v) 
		{
			return Replace(data,"%"+k+"%",v);        
		}   


		/////////////////////////////////////////////////////////////////////////////////////////
		private static String ParseString1(String str, String token, out String remain) 
		{
			String [] s = ParseString1(str, token);
			remain = s[1];
			return s[0];
		}

        private static String [] ParseString1(String s, String token) 
		{
			String out1 = "";
			String out2 = s;
			int pos = s.IndexOf(token);

			if ( pos>=0 ) 
			{
				if (pos>0) out1 = s.Substring(0, pos);
				out2 = s.Substring(pos+token.Length);
			}

			String []aOut = { out1, out2 };
			return aOut;
		}

		private static String[] ParseString(String s, String token1, String token2) 
		{
			String [] s1 = ParseString1(s, token1);
			String [] s2 = ParseString1(s1[1], token2);
			return s2;
		}

		private static String ParseString(String str, String token1, String token2, out String remain) 
		{
			String [] s = ParseString(str, token1, token2);
			remain = s[1];
			return s[0];
		}


		/////////////////////////////////////////////////////////////////////////////////////////
		public static bool Contains(String data, String token)
		{
			return (data.IndexOf(token)>=0);
		}

		/////////////////////////////////////////////////////////////////////////////////////////
		public static bool StartWith(String data, String token)
		{
			return (data.IndexOf(token)==0);
		}		
		/////////////////////////////////////////////////////////////////////////////////////////
		public static bool EndWith(String data, String token)
		{
			long pos = data.LastIndexOf(token);

			if ( pos < 0 )
				return false;
			else
				return (pos == (data.Length - token.Length) );

		}		
		/////////////////////////////////////////////////////////////////////////////////////////
		public static String GetPartBefore(String data, String token) 
		{
			String strOut;
			return ParseString1(data, token, out strOut);
		}

		/////////////////////////////////////////////////////////////////////////////////////////
		public static String GetPartBetween(String data, String token1, String token2)
		{
			String strOut;
			return ParseString(data, token1, token2, out strOut);
		}

		/////////////////////////////////////////////////////////////////////////////////////////
		public static String GetPartAfter(String data, String token)
		{
			//if token does not exist, return "".

			String s = data;

			//Get part after token'
			if ( Contains(s, token) )
				ParseString1(s, token, out s);
			else
				s = "";

			return s;

		}

		/////////////////////////////////////////////////////////////////////////////////////////
		/////////////////////////////////////////////////////////////////////////////////////////




	} //class_end

} //namespace_end









