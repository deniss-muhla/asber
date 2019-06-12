import { AcEngine } from '../core/engine';
import { SandboxScene } from './scenes/sandbox';
import { inheritSerialization } from 'cerialize';

@inheritSerialization(AcEngine)
export class AsberEngine extends AcEngine {
    private sandbox: SandboxScene;

    constructor() {
        const canvas = document.createElement('canvas') as HTMLCanvasElement;
        document.body.appendChild(canvas);

        super(canvas);

        this.sandbox = new SandboxScene(this);

        // Start scene
        this.runRenderLoop(() => {
            this.sandbox.render();
        });
    }

    dispose() {
        const canvas = this.getRenderingCanvas();
        document.body.removeChild(canvas);
        super.dispose();
    }
}
