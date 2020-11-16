import ChargePointRequest from '../messages/cpreq';

export type ChargePointMessageHandler = (
  cpRequest: ChargePointRequest,
  cpId: string
) => ChargePointResponse;

export interface CentralSystem {
  run: (port: string, cpHandler: ChargePointMessageHandler) => void;
}

export const CentralSystem: CentralSystem = {
  run: (port, cpHandler) => {},
};

function handleWebSocket();
