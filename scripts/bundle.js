const esbuild = require('esbuild');

const buildOptions = {
  entryPoints: ['src/index.ts'],
  outfile: 'dist/bundle.js',
  bundle: true,
  minify: true,
  sourcemap: true,
  platform: 'browser',
  target: ['es2020'],
  loader: { '.ts': 'ts' }
};

// Check if watch mode is requested
if (process.argv.includes('--watch')) {
  // Create context for watch mode
  esbuild.context(buildOptions).then(context => {
    // Start watch mode
    context.watch();
    console.log('Watching for changes...');
  });
} else {
  // Regular one-time build
  esbuild.build(buildOptions).catch(() => process.exit(1));
}
