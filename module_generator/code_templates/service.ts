import { xxxEntityxxx } from "./model.ts";
import { SuperjojoHttpResponse, SuperjojoUtilsFetch } from "./superjojo_utils.ts";

export default class xxxEntityxxxService {

    //TODO: Use more than GET and POST (update SUFetch)

    async getAllxxxEntityxxx() {
        return await SuperjojoUtilsFetch.getJson("xxxentityxxx") as xxxEntityxxx[];
    }

    async getxxxEntityxxx(xxxentityxxxId: string) {
        return await SuperjojoUtilsFetch.getJson(`xxxentityxxx/${xxxentityxxxId}`) as xxxEntityxxx;
    }

    async updatexxxEntityxxx(xxxentityxxxData: xxxEntityxxx) {
        let resp = await SuperjojoUtilsFetch.postJson(`xxxentityxxx/${xxxentityxxxData.id}`, xxxentityxxxData) as SuperjojoHttpResponse;
        if (resp.status == "error") { throw new Error(resp.message) };
        return resp;
    }

    async createxxxEntityxxx(xxxentityxxxData: Omit<xxxEntityxxx, "id">) {
        let resp = await SuperjojoUtilsFetch.postJson(`xxxentityxxx`, xxxentityxxxData) as SuperjojoHttpResponse;
        if (resp.status == "error") { throw new Error(resp.message) };
        return resp;
    }

    async deletexxxEntityxxx(xxxentityxxxId: string) {
        let resp = await SuperjojoUtilsFetch.getJson(`xxxentityxxx/${xxxentityxxxId}`) as SuperjojoHttpResponse;
        if (resp.status == "error") { throw new Error(resp.message) };
        return resp;
    }
}
