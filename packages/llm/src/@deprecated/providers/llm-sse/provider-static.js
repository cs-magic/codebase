import remove from "lodash/remove";
export class StaticLLMManager {
    static triggers = {};
    triggerId;
    constructor(triggerId) {
        this.triggerId = triggerId;
    }
    get triggers() {
        return Object.keys(StaticLLMManager.triggers);
    }
    //////////////////////////////
    // server
    //////////////////////////////
    get trigger() {
        return StaticLLMManager.triggers[this.triggerId] ?? null;
    }
    async onTriggerStarts() {
        this.print("onTriggerStarts(before)");
        StaticLLMManager.triggers[this.triggerId] = { events: [], clients: [] };
        this.print("onTriggerStarts(end)");
    }
    async onTriggerEnds(reason) {
        this.print("onTriggerEnds(before)");
        // !important
        this.onEvent({ event: "close", data: { reason } });
        delete StaticLLMManager.triggers[this.triggerId];
        this.print("onTriggerEnds(end)");
    }
    //////////////////////////////
    // client
    //////////////////////////////
    async onEvent(event) {
        console.log("[LLM] >> ", {
            triggerId: this.triggerId,
            ...event,
        });
        StaticLLMManager.triggers[this.triggerId]?.clients.forEach((client) => {
            // how?
            client.onEvent(event);
        });
    }
    async onClientConnected(client) {
        this.print(`onClientConnected(id=${client.id})`);
        if (!this.trigger) {
            client.onEvent({
                event: "close",
                data: { reason: "not-found" },
            });
            return;
        }
        await Promise.all(this.trigger.events.map(async (e) => client.onEvent(e)));
        this.trigger.clients.push(client);
    }
    //////////////////////////////
    // general
    //////////////////////////////
    onClientDisconnected(clientId) {
        this.print(`onClientDisconnected(id=${clientId})`);
        remove(this.trigger?.clients ?? [], (c) => c.id === clientId);
        return Promise.resolve(undefined);
    }
    async hasTrigger() {
        //   console.log("hasTrigger: ", {
        //     triggerId,
        //     triggers: this.triggers,
        //   })
        return this.triggerId in StaticLLMManager.triggers;
    }
    print(name) {
        console.log(`[sse] ${name}: `, {
            triggerId: this.triggerId,
            triggers: this.triggers,
        });
    }
}
