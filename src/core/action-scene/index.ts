import { ActionSceneOptions } from './types';
import { Scene } from '@babylonjs/core/scene';
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';
import { GridMaterial } from '@babylonjs/materials/grid';
import { Mesh } from '@babylonjs/core/Meshes/mesh';
import { Vector3 } from '@babylonjs/core/Maths/math';
import { PlayerControl } from '../player-control';
import { autoserializeAs, autoserializeAsArray } from 'cerialize';

export class ActionScene extends Scene {
    @autoserializeAsArray(PlayerControl) public playerControls: PlayerControl[] = [];

    // static initialize() {
    //     // Initialization
    // }

    constructor({ engine }: ActionSceneOptions) {
        super(engine);
    }
}
