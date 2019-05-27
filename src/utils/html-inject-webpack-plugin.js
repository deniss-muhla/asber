const HtmlWebpackPlugin = require('html-webpack-plugin');

class HtmlInjectWebpackPlugin {
    apply(compiler) {
        compiler.hooks.compilation.tap('HtmlInjectWebpackPlugin', compilation => {
            HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync(
                'HtmlInjectWebpackPlugin', // <-- Set a meaningful name here for stacktraces
                (data, cb) => {
                    console.log(data);

                    // Manipulate the content
                    //data.html += 'The Magic Footer'
                    // Tell webpack to move on
                    cb(null, data);
                }
            );
        });
    }
}

module.exports = HtmlInjectWebpackPlugin;
