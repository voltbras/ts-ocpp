import ChargePointRequest from '../messages/cpreq';
import ChargePointResponse from '../messages/cpresp';
import { createWebSocketsServer } from './ws/ws';

export type ChargePointMessageHandler = (
  cpRequest: ChargePointRequest,
  cpId: string
) => ChargePointResponse;

export interface CentralSystem {
  run: (port: number, cpHandler: ChargePointMessageHandler) => void;
}

export const CentralSystem: CentralSystem = {
  run: (port, cpHandler) => {
    createWebSocketsServer(port, '0.0.0.0', cpHandler)
  },
};

