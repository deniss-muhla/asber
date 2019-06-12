const gulp = require('gulp');
const { series } = require('gulp');
const del = require('del');
const favicons = require('gulp-favicons');

const generated = '__generated__';

const paths = {
    assets: {
        generated: {
            src: `src/assets/${generated}/`,
            manifest: {
                src: `src/assets/manifest/${generated}/`,
                dest: `dist/`
            }
        }
    }
};

function cleanGeneratedFavicons() {
    return del([`src/assets/manifest/${generated}/`]);
}

function generateFavicons() {
    return gulp
        .src('src/assets/manifest/logo.svg')
        .pipe(
            favicons({
                path: '/',
                appName: ':: asber',
                appShortName: 'asber',
                appDescription: 'Anti-Social Behaviour Therapy',
                developerName: 'Deniss Muhļa <deniss.muhla@gmail.com>',
                developerURL: 'https://github.com/deniss-muhla',
                dir: 'auto',
                lang: 'en-US',
                background: '#fff',
                theme_color: '#fff',
                appleStatusBarStyle: 'black-translucent',
                display: 'fullscreen',
                orientation: 'landscape',
                scope: '/',
                start_url: '/',
                version: '1.0',
                logging: false,
                pixel_art: false,
                loadManifestWithCredentials: false,
                icons: {
                    android: true,
                    appleIcon: true,
                    appleStartup: true,
                    coast: true,
                    favicons: true,
                    firefox: true,
                    windows: true,
                    yandex: true
                },
                url: '',
                html: 'index.html',
                pipeHTML: true,
                replace: true
            })
        )
        .pipe(gulp.dest(`src/assets/manifest/${generated}/`));
}

exports['generate-favicons'] = series(cleanGeneratedFavicons, generateFavicons);
