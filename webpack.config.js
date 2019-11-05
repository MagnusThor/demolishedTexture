module.exports = {
  mode:'development',
  node: {
   fs: "empty"
  },
  watch: true,
  entry: {
    example: './example/Example.js',
    editor :'./editor/Editor.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name]-bundle.js'
  }
}