$(document).ready(function () {
    var expr = "[\\?&]" + 'iid' + "=([^&#]*)";
    var regex = new RegExp(expr);
    //var results = regex.exec(window.location.href);
    var results = regex.exec("http://localhost/Villain/Villain-Zac-Pocket-Vest/Prod/pgeproduct.aspx?iid=1650896&cid=6993&sh=0&pge=0&pgesize=36&sort=-1&clr=Blue&totalstyles=15&gridsize=3");
    debugger;
    var getiid = (results != null) ? results[1] : false;

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