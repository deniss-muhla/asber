import '@babylonjs/core/Meshes/meshBuilder';
import { Asber } from './asber';

const canvas = document.getElementById('root') as HTMLCanvasElement;

let asber = new Asber({ canvas });
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

// HMR
if (module.hot) {
    require('reflect-metadata');
    const { plainToClassFromExist } = require('class-transformer');
    module.hot.accept('./asber', () => {
        import('./asber').then(({ Asber: NextAsber }) => {
            console.log('next asber');

            asber.dispose();
            const nextAsber = plainToClassFromExist(new NextAsber({ canvas }), asber);
            asber = nextAsber;
            asber.run();

            // for (let index = 0; index < this.playerControls.length; index++) {
            //     const prevPlayerControl = this.playerControls[index];
            //     this.playerControls[index] = new NextPlayerControl()
            // }
        });
    });
    // module.hot.dispose(() => {
    //     console.log('prev asber dispose');
    // });

    module.hot.accept(err => console.error(err));
}
