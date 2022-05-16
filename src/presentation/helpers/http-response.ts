import { response } from "express";
import { ServerError } from "../errors/server-error";
import { Unathorized } from "../errors/unathorized";

export class HttpResponse {
    static serverError() {
        return response.status(500).json({
            message: new ServerError(),
        });
    }

    static unathorized() {
        return response.status(401).json({
            message: new Unathorized(),
        });
    }

    static badRequest(message: string) {
        return response.status(400).json({ message });
    }

    static created() {
        return response.sendStatus(201);
    }

    static ok(data?: any) {
        return response.send(data);
    }
}
