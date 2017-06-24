import { ITimerCallbackFunction } from './ITimerCallbackFunction';

export interface ITimerConstructor
{
	new (callback : ITimerCallbackFunction, interval : number);
}

export interface ITimer
{
	start() : void;
	pause() : void;
	reset() : void;
	resume() : void;
	isPaused() : boolean;
}