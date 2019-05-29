import { SandboxOptions } from './types';
import { Scene } from '@babylonjs/core/scene';
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';
import { GridMaterial } from '@babylonjs/materials/grid';
import { Mesh } from '@babylonjs/core/Meshes/mesh';
import { Vector3 } from '@babylonjs/core/Maths/math';

export class SandboxScene {
    private _scene: Scene;

    // static initialize() {
    //     // Initialization
    // }

    constructor({ scene }: SandboxOptions) {
        this._scene = scene;

        const light = new HemisphericLight('light1', new Vector3(0, 1, 0), this._scene);
        light.intensity = 0.7;
        const material = new GridMaterial('grid', this._scene);
        const sphere = Mesh.CreateSphere('sphere1', 16, 2, this._scene);
        sphere.position.y = 2;
        sphere.material = material;
        const ground = Mesh.CreateGround('ground1', 32, 32, 2, this._scene);
        ground.checkCollisions = true;

        ground.material = material;
    }
}
