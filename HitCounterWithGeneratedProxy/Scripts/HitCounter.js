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
        //debugger;
        $('#hitCountLabel').text(hitCount);
    };

    $.connection.hub.start(
                function () {
                    //debugger;
                    hitCount.server.recordHit();
                }
                )
            .done(
                function () {
                    //debugger;
                    //console.log('invoked');
                }
            )
            .fail(function (error) {
                console.log("Error on Invoke" + error);
            }
            )
    ;

});
(function ($) {
    $.getQuery = function (query) {
        query = query.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");

        var expr = "[\\?&]" + query + "=([^&#]*)";

        var regex = new RegExp(expr);

        var results = regex.exec(window.location.href);
        debugger;
        if (results !== null)
            return results[1];
        else
            return false;
    };
})(jQuery);