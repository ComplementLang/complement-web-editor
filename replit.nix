{ pkgs }: {
  deps = [
    pkgs.sloccount
    pkgs.nodePackages.vscode-langservers-extracted
    pkgs.nodePackages.typescript-language-server
  ];
}