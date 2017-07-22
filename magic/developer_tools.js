
/* DEVELOPER TOOLS */

let hashes = [];

handlers.push ( Event.on ( 'windowDidOpen', window => {

  if ( !/chrome-devtools/.test ( window.title () ) ) return;

  hashes.push ( window.hash () );

  setFrame ( .4, .5, .6, .5, window ); // Bottom-Right

  growVSCHeight ( -72 );

}));

handlers.push ( Event.on ( 'windowDidClose', window => {

  const hash = window.hash ();

  if ( !_.includes ( hashes, hash ) ) return;

  hashes = _.without ( hashes, hash );

  growVSCHeight ( 72 );

}));

/* HELPERS */

function growVSCHeight ( growth ) {

  const vscode = Space.active ().windows ().find ( window => /Code/.test ( window.app ().name () ) );

  if ( !vscode ) return;

  const frame = vscode.frame (),
        newFrame = _.extend ( frame, {
          height: frame.height + growth
        });

  vscode.setFrame ( newFrame );

}
