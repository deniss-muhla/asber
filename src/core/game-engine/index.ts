import { Engine } from '@babylonjs/core/Engines/engine';
import { GameEngineOptions } from './types';
import { ActionScene } from '../action-scene';

/** Game engine */
export class GameEngine extends Engine {
    scenes: ActionScene[] = [];

    /** Create game engine */
    constructor({ canvas }: GameEngineOptions) {
        super(canvas);
    }
}
