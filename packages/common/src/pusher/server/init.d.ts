import Pusher from "pusher";
import { IPusherServerConfig } from "../schema";
export declare const initPusherServer: (config: IPusherServerConfig) => Pusher;
