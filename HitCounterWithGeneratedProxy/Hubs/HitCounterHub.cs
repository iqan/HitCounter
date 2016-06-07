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
        private static readonly Dictionary<string,int> DictProduct = new Dictionary<string, int>(); 
        
        public void RecordHit()
        {
            var iid = Context.QueryString["iid"];
            Clients.All.onRecordHit(DictProduct[iid]);

        }

        public override Task OnConnected()
        {
            var iid = Context.QueryString["iid"];

            if (iid != null)
            {
                if (DictProduct.ContainsKey(iid))
                    DictProduct[iid]++;
                else
                    DictProduct.Add(iid, 1);  
            }
            return base.OnConnected();
        }

        public override Task OnDisconnected()
        {
            var iid = Context.QueryString["iid"];
            DictProduct[iid]--;
            Clients.All.onRecordHit(DictProduct[iid]);

            return base.OnDisconnected();
        }

    }
 }