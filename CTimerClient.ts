import { ITimerClient } from './ITimerClient';
import { ITimer } from './ITimer';
import { CTimer } from './CTimer';

export class CTimerClient implements ITimerClient
{
    private _timer : ITimer = null;
    private _interval : number;
    private _elapsed_time : number;
    private _name : string;

    public constructor(name : string)
    {
        this._name = name;
        this._interval = 1000;
        this._timer = new CTimer(this.callback, this._interval);
        this.reset();
        this._timer.start();
    }

    public getTimer() : ITimer
    {
        return this._timer;
    }
   
    public reset() : void
    {
        this._elapsed_time = 0;
        if (this._timer)
        {
            this._timer.reset();
        }
    }

    private callback = () : void =>
    {
        let rel_time : Date = new Date(this._elapsed_time);
        this._elapsed_time = this._elapsed_time + this._interval;
        let pieces : string[] = rel_time.toISOString().split('T');
        let hhmmss : string = pieces[1].split('.')[0];
        console.log(this._name + " : " + hhmmss);
    }
}