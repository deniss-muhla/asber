import { AsControlOptions, CAMERA_INERTIA, DEF_CAMERA_ANGULAR_SENSIBILITY, DEF_CAMERA_SPEED } from './types';
import { Vector3 } from '@babylonjs/core/Maths/math';
import { UniversalCamera } from '@babylonjs/core/Cameras/universalCamera';
import { Scene } from '@babylonjs/core/scene';

export class AsControl {
    private _canvas: HTMLCanvasElement;
    private _scene: Scene;
    private _camera: UniversalCamera;

    public get camera(): UniversalCamera {
        return this._camera;
    }

    constructor({ canvas, scene }: AsControlOptions) {
        this._canvas = canvas;
        this._scene = scene;
        this._camera = new UniversalCamera('camera1', new Vector3(0, 5, -10), this._scene);
        this._camera.minZ = 0.0001;
        this._camera.checkCollisions = true;
        this._camera.applyGravity = true;

        this._camera.inertia = CAMERA_INERTIA;

        this._camera.angularSensibility = DEF_CAMERA_ANGULAR_SENSIBILITY;
        this._camera.speed = DEF_CAMERA_SPEED;

        this._camera.setTarget(Vector3.Zero());
        this._camera.attachControl(this._canvas, true);
    }
}
