# Serial Monitor

The Serial Monitor extension for Visual Studio Code provides a way to read from and write to serial ports.

## Public API for the ms-vscode.vscode-serial-monitor VS Code extension

The purpose of this API is to allow for any extension to interact with Microsoft's Serial Monitor extension for VSCode.

When your extension activates, you can use the following code to get access to the API:

```Typescript
    import {SerialMonitorApi, Version, getSerialMonitorApi, LineEnding, Parity, StopBits, Port} from 'vscode-serial-monitor';
 
    let api: SerialMonitorApi|undefined = await getSerialMonitorApi(Version.latest);
    if (api) {
        const port: Port = api.startMonitoringPort({port: "COM1", baudRate: 115200, lineEnding: LineEnding.None, dataBits: 8, stopBits: StopBits.One, parity: Parity.None});
        port.onClosed(() => console.log("My port was closed"));
    }
    // Dispose of the 'api' in your extension's deactivate() method.
```

## Feedback

We appreciate any feedback you have to help improve this extension. To submit feedback, please [create an issue](https://github.com/microsoft/vscode-serial-monitor/issues/new/choose).

*Note: this repository is for feedback on the VS Code extension. To provide feedback on Serial Monitor in Visual Studio 2022, please go to [Visual Studio Developer Community](https://developercommunity.visualstudio.com/home).*

## Trademarks

This project may contain trademarks or logos for projects, products, or services. Authorized use of Microsoft 
trademarks or logos is subject to and must follow 
[Microsoft's Trademark & Brand Guidelines](https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks/usage/general).
Use of Microsoft trademarks or logos in modified versions of this project must not cause confusion or imply Microsoft sponsorship.
Any use of third-party trademarks or logos are subject to those third-party's policies.
