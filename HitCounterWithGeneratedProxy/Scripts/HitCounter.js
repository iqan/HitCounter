function getProdId() {
    var expr = "[\\?&]" + 'iid' + "=([^&#]*)";
    var regex = new RegExp(expr);
    var results = regex.exec(window.location.href);
    var getiid = (results != null) ? results[1] : 9;
    return getiid;
}

$(document).ready(function () {

    var iid = getProdId();
    $.connection.hub.url = "/signalr";
    $.connection.hub.qs = "iid=" + iid;
    $.connection.hub.logging = true;

    var hitCount = $.connection.hitCounterHub;

    hitCount.client.onRecordHit = function (hitCount1, iid1) {
        var iid2 = getProdId();
        if (iid2 === iid1) {
            if (hitCount1 > 0) {
                var text = "<p align='center'>Currently <b>" + hitCount1 + "</b> people are viewing this product.</p>";
                document.getElementById('hitCountDiv').innerHTML = text;
            }
            else
                document.getElementById('hitCountDiv').innerHTML = "";
        }
    };

    $.connection.hub
            .start()
            .done(function () { hitCount.server.recordHit(); })
            .fail(function (error) { console.log("Error on Invoke" + error); });
});