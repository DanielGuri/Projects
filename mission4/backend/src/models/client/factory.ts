import Model from "./model";
import client from "./mysql";

export default function getModel(): Model {
    return client;
}