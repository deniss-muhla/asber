import { GameEngine } from '../core/game-engine';
import { AsberOptions } from './types';
import { SandboxScene } from './scenes/sandbox';

export class Asber extends GameEngine {
    public sandbox: SandboxScene;
    // public get sandbox(): SandboxScene {
    //     return this.sandbox;
    // }
    // public set sandbox(v: SandboxScene) {
    //     this.sandbox = v;
    // }

    constructor(options: AsberOptions) {
        super(options);

        this.sandbox = new SandboxScene({ gameEngine: this });

        console.log('2');

        // if (!!module.hot.data) {
        //     this._sandbox = module.hot.data.sandbox;
        //     console.log(module.hot.data);
        // } else {
        //     this._sandbox = new SandboxScene({ engine: this });
        // }

        // // HMR
        // if (module.hot) {
        //     //module.hot.accept(err => console.error(err));
        //     if (!!module.hot.data) {
        //         console.log(module.hot.data);
        //     }
        //     module.hot.dispose(data => {
        //         this._sandbox
        //         data.sandbox = SceneSerializer.Serialize(scene)  this._sandbox.clone();
        //     });
        // }
    }

    run() {
        this.engine.runRenderLoop(() => {
            this.sandbox.scene.render();
        });
    }
}
