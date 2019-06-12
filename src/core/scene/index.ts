import { Scene } from '@babylonjs/core/scene';
import { PlayerControl } from '../player-control';
import { autoserializeAsArray } from 'cerialize';
import { AcEngine } from '../engine';
import { Vector3 } from '@babylonjs/core/Maths/math';
import { DEF_SCENE_GRAVITY } from './types';
import { OimoJSPlugin } from '@babylonjs/core/Physics/Plugins/oimoJSPlugin';
import * as oimo from 'oimo';

export class AcScene extends Scene {
    /** Player controls */
    @autoserializeAsArray(PlayerControl) public playerControls: PlayerControl[] = [];

    constructor(public engine: AcEngine) {
        super(engine);

        // Setup gravity and collisions
        this.enablePhysics(new Vector3(0, DEF_SCENE_GRAVITY, 0), new OimoJSPlugin(1, oimo));
        this.gravity = new Vector3(0, DEF_SCENE_GRAVITY, 0);
        this.collisionsEnabled = true;
    }
}
