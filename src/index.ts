export default class SwuCore{
    static baseUrl:string; //TODO: how to make sure the URL is set when accessed?

    //TODO: instantiate utils like alerts etc ore use static...?

    static init(baseUrl:string){
        SwuCore.baseUrl = baseUrl;
    }
}