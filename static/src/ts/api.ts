import { store } from "./";

async function _processAPIResults(objectType: string, results: {[id: string]: any} | Array<{[id: string]: any}>): Promise<{[id: string]: any}> {
    let intermediary;

    if (results.constructor !== Array) {
        intermediary = [results];
    } else {
        intermediary = results;
    }

    store.dispatch({
        payload: intermediary,
        type: "IMPORT_" + objectType.toUpperCase() + "S"
    });

    return results;
}

export async function fetchFromAPI(objectType: string, objectId: string | null = null, filters: {[id: string]: any} = {}) {
    const queryString = Object.keys(filters).map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(filters[k])).join("&");

    const rawAPIResult = await fetch(
        "/api/" + (objectType) + (objectId ? "/" + objectId : "") + (queryString.length > 0 ? "?" + queryString : ""),
        {credentials: "same-origin", method: "GET"}
    );

    if (rawAPIResult.status === 401) {
        return null;
    }

    const jsonAPIResult = await rawAPIResult.json();

    return await _processAPIResults(objectType, jsonAPIResult);
}
