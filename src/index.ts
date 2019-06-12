import '@babylonjs/core/Meshes/meshBuilder';
import '@babylonjs/core/Collisions/collisionCoordinator';
import '@babylonjs/core/Physics/physicsEngineComponent';
import { AsberEngine } from './asber';
import { Serialize, Deserialize } from 'cerialize';

const asber = new AsberEngine();

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

// HMR
if (module.hot) {
    module.hot.accept(e => console.error(e));
    if (module.hot.data) {
        const { serializedAsber = null } = module.hot.data;
        Deserialize(serializedAsber, AsberEngine, asber);
    }
    module.hot.dispose(data => {
        data.serializedAsber = Serialize(asber, AsberEngine);
        asber.dispose();
    });
}
