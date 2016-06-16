<%@ Page Title="Home Page" Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="HitCounterWithGeneratedProxy._Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Hit Counter</title>
    <script src="Scripts/jquery-1.6.4.min.js"></script>
    <script src="Scripts/jquery.signalR-1.1.4.min.js"></script>
    <script src="/signalr/hubs"></script>
    <script src="Scripts/HitCounter.js"></script>
</head>
<body>
    <form id="form1" runat="server">
            <div id="hitCountDiv"></div>
    </form>
</body>
</html>

