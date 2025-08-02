import xxxEntityxxxModule from "./module.ts";
import { SuperjojoUtilsAlert } from "./superjojo_utils.ts";

export default class xxxEntityxxxController {



    async init() {
        await this.refreshxxxEntityxxxList();
    }

    async refreshxxxEntityxxxList() {
        try {
            let xxxentityxxxList = await xxxEntityxxxModule.service.getAllxxxEntityxxx();
            xxxEntityxxxModule.view.updateListView(xxxentityxxxList);
        } catch (error) {
            SuperjojoUtilsAlert.alertError(error);
        }
    }


    async handlexxxEntityxxxEdit(xxxentityxxxId: string) {
        try {
            let xxxentityxxxData = xxxEntityxxxModule.view.getModalFormData();
            xxxentityxxxData.id = xxxentityxxxId;
            const resp = await xxxEntityxxxModule.service.updatexxxEntityxxx(xxxentityxxxData);
            SuperjojoUtilsAlert.alertResp(resp, "Saving xxxEntityDisplayNamexxx");
            xxxEntityxxxModule.view.modal.hide(); //refresh xxxentityxxx list via hide event
        } catch (error) {
            SuperjojoUtilsAlert.alertError(error);
        }

    }

    async handlexxxEntityxxxCreate() {
        try {
            let xxxentityxxxData = xxxEntityxxxModule.view.getModalFormData();
            const resp = await xxxEntityxxxModule.service.createxxxEntityxxx(xxxentityxxxData);
            SuperjojoUtilsAlert.alertResp(resp, "Create xxxEntityDisplayNamexxx");
            xxxEntityxxxModule.view.modal.hide(); //refresh xxxentityxxx list via hide event
        } catch (error) {
            SuperjojoUtilsAlert.alertError(error);
        }

    }

    async handlexxxEntityxxxDelete(xxxentityxxxId: string) {
        try {
            let confirmResp = await SuperjojoUtilsAlert.deleteConfirm("Nutzeraccount löschen", "Soll der Nutzeraccount wirklich gelöscht werden?");
            let resp = await xxxEntityxxxModule.service.deletexxxEntityxxx(xxxentityxxxId);
            SuperjojoUtilsAlert.alertResp(resp, "Nutzeraccount Löschen");
            await this.refreshxxxEntityxxxList();
        } catch (error) {
            SuperjojoUtilsAlert.alertError(error);
        }
    }

    async showxxxEntityxxxModalForUpdate(xxxentityxxxId: string) {
        try {
            const xxxentityxxxData = await xxxEntityxxxModule.service.getxxxEntityxxx(xxxentityxxxId);
            xxxEntityxxxModule.view.setModalFormData(xxxentityxxxData);
            xxxEntityxxxModule.view.setModalSubmitEvent(() => {
                xxxEntityxxxModule.controller.handlexxxEntityxxxEdit(xxxentityxxxId);
            });
            xxxEntityxxxModule.view.modal.show();
        } catch (error) {
            SuperjojoUtilsAlert.alertError(error);
        }
    }

    async showxxxEntityxxxModalForCreate() {
        try {
            xxxEntityxxxModule.view.setModalSubmitEvent(() => {
                xxxEntityxxxModule.controller.handlexxxEntityxxxCreate();
            });
            xxxEntityxxxModule.view.generatePermissionToggles([]);
            xxxEntityxxxModule.view.modal.show();
        } catch (error) {
            SuperjojoUtilsAlert.alertError(error);
        }
    }


}




