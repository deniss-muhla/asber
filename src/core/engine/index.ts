import { Engine } from '@babylonjs/core/Engines/engine';
import { AcScene } from '../scene';
import { autoserializeAsArray } from 'cerialize';

/** Game engine */
export class AcEngine extends Engine {
    /** Engine scenes */
    @autoserializeAsArray(AcScene) scenes: AcScene[] = [];

    /** Create game engine */
    constructor(public canvas: HTMLCanvasElement) {
        super(canvas);
    }
}
