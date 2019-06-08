import { Engine } from '@babylonjs/core/Engines/engine';
import { GameEngineOptions } from './types';
import { ActionScene } from '../action-scene';
import { autoserializeAs, autoserializeAsArray } from 'cerialize';

/** Game engine */
export class GameEngine extends Engine {
    @autoserializeAsArray(ActionScene) scenes: ActionScene[] = [];

    /** Create game engine */
    constructor({ canvas }: GameEngineOptions) {
        super(canvas);
    }
}
