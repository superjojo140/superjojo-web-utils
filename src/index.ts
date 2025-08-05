export default class SwuCore{
    static baseUrl:string; //TODO: how to make sure the URL is set when accessed?

    //TODO: instantiate utils like alerts etc ore use static...?

    static init(baseUrl:string){
        SwuCore.baseUrl = baseUrl;
    }
}

export * from "./swu_alert.js";
export * from "./swu_dom.js";
export * from "./swu_fetch.js";
export * from "./table-sortable/ts_wrapper.js";