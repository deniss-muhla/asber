import { CAMERA_INERTIA, DEF_CAMERA_ANGULAR_SENSIBILITY, DEF_CAMERA_SPEED } from './types';
import { Vector3, Viewport } from '@babylonjs/core/Maths/math';
import { UniversalCamera } from '@babylonjs/core/Cameras/universalCamera';
import { ActionScene } from '../action-scene';
import { autoserializeUsing } from 'cerialize';
import { CameraSerializer } from '../../utils/serializers/camera';
import { UniversalCameraKeyboardWalkInput } from './inputs/universal-camera-keyboard-walk-input';

export class PlayerControl {
    /** Player camera */
    @autoserializeUsing(CameraSerializer) public camera: UniversalCamera;

    constructor(public scene: ActionScene) {
        scene.playerControls.push(this);

        const engine = scene.getEngine();
        const canvas = engine.getRenderingCanvas();

        this.camera = new UniversalCamera('camera1', new Vector3(0, 5, -10), scene);
        this.camera.viewport = new Viewport(0, 0, 1, 1);
        this.camera.minZ = 0.0001;

        // Setup gravity and collisions
        this.camera.checkCollisions = true;
        this.camera.applyGravity = true;
        this.camera.ellipsoid = new Vector3(1, 2, 1);
        this.camera.ellipsoidOffset = new Vector3(0, 2, 0);

        // Setup sensibility and speed
        this.camera.inertia = CAMERA_INERTIA;
        this.camera.angularSensibility = DEF_CAMERA_ANGULAR_SENSIBILITY;
        this.camera.speed = DEF_CAMERA_SPEED;

        // Remove default input management
        this.camera.inputs.removeByType('FreeCameraKeyboardMoveInput');
        this.camera.inputs.add(new UniversalCameraKeyboardWalkInput());

        //
        // this.camera.inputs.removeByType("FreeCameraMouseInput");

        this.camera.setTarget(Vector3.Zero());
        this.camera.attachControl(canvas, true);

        // canvas.addEventListener('keydown', function(evt) {
        //     if (evt.keyCode === 13) {
        //         if (!engine.isFullscreen) {
        //             engine.enterFullscreen(true);
        //         }
        //     }
        // });
    }
}
