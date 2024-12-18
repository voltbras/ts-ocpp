import { ActionName, Request, Response } from "../messages";
import { OCPPApplicationError, OCPPRequestError } from "../errors/index";
import { validateMessageRequest } from "../messages/validation";
import { EitherAsync, Left, Right } from "purify-ts";
import * as soap from "soap";
import * as path from "path";
import { chargePointActions } from "../messages/cp";
import { soapCentralSystemActions } from "../messages/cs";
import * as uuid from "uuid";

type SOAPResponse = [Error | null, any, any, any, any];

export default class SOAPConnection {
  private respondedActions: ActionName<"v1.5-soap">[];
  constructor(
    private readonly soapClient: soap.Client,
    private readonly connectedTo: "cp" | "cs",
    private readonly chargePointId: string,
    private readonly endpoint: string
  ) {
    this.respondedActions =
      connectedTo === "cp" ? soapCentralSystemActions : chargePointActions;
  }

  static async connect(
    endpoint: string,
    connectedTo: "cp" | "cs",
    chargePointId: string
  ): Promise<SOAPConnection> {
    const wsdlPath = path.resolve(
      __dirname,
      connectedTo === "cs"
        ? "../messages/soap/ocpp_centralsystemservice_1.5_final.wsdl"
        : "../messages/soap/ocpp_chargepointservice_1.5_final.wsdl"
    );
    const soapClient = await soap.createClientAsync(wsdlPath, {
      endpoint,
      forceSoap12Headers: true,
    });
    return new SOAPConnection(soapClient, connectedTo, chargePointId, endpoint);
  }

  public sendRequest<T extends ActionName<"v1.5-soap">>(
    action: T,
    { action: _, ocppVersion: __, ...payload }: Request<T, "v1.5-soap">
  ): EitherAsync<OCPPRequestError, Response<T, "v1.5-soap">> {
    return EitherAsync.fromPromise(async () => {
      const validateResult = validateMessageRequest(
        action,
        payload,
        this.respondedActions
      );
      if (validateResult.isLeft())
        return Left(
          new OCPPApplicationError(validateResult.extract().toString())
        );

      const xmlNs =
        this.connectedTo === "cp"
          ? "urn://Ocpp/Cp/2012/06/"
          : "urn://Ocpp/Cs/2012/06/";
      this.soapClient.addSoapHeader(
        { chargeBoxIdentity: this.chargePointId },
        "",
        "ocpp",
        xmlNs
      );
      this.soapClient.addSoapHeader(
        {
          Action: "/" + action,
          MessageID: uuid.v4(),
          To: this.endpoint,
        },
        "",
        "wsa5",
        "http://www.w3.org/2005/08/addressing"
      );
      
      const [err, result, _rawResponse, _soapHeader, _rawRequest] = await new Promise<SOAPResponse>((resolve) => {
        const [serviceKey, portKey] =
          this.connectedTo === "cp"
            ? ["ChargePointService", "ChargePointServiceSoap12"]
            : ["CentralSystemService", "CentralSystemServiceSoap12"];
        this.soapClient[serviceKey][portKey][action](payload, (...args: any[]) =>
          resolve(args as SOAPResponse)
        );
      });
      if (err) return Left(new OCPPRequestError(err.toString()));
      return Right(result);
    });
  }
}
