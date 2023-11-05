# ビルド方法

## コマンド

- 基本的なビルド方法は以下を参照ください。
  - <https://learn.microsoft.com/ja-jp/power-apps/developer/component-framework/implementing-controls-using-typescript>
- 開発時の Build は `ConnectionViewer/Solutions` フォルダにて以下を実行する。
  ```bash
  dotnet build
  ```
- リリース時の BUild は、以下を実行することで、 `Solutions.zip` のファイルサイズが小さくなる。 (ある実績では、815KB -> 522KB)
  ```bash
  dotnet build /p:configuration=Release
  ```

## 開発環境の一例

- Ubuntu-22.04 on Windows 11 WSL
- Node.js v18.16.0
- .NET SDK 7.0.400
- Visual Studio Code 1.84.0
