import * as vscode from "vscode";
export declare enum StopBits {
    One = "one",
    Onepointfive = "onepointfive",
    Two = "two"
}
export declare enum Parity {
    None = "none",
    Odd = "odd",
    Even = "even",
    Mark = "mark",
    Space = "space"
}
export declare enum LineEnding {
    None = "none",
    LF = "\n",
    CR = "\r",
    CRLF = "\r\n"
}
export declare type DataBit = 5 | 6 | 7 | 8;
export interface MonitorPortSettings {
    port: string;
    baudRate: number;
    lineEnding: LineEnding;
    dataBits: DataBit;
    stopBits: StopBits;
    parity: Parity;
}
export interface Port {
    /**
     * Stop monitoring this port.
     */
    stopMonitoring(): Promise<void>;
    /**
     * Event for when this port, for any reason, was closed. This can be used to add listeners for when the port is closed for any reason.
     */
    onClosed: vscode.Event<void>;
}
export interface SerialMonitorApi extends vscode.Disposable {
    /**
     * Start monitoring a specific port with specific settings.
     *
     * This will, on a non-active window, either already present, or by creating a new one (if possible), start monitoring with the requested settings.
     * @param monitorSettings The specific settings to pass to the serial monitor webview.
     * @returns A promise of a Port, which will contain an object that allows the consumer to stop monitoring that port, or to listen for when it is closed.
     * @throws An exception if there is a problem opening the port. (i.e. The requested port isn't connected, there was an issue with the settings, there isn't an available serial monitor webview, etc.)
     */
    startMonitoringPort(monitorSettings: MonitorPortSettings): Promise<Port>;
    /**
     * Stop monitoring a specific port.
     *
     * This will search for the window that is actively monitoring the requested port, if it's present, and stop the monitoring.
     * @param portName The port name to stop monitoring.
     */
    stopMonitoringPort(portName: string): Promise<void>;
    /**
     * Clear the output of all of the serial monitor webviews.
     */
    clearOutput(): Promise<void>;
}
/**
 * API version information.
 */
export declare enum Version {
    v0 = 0,
    latest = 0
}
export declare function getSerialMonitorApi(version: Version, extensionContext: vscode.ExtensionContext): Promise<SerialMonitorApi | undefined>;
//# sourceMappingURL=api.d.ts.map