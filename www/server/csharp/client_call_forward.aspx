<%@ Page Language="C#" EnableSessionState="false" EnableViewState="False" Debug="false" %>

<%@ Import Namespace="System" %>   
<%@ Import Namespace="System.Web.Script.Serialization" %>   



<script runat="server">
 
                    
    /// //////////////////////////////////////////////////////////////
    protected void page_Load(object sender, EventArgs e)
    {

        //specify your api key here
        //String API_KEY = "YjEyM2Y2MGU4NTY2MjE4N2Y3ZjI3NTZmOGJhMTBlZGE=-ZFVZOWRnaTc2ZGdkeDg3NjN6MTM=";
        var API_KEY = "MzNkNGY1ZDJjMjUwMTJlOWM4N2Q2ZTMxMzczMGQ2MjY=-NjM2MzQ2NTEzMjc1MDE4MjYyZFVZOWRnaTc2ZGdkeDg3NjN6MTY=";


        var api = new skyhey.FormApi();
        api.setApiKey(API_KEY);
        var result = api.forwardCall(Request);
        Response.Write(result);
        Response.End();                                          

                                  
    }
        
    /// //////////////////////////////////////////////////////////////
    
    
    
</script>
