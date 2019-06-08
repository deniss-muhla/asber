import { Scene } from '@babylonjs/core/scene';
import { PlayerControl } from '../player-control';
import { autoserializeAsArray } from 'cerialize';
import { GameEngine } from '../game-engine';

export class ActionScene extends Scene {
    /** Player controls */
    @autoserializeAsArray(PlayerControl) public playerControls: PlayerControl[] = [];

    constructor(public engine: GameEngine) {
        super(engine);
    }
}
