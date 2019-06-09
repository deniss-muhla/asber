import { Engine } from '@babylonjs/core/Engines/engine';
import { ActionScene } from '../action-scene';
import { autoserializeAsArray } from 'cerialize';

/** Game engine */
export class GameEngine extends Engine {
    /** Engine scenes */
    @autoserializeAsArray(ActionScene) scenes: ActionScene[] = [];

    /** Create game engine */
    constructor(public canvas: HTMLCanvasElement) {
        super(canvas);
    }
}
