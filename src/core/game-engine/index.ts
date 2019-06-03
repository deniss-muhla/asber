import { Engine } from '@babylonjs/core/Engines/engine';
import { GameEngineOptions } from './types';
import { ActionScene } from '../action-scene';
import { Exclude } from 'class-transformer';

/** Game engine */
export class GameEngine {
    @Exclude()
    private _engine: Engine;
    /** Babylon.js engine */
    public get engine(): Engine {
        return this._engine;
    }

    /** Create game engine */
    constructor({ canvas }: GameEngineOptions) {
        this._engine = new Engine(canvas, false, { doNotHandleContextLost: true }, true);
    }

    dispose() {
        this._engine.dispose();
    }
}
