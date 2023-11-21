# How to build

## Commands

- See the following for basic build instructions.
  - <https://docs.microsoft.com/en-us/powerapps/developer/component-framework/implementing-controls-using-typescript>
- Build during development is done by the following in the `ConnectionViewer/Solutions` folder.
  ```bash
  dotnet build
  ```
  The files built in this way are output as the `Solutions.zip` file in the `ConnectionViewer/Solutions/bin/Debug` folder.
- Build at release time can reduce the file size of `Solutions.zip` by executing the following. (In one track record, 815KB -> 522KB)
  ```bash
  dotnet build /p:configuration=Release
  ```
  The files built in this way are output as the `Solutions.zip` file in the `ConnectionViewer/Solutions/bin/Release` folder.
  The files published on the Releases page of this repository are renamed versions of these files, such as `DataverseConnectionViewerPCF_vx.x.x.x.zip`.

## Example of development environment

You can use the Dev Container, or refer to the following Example of a development environment.

### Dev Container

- This repository contains the configuration file `.devcontainer/devcontainer.json` for developing with Visual Studio Code's Dev Container.

### Example of a development environment

- Ubuntu-22.04 on Windows 11 WSL
- Node.js v18.16.0
- .NET SDK 7.0.400
- Visual Studio Code 1.84.0
- Visual Studio Code Extension: Power Platform Tools v2.0.21
