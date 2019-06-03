import { PlayerControlOptions, CAMERA_INERTIA, DEF_CAMERA_ANGULAR_SENSIBILITY, DEF_CAMERA_SPEED } from './types';
import { Vector3, Viewport } from '@babylonjs/core/Maths/math';
import { UniversalCamera } from '@babylonjs/core/Cameras/universalCamera';
import { ActionScene } from '../action-scene';
import { Exclude } from 'class-transformer';

export class PlayerControl {
    @Exclude()
    private _camera: UniversalCamera;
    /** Babylon.js camera */
    public get camera(): UniversalCamera {
        return this._camera;
    }

    constructor({ actionScene }: PlayerControlOptions) {
        const engine = actionScene.scene.getEngine();
        const canvas = engine.getRenderingCanvas();

        this._camera = new UniversalCamera('camera1', new Vector3(0, 5, -10), actionScene.scene);
        this._camera.viewport = new Viewport(0, 0, 1, 1);
        this._camera.minZ = 0.0001;
        //this._camera.minZ = 0.0001;
        this._camera.checkCollisions = true;
        this._camera.applyGravity = true;

        this._camera.inertia = CAMERA_INERTIA;

        this._camera.angularSensibility = DEF_CAMERA_ANGULAR_SENSIBILITY;
        this._camera.speed = DEF_CAMERA_SPEED;

        this._camera.setTarget(Vector3.Zero());
        this._camera.attachControl(canvas, true);

        window.addEventListener('keydown', function(evt) {
            if (evt.keyCode === 13) {
                if (!engine.isFullscreen) {
                    engine.enterFullscreen(true);
                }
            }
        });

        // // HMR
        // if (module.hot) {
        //     module.hot.accept(err => console.error(err));
        //     if (!!module.hot.data) {
        //         console.log(module.hot.data);
        //     }
        //     module.hot.dispose(data => {
        //         data.camera = this._camera;
        //     });
        // }
    }
}

// HMR
// if (module.hot) {
//     module.hot.accept(err => console.error(err));
//     if (!!module.hot.data) {
//         console.log(module.hot.data);
//     }
// }
