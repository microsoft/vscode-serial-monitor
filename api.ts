// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as vscode from "vscode";

export enum StopBits {
  One = "one",
  Onepointfive = "onepointfive",
  Two = "two",
}

export enum Parity {
  None = "none",
  Odd = "odd",
  Even = "even",
  Mark = "mark",
  Space = "space",
}

export enum LineEnding {
  None = "none",
  LF = "\n",
  CR = "\r",
  CRLF = "\r\n",
}

export type DataBit = 5 | 6 | 7 | 8;

export interface MonitorPortSettings {
  port: string;
  baudRate: number;
  lineEnding: LineEnding;
  dataBits: DataBit;
  stopBits: StopBits;
  parity: Parity;
}

export interface MonitorTCPConnectionSettings {
  host: string;
  port: number;
  swoEnabled: boolean;
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

export interface PortInformation {
  /**
   * Name of the port. i.e. `COM3`
   */
  portName: string;
  friendlyName?: string;
  /**
   * Vendor identifier made of 4 hex characters.
   */
  vid?: string;
  /**
   * Product identifier made of 4 hex characters.
   */
  pid?: string;
}

export interface SerialMonitorApi extends vscode.Disposable {
  /**
   * List the available serial ports on the system.
   */
  listAvailablePorts(): Promise<PortInformation[]>;
  
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
   * @returns True if a `portName` was being monitored and was stopped. Otherwise, returns false.
   */
  stopMonitoringPort(portName: string): Promise<boolean>;

  /**
   * Start monitoring a specifc TCP connection based on host and port. 
   * 
   * Also supports the enablement of "Serial Wire Output" mode.
   * This will, on a non-active window, either already present, or by creating a new one (if possible), start monitoring with the requested settings.
   * @param connectionSettings  The connection settings to pass to the serial monitor webview.
   * @returns A promise of a Port, which will contain an object that allows the consumer to stop monitoring that port, or to listen for when it is closed.
   * @throws An exception if there is a problem opening the connection.
   */
  startMonitoringTCPConnection(connectionSettings: MonitorTCPConnectionSettings): Promise<Port>;

  /**
   * Stop monitoring a specific connection.
   * 
   * This will search for a window that is actively monitoring the requested host and port, if it's present, and stop the monitoring.
   * @param host The host name to look for to stop monitoring.
   * @param port The port number to look for to stop monitoring.
   * @returns True if the `host` and `port` was being monitored and was stopped. Otherwise, returns false.
   */
  stopMonitoringTCPConnection(host: string, port: number): Promise<boolean>;

  /**
   * Clear the output of all of the serial monitor webviews.
   */
  clearOutput(): Promise<void>;
}

/**
 * API version information.
 */
export enum Version {
  v0 = 0, // 0.x.x
  latest = v0,
}

export async function getSerialMonitorApi(
  version: Version,
  extensionContext: vscode.ExtensionContext
): Promise<SerialMonitorApi | undefined> {
  const serialMonitorExtension: vscode.Extension<any> | undefined =
    vscode.extensions.getExtension("ms-vscode.vscode-serial-monitor");
  let extensionApi: any | undefined;

  if (serialMonitorExtension) {
    if (!serialMonitorExtension.isActive) {
      try {
        extensionApi = await serialMonitorExtension.activate();
      } catch {}
    } else {
      extensionApi = serialMonitorExtension.exports;
    }
  }

  return extensionApi!.getApi(version, extensionContext);
}
