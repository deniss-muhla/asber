import '@babylonjs/core/Meshes/meshBuilder';
import { Asber } from './asber';

const canvas = document.getElementById('root') as HTMLCanvasElement;

const asber = new Asber({ canvas });
asber.run();

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
