import { Scene } from '@babylonjs/core/scene';

export const CAMERA_INERTIA = 0;
export const DEF_CAMERA_ANGULAR_SENSIBILITY = 500;
export const DEF_CAMERA_SPEED = 5;

export interface AsControlOptions {
    canvas: HTMLCanvasElement;
    scene: Scene;
}
