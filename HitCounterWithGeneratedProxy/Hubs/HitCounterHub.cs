using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using System.Threading.Tasks;

namespace HitCounterWithGeneratedProxy.Hubs
{
    public class HitCounterHub : Hub
    {
        static int _hitCount = 0;
        static List<string> lstiid = new List<string>();
        private string iid;
        public void RecordHit()
        {
            iid = Context.QueryString["iid"];
            _hitCount = lstiid.Where(x => x.Equals(iid)).Count();
            Clients.All.onRecordHit(_hitCount);

        }

        public override Task OnConnected()
        {
            iid = Context.QueryString["iid"];

            if (iid != null)
            {
                lstiid.Add(iid);
            }
            return base.OnConnected();
        }

        public override Task OnDisconnected()
        {
            iid = Context.QueryString["iid"];
            lstiid.Remove(iid);
            _hitCount = lstiid.Where(x => x.Equals(iid)).Count();
            // _hitCount -= 1;
            Clients.All.onRecordHit(_hitCount);

            return base.OnDisconnected();
        }

    }
 }