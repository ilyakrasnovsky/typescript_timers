import { ITimer } from './ITimer';

export interface ITimerClientConstructor
{
    new (name : string) : ITimerClient;
}

export interface ITimerClient
{
    reset() : void;
    getTimer() : ITimer;
}