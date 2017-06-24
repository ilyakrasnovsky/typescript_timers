import { ITimer } from './ITimer';
import { CTimer } from './CTimer';
import { ITimerClient} from './ITimerClient';
import { CTimerClient} from './CTimerClient';

class Client
{
    private _timer_client_map : {[name : string] : ITimerClient; } = {};

    public constructor()
    {
        this._timer_client_map["timerclient1"] = new CTimerClient("timerclient1");
        this._timer_client_map["timerclient2"] = new CTimerClient("timerclient2");
        this._timer_client_map["timerclient2"].getTimer().pause();
        setTimeout(
            () : void =>
            {
                this._timer_client_map["timerclient1"].getTimer().pause();
                setTimeout(() : void =>
                {
                    this._timer_client_map["timerclient1"].getTimer().resume();
                    this._timer_client_map["timerclient2"].getTimer().resume();
                    setTimeout(() : void =>
                    {
                        this._timer_client_map["timerclient1"].reset();
                        this._timer_client_map["timerclient1"].getTimer().start(); 
                    }, 5000); 
                }, 5000);
            },5000);
    }

    public static main() : void
    {
        let client : Client = new Client();
    }
}

Client.main();