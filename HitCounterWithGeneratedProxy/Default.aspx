<%@ Page Title="Home Page" Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="HitCounterWithGeneratedProxy._Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="Scripts/jquery-1.6.4.js"></script>
     <script src="Scripts/jquery.signalR-1.1.4.js"></script>
    <script src="/signalr/hubs"></script>
    <script type="text/javascript">

        $(document).ready(function () {
            var getiid = $.getQuery('iid');
            //Set the hubs URL for the connection
            $.connection.hub.url = "/signalr";
            $.connection.hub.qs = "iid=" + getiid;
            $.connection.hub.logging = true;

            // Declare a proxy to reference the hub.
            var hitCount = $.connection.hitCounterHub;
            //var hitCount = $.connection('/myconnection', "name=John", true);

            //debugger;
            // Create a function that the hub can call to broadcast messages.

            hitCount.client.onRecordHit = function (hitCount) {
                debugger;
                $('#hitCountLabel').text(hitCount);
            };

            $.connection.hub.start(
                        function () {
                            debugger;
                            hitCount.server.recordHit();
                        }
                        )
                    .done(
                        function () {
                            debugger;
                            console.log('invoked');
                        }
                    )
                    .fail(function (error) {
                        console.log("On Invoke" + error);
                    }
                    )
            ;

        });
        (function ($) {
            $.getQuery = function (query) {
                query = query.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");

                var expr = "[\\?&]" + query + "=([^&#]*)";

                var regex = new RegExp(expr);

                var results = regex.exec("http://test.asosservices.com/Asos/Asos-Felt-Holdall/Prod/pgeproduct.aspx?iid=1305321");
                debugger;
                if (results !== null) {

                    return results[1];

                    return decodeURIComponent(results[1].replace(/\+/g, " "));
                } else {
                    return false;
                }
            };
        })(jQuery);
    </script>
    
</head>
<body>
    <form id="form1" runat="server">
    <div id="hitCountLabel" style="font-size: 50px" runat="server"></div>
    </form>
</body>
</html>

