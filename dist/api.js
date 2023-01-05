"use strict";
// Copyright (c) Microsoft Corporation.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSerialMonitorApi = exports.Version = exports.LineEnding = exports.Parity = exports.StopBits = void 0;
const vscode = __importStar(require("vscode"));
var StopBits;
(function (StopBits) {
    StopBits["One"] = "one";
    StopBits["Onepointfive"] = "onepointfive";
    StopBits["Two"] = "two";
})(StopBits = exports.StopBits || (exports.StopBits = {}));
var Parity;
(function (Parity) {
    Parity["None"] = "none";
    Parity["Odd"] = "odd";
    Parity["Even"] = "even";
    Parity["Mark"] = "mark";
    Parity["Space"] = "space";
})(Parity = exports.Parity || (exports.Parity = {}));
var LineEnding;
(function (LineEnding) {
    LineEnding["None"] = "none";
    LineEnding["LF"] = "\n";
    LineEnding["CR"] = "\r";
    LineEnding["CRLF"] = "\r\n";
})(LineEnding = exports.LineEnding || (exports.LineEnding = {}));
/**
 * API version information.
 */
var Version;
(function (Version) {
    Version[Version["v0"] = 0] = "v0";
    Version[Version["latest"] = 0] = "latest";
})(Version = exports.Version || (exports.Version = {}));
async function getSerialMonitorApi(version, extensionContext) {
    const serialMonitorExtension = vscode.extensions.getExtension("ms-vscode.vscode-serial-monitor");
    let extensionApi;
    if (serialMonitorExtension) {
        if (!serialMonitorExtension.isActive) {
            try {
                extensionApi = await serialMonitorExtension.activate();
            }
            catch { }
        }
        else {
            extensionApi = serialMonitorExtension.exports;
        }
    }
    return extensionApi.getApi(version, extensionContext);
}
exports.getSerialMonitorApi = getSerialMonitorApi;
//# sourceMappingURL=api.js.map