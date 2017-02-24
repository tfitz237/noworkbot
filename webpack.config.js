module.exports = {
    entry: './app/index.ts',
    output: {
        filename: 'build.js',
        path: 'build/'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    }
};