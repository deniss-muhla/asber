import { ISerializer } from 'cerialize/dist/util';
import { Camera } from '@babylonjs/core/Cameras/camera';

export const CameraSerializer: ISerializer<Camera> = {
    Serialize: target => {
        return target.serialize();
    },
    Deserialize: (data, target) => {
        if (target) {
            const nextTarget = Camera.Parse(data, target.getScene()) as Camera;
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
