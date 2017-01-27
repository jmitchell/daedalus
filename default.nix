with (import <nixpkgs> {});

stdenv.mkDerivation {
  name = "daedalus";

  buildInputs = [electron nodejs nodePackages.bower nodePackages.node-gyp nodePackages.node-pre-gyp ];

  src = ./app;

}
