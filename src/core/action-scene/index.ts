import { ActionSceneOptions } from './types';
import { Scene } from '@babylonjs/core/scene';
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';
import { GridMaterial } from '@babylonjs/materials/grid';
import { Mesh } from '@babylonjs/core/Meshes/mesh';
import { Vector3 } from '@babylonjs/core/Maths/math';
import { PlayerControl } from '../player-control';
import { Exclude } from 'class-transformer';

export class ActionScene {
    @Exclude()
    private _scene: Scene;
    /** Babylon.js scene */
    public get scene(): Scene {
        return this._scene;
    }

    // static initialize() {
    //     // Initialization
    // }

    constructor({ gameEngine }: ActionSceneOptions) {
        this._scene = new Scene(gameEngine.engine);

        // // HMR
        // if (module.hot) {
        //     module.hot.accept('../player-control', () => {
        //         import('../player-control').then(module => {
        //             console.log(module);

        //             // for (let index = 0; index < this.playerControls.length; index++) {
        //             //     const prevPlayerControl = this.playerControls[index];
        //             //     this.playerControls[index] = new NextPlayerControl()
        //             // }
        //         });
        //     });

        //     module.hot.accept(err => console.error(err));
        //     if (!!module.hot.data) {
        //         console.log(module.hot.data);
        //     }
        // }
    }
}
