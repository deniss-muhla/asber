import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';
import { GridMaterial } from '@babylonjs/materials/grid';
import { Mesh } from '@babylonjs/core/Meshes/mesh';
import { Vector3 } from '@babylonjs/core/Maths/math';
import { ActionScene } from '../../../core/action-scene';
import { PlayerControl } from '../../../core/player-control';
import { inheritSerialization, autoserializeUsing } from 'cerialize';
import { LightSerializer } from '../../../utils/serializers/light';
import { Asber } from '../..';

@inheritSerialization(ActionScene)
export class SandboxScene extends ActionScene {
    /** Default scene light */
    @autoserializeUsing(LightSerializer) public hemisphericLight: HemisphericLight;

    constructor(asber: Asber) {
        super(asber);
        const control = new PlayerControl(this);

        // Setup light
        this.hemisphericLight = new HemisphericLight('defaultLight', new Vector3(0, 1, 0), this);
        this.hemisphericLight.intensity = 0.7;

        const material = new GridMaterial('grid', this);

        const sphere = Mesh.CreateSphere('sphere1', 16, 2, this);
        sphere.checkCollisions = true;
        sphere.position.y = 2;
        sphere.material = material;

        const sphere2 = Mesh.CreateSphere('sphere2', 8, 1, this);
        sphere2.checkCollisions = true;
        sphere2.position.x = 3;
        sphere2.position.y = 2;
        sphere2.material = material;

        const sphere3 = Mesh.CreateSphere('sphere3', 8, 1, this);
        sphere3.checkCollisions = true;
        sphere3.position.x = -3;
        sphere3.position.y = 2;
        sphere3.material = material;

        const sphere4 = Mesh.CreateSphere('sphere4', 8, 1, this);
        sphere4.checkCollisions = true;
        sphere4.position.x = -3;
        sphere4.position.y = 2;
        sphere4.position.z = -3;
        sphere4.material = material;

        const ground = Mesh.CreateGround('ground1', 32, 32, 2, this);
        ground.checkCollisions = true;
        ground.material = material;

        const lowerGround = ground.clone('lowerGround');
        lowerGround.checkCollisions = true;
        lowerGround.scaling.x = 4;
        lowerGround.scaling.z = 4;
        lowerGround.position.y = -16;
    }
}
