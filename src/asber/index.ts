import { GameEngine } from '../core/game-engine';
import { AsberOptions } from './types';
import { SandboxScene } from './scenes/sandbox';

export class Asber extends GameEngine {
    private _sandbox: SandboxScene;
    public get sandbox(): SandboxScene {
        return this._sandbox;
    }
    public set sandbox(v: SandboxScene) {
        this._sandbox = v;
    }

    constructor() {
        const canvas = document.createElement('canvas') as HTMLCanvasElement;
        document.body.appendChild(canvas);

        super({ canvas });

        this._sandbox = new SandboxScene({ engine: this });

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
