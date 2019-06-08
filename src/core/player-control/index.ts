import { PlayerControlOptions, CAMERA_INERTIA, DEF_CAMERA_ANGULAR_SENSIBILITY, DEF_CAMERA_SPEED } from './types';
import { Vector3, Viewport } from '@babylonjs/core/Maths/math';
import { UniversalCamera } from '@babylonjs/core/Cameras/universalCamera';
import { ActionScene } from '../action-scene';
import { autoserializeAs, autoserializeUsing } from 'cerialize';
import { Camera } from '@babylonjs/core/Cameras/camera';
import { ISerializer } from 'cerialize/dist/util';

const CameraSerializer: ISerializer<UniversalCamera> = {
    Serialize: target => {
        return target.serialize();
    },
    Deserialize: (data, target) => {
        // //debugger;
        // console.log('src: ', data);
        // console.log('target: ', target);
        if (target) {
            const nextTarget = UniversalCamera.Parse(data, target.getScene()) as UniversalCamera;
            const canvas = target.getEngine().getRenderingCanvas();
            target.detachControl(canvas);
            target.dispose();
            nextTarget.attachControl(canvas, true);
            return nextTarget;
        } else {
            throw 'No target specified';
        }
    }
};
// const CameraSerializer = {
//     Serialize(value: Camera): any {
//         return value.serialize();
//     },
//     Deserialize(json: any, instance?: Camera): Camera {
//         debugger;
//         if (instance) {
//             return Camera.Parse(json, instance.getScene());
//         } else {
//             return null;
//         }
//     }
// };

export class PlayerControl {
    private _scene: ActionScene;

    @autoserializeUsing(CameraSerializer) public camera: UniversalCamera;

    constructor({ scene }: PlayerControlOptions) {
        this._scene = scene;

        this._scene.playerControls.push(this);

        const engine = this._scene.getEngine();
        const canvas = engine.getRenderingCanvas();

        console.log('camera create super');

        this.camera = new UniversalCamera('camera1', new Vector3(0, 5, -10), this._scene);
        this.camera.viewport = new Viewport(0, 0, 1, 1);
        this.camera.minZ = 0.0001;
        this.camera.checkCollisions = true;
        this.camera.applyGravity = true;

        this.camera.inertia = CAMERA_INERTIA;

        this.camera.angularSensibility = DEF_CAMERA_ANGULAR_SENSIBILITY;
        this.camera.speed = DEF_CAMERA_SPEED;

        this.camera.setTarget(Vector3.Zero());
        this.camera.attachControl(canvas, true);

        window.addEventListener('keydown', function(evt) {
            if (evt.keyCode === 13) {
                if (!engine.isFullscreen) {
                    engine.enterFullscreen(true);
                }
            }
        });
    }
}
