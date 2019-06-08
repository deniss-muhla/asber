import { SandboxSceneOptions } from './types';
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';
import { GridMaterial } from '@babylonjs/materials/grid';
import { Mesh } from '@babylonjs/core/Meshes/mesh';
import { Vector3 } from '@babylonjs/core/Maths/math';
import { ActionScene } from '../../../core/action-scene';
import { PlayerControl } from '../../../core/player-control';
import { inheritSerialization } from 'cerialize';

@inheritSerialization(ActionScene)
export class SandboxScene extends ActionScene {
    private _hemisphericLight: HemisphericLight;
    /** Default scene light */
    public get hemisphericLight(): HemisphericLight {
        return this._hemisphericLight;
    }
    public set hemisphericLight(v: HemisphericLight) {
        this._hemisphericLight = v;
    }

    // static initialize() {
    //     // Initialization
    // }

    constructor(options: SandboxSceneOptions) {
        super(options);
        const control = new PlayerControl({ scene: this });

        // Setup light
        this._hemisphericLight = new HemisphericLight('defaultLight', new Vector3(0, 1, 0), this);
        this._hemisphericLight.intensity = 0.7;

        const material = new GridMaterial('grid', this);

        const sphere = Mesh.CreateSphere('sphere1', 16, 2, this);
        sphere.position.y = 2;
        sphere.material = material;

        const sphere2 = Mesh.CreateSphere('sphere2', 8, 1, this);
        sphere2.position.x = 3;
        sphere2.position.y = 2;
        sphere2.material = material;

        const ground = Mesh.CreateGround('ground1', 32, 32, 2, this);
        ground.checkCollisions = true;

        ground.material = material;
    }
}
