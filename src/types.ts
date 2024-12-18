import WebSocket from "ws";
import * as http from 'http';

export type Timestamp = Date; //TODO: maybe string?

export type OCPPVersionV16 = 'v1.6-json';
export type OCPPVersionV15 = 'v1.5-soap';
export type OCPPVersion = OCPPVersionV16 | OCPPVersionV15;

export type WebsocketOptions = http.ClientRequestArgs & WebSocket.ClientOptions;