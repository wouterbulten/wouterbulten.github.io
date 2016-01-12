var ciritical = require('critical')

critical.generate({
    // Inline the generated critical-path CSS
    // - true generates HTML
    // - false generates CSS
    //inline: false,

    // Your base directory
    //base: '',

    // HTML source file
    src: 'index.html',

    // Viewport width
    width: 450,

    // Viewport height
    height: 900,

    // Target for final HTML output.
    // use some css file when the inline option is not set
    dest: 'critical-above-the-fold.css',

    // Minify critical-path CSS when inlining
    minify: true,

    // Extract inlined styles from referenced stylesheets
    extract: true,

    // Prefix for asset directory
    //pathPrefix: '/MySubfolderDocrot',

    // ignore css rules
    //ignore: ['font-face',/some-regexp/],

    // overwrite default options
    //ignoreOptions: {}
  });
