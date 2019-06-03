import { SandboxSceneOptions } from './types';
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';
import { GridMaterial } from '@babylonjs/materials/grid';
import { Mesh } from '@babylonjs/core/Meshes/mesh';
import { Vector3 } from '@babylonjs/core/Maths/math';
import { ActionScene } from '../../../core/action-scene';
import { PlayerControl } from '../../../core/player-control';
import { Exclude } from 'class-transformer';

export class SandboxScene extends ActionScene {
    @Exclude()
    private _hemisphericLight: HemisphericLight;
    /** Default scene light */
    public get hemisphericLight(): HemisphericLight {
        return this._hemisphericLight;
    }
    public set hemisphericLight(v: HemisphericLight) {
        this._hemisphericLight = v;
    }

    private _control: PlayerControl;
    public get control(): PlayerControl {
        return this._control;
    }
    public set control(v: PlayerControl) {
        this._control = v;
    }

    // static initialize() {
    //     // Initialization
    // }

    constructor(options: SandboxSceneOptions) {
        super(options);
        this._control = new PlayerControl({ actionScene: this });

        // Setup light
        this._hemisphericLight = new HemisphericLight('defaultLight', new Vector3(0, 1, 0), this.scene);
        this._hemisphericLight.intensity = 0.7;

        const material = new GridMaterial('grid', this.scene);

        const sphere = Mesh.CreateSphere('sphere1', 16, 2, this.scene);
        sphere.position.y = 2;
        sphere.material = material;

        const sphere2 = Mesh.CreateSphere('sphere2', 8, 1, this.scene);
        sphere2.position.x = 3;
        sphere2.position.y = 2;
        sphere2.material = material;

        const ground = Mesh.CreateGround('ground1', 32, 32, 2, this.scene);
        ground.checkCollisions = true;

        ground.material = material;
    }
}
