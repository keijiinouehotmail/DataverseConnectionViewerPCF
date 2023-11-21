# ビルド方法

## コマンド

- 基本的なビルド方法は以下を参照ください。
  - <https://learn.microsoft.com/ja-jp/power-apps/developer/component-framework/implementing-controls-using-typescript>
- 開発時の Build は `ConnectionViewer/Solutions` フォルダにて以下を実行する。
  ```bash
  dotnet build
  ```
  この方法で Build されたファイルは、`ConnectionViewer/Solutions/bin/Debug` フォルダに `Solutions.zip` ファイルとして出力される。  
- リリース時の Build は、以下を実行することで、 `Solutions.zip` のファイルサイズが小さくなる。 (ある実績では、815KB -> 522KB)
  ```bash
  dotnet build /p:configuration=Release
  ```
  この方法で Build されたファイルは、`ConnectionViewer/Solutions/bin/Release` フォルダに `Solutions.zip` ファイルとして出力される。  
  なお、本リポジトリの Releases ページに公開しているファイルはこの方法でビルドしたファイルを `DataverseConnectionViewerPCF_vx.x.x.x.zip` のようにリネームしたものである。

## 開発環境

Dev Container を利用するか、以下の 開発環境の一例 を参考にしてください。

### Dev Container

- 本リポジトリには、Visual Studio Code の Dev Container で開発するための設定ファイル `.devcontainer/devcontainer.json` が含まれています。

### 開発環境の一例

- Ubuntu-22.04 on Windows 11 WSL
- Node.js v18.16.0
- .NET SDK 7.0.400
- Visual Studio Code 1.84.0
- Visual Studio Code Extension: Power Platform Tools v2.0.21
