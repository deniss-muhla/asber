import { Engine } from '@babylonjs/core/Engines/engine';
import { ActionScene } from '../action-scene';
import { autoserializeAsArray } from 'cerialize';
import { observable, IReactionDisposer, reaction } from 'mobx';
import { UX_MAX_DELAY_MS } from '../types';

/** Game engine */
export class GameEngine extends Engine {
    /** Engine scenes */
    @autoserializeAsArray(ActionScene) scenes: ActionScene[] = [];

    @observable public isFullscreen: boolean;

    private _isFullscreenReaction: IReactionDisposer;

    private _pointerdownHandler = (ev: MouseEvent) => {
        this.enterFullscreen(true);
    };

    private _windowResizeHandler = () => {
        this.resize();
    };

    /** Create game engine */
    constructor(public canvas: HTMLCanvasElement) {
        super(canvas);

        // Setup events
        window.addEventListener('resize', this._windowResizeHandler);

        // Setup MobX
        this._isFullscreenReaction = reaction(
            () => this.isFullscreen,
            isFullscreen => {
                if (isFullscreen) {
                    if (window.PointerEvent) {
                        canvas.removeEventListener('pointerdown', this._pointerdownHandler);
                    } else {
                        canvas.removeEventListener('mousedown', this._pointerdownHandler);
                    }
                } else {
                    if (window.PointerEvent) {
                        canvas.addEventListener('pointerdown', this._pointerdownHandler);
                    } else {
                        canvas.addEventListener('mousedown', this._pointerdownHandler);
                    }
                }
            },
            { fireImmediately: true, delay: UX_MAX_DELAY_MS }
        );
    }

    dispose() {
        window.removeEventListener('resize', this._windowResizeHandler);

        this._isFullscreenReaction();

        super.dispose();
    }
}
