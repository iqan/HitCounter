$(document).ready(function () {
    var getiid = $.getQuery('iid');

    $.connection.hub.url = "/signalr";
    $.connection.hub.qs = "iid=" + getiid;
    $.connection.hub.logging = true;

    var hitCount = $.connection.hitCounterHub;

    hitCount.client.onRecordHit = function (hitCount) {
        //debugger;
        $('#hitCountLabel').text(hitCount);
    };

    $.connection.hub
            .start()
            .done( function () { hitCount.server.recordHit(); } )
            .fail( function (error) { console.log("Error on Invoke" + error); } );

});

(function ($) {
    $.getQuery = function (query) {
        query = query.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");

        var expr = "[\\?&]" + query + "=([^&#]*)";

        var regex = new RegExp(expr);

        var results = regex.exec(window.location.href);
        //debugger;
        if (results !== null)
            return results[1];
        else
            return false;
    };
})(jQuery);