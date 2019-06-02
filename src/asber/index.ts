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

    constructor(options: AsberOptions) {
        super(options);

        this._sandbox = new SandboxScene({ engine: this });
    }

    run() {
        this.runRenderLoop(() => {
            this.sandbox.render();
        });
    }
}
