import { WebPartContext } from "@microsoft/sp-webpart-base";
import { LogLevel, PnPLogging } from "@pnp/logging";
import { SPFI, SPFx, spfi } from "@pnp/sp";

import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

var _sp: SPFI = spfi();

export const getSP = (context?: WebPartContext): SPFI => {
    if(!!context) {
        _sp = spfi().using(SPFx(context)).using(PnPLogging(LogLevel.Warning));
    }

    return _sp;
}