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
        private static readonly Dictionary<int,int> DictProduct = new Dictionary<int, int>();


        public void RecordHit()
        {
            int iid = int.Parse(Context.QueryString["iid"]);
            if (iid != 0)
            {
                if (DictProduct.ContainsKey(iid))
                {
                    Clients.All.onRecordHit(DictProduct[iid], iid);
                }
            }
        }

        public override Task OnConnected()
        {
            int iid = int.Parse(Context.QueryString["iid"]);
            if (iid != 0)
            {
                if (DictProduct.ContainsKey(iid))
                {
                    DictProduct[iid] += 1;
                }
                else
                {
                    DictProduct.Add(iid, 1);
                }
            }
            return base.OnConnected();
        }

        public override Task OnDisconnected()
        {
            int iid = int.Parse(Context.QueryString["iid"]);
            if (iid != 0)
            {
                if (DictProduct.ContainsKey(iid))
                {
                    if (DictProduct[iid] > 0)
                    {
                        DictProduct[iid] -= 1;
                    }
                    Clients.All.onRecordHit(DictProduct[iid], iid);
                }
            }
            return base.OnDisconnected();
        }
    }
 }