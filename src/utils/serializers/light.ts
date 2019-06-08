import { ISerializer } from 'cerialize/dist/util';
import { Light } from '@babylonjs/core/Lights/light';

export const LightSerializer: ISerializer<Light> = {
    Serialize: target => {
        return target.serialize();
    },
    Deserialize: (data, target) => {
        if (target) {
            const nextTarget = Light.Parse(data, target.getScene()) as Light;
            target.dispose();
            return nextTarget;
        } else {
            throw 'No target specified';
        }
    }
};
