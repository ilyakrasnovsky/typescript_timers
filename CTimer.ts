import { ITimer } from './ITimer';
import {ITimerCallbackFunction } from './ITimerCallbackFunction';

const enum State
{
    IDLE,
    RUNNING,
    PAUSED,
    RESUMED
}

export class CTimer implements ITimer
{
    private _state : number;
    private _timer_id : number;
    private _remaining : number;
    private _start_time : number;
    private _callback : ITimerCallbackFunction = null;
    private _interval : number;

    public constructor(callback : ITimerCallbackFunction, interval : number)
    {
        this._interval = interval;
        this._callback = callback;
        this.reset();    
    }

    public isPaused() : boolean
    {
        return (this._state == State.PAUSED);
    }

    public start() : void
    {
        this._start_time = Date.now();
        this._timer_id = setInterval(this._callback, this._interval);
        this._state = State.RUNNING;
    }

    public resume() : void
    {
        if (this._state != State.PAUSED)
        {
            return;
        }

        this._state = State.RESUMED;
        setTimeout(this.timeOutCallback, this._remaining);
    }

    private timeOutCallback = () : void =>
    {
        if (this._state != State.RESUMED)
        {
            return;
        }

        this._callback();
        this.start();
        
    }
    public reset() : void
    {
        if (this._timer_id)
        {
            clearInterval(this._timer_id);
        }
        this._state = State.IDLE;
        this._timer_id = 0;
        this._start_time = 0;
        this._remaining = 0;
    }

    public pause() : void
    {
        if (this._state !== State.RUNNING)
        {
            return;
        }

        this._remaining = this._interval - (Date.now() - this._start_time);
        clearInterval(this._timer_id);
        this._state = State.PAUSED;
    }
}