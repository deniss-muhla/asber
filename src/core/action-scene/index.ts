import { ActionSceneOptions } from './types';
import { Scene } from '@babylonjs/core/scene';
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';
import { GridMaterial } from '@babylonjs/materials/grid';
import { Mesh } from '@babylonjs/core/Meshes/mesh';
import { Vector3 } from '@babylonjs/core/Maths/math';
import { PlayerControl } from '../player-control';

export class ActionScene extends Scene {
    private _playerControls: PlayerControl[] = [];
    public get playerControls(): PlayerControl[] {
        return this._playerControls;
    }
    public set playerControls(v: PlayerControl[]) {
        this._playerControls = v;
    }

    // static initialize() {
    //     // Initialization
    // }

    constructor({ engine }: ActionSceneOptions) {
        super(engine);
    }
}
