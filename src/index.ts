import { Engine } from '@babylonjs/core/Engines/engine';
import { Scene } from '@babylonjs/core/scene';
import { UniversalCamera } from '@babylonjs/core/Cameras/universalCamera';
import { Vector3 } from '@babylonjs/core/Maths/math';
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';
import { GridMaterial } from '@babylonjs/materials/grid';
import { Mesh } from '@babylonjs/core/Meshes/mesh';

import '@babylonjs/core/Meshes/meshBuilder';
import { AsControl } from './as-control';
import { SandboxScene } from './as-scenes/sandbox';

const canvas = document.getElementById('root') as HTMLCanvasElement;
const engine = new Engine(canvas);
const scene = new Scene(engine);

const control = new AsControl({ canvas, scene });
const sandboxScene = new SandboxScene({ scene });

window.addEventListener('keydown', function(evt) {
    if (evt.keyCode === 13) {
        if (!engine.isFullscreen) {
            engine.enterFullscreen(true);
        }
    }
});

engine.runRenderLoop(() => {
    scene.render();
});

// Register PWA service worker
if (process.env.NODE_ENV === 'production') {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker
                .register('/service-worker.js')
                .then(registration => {
                    console.log('SW registered: ', registration);
                })
                .catch(registrationError => {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }
}
