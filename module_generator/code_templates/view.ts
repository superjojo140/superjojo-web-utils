import { xxxEntityxxx } from "./model.ts";
import xxxEntityxxxModule from "./module.ts";
import { SuperjojoUtilsDom } from "./superjojo_utils.ts";
import { TableSortable } from "./table-sortable/ts_wrapper.js";


export default class xxxEntityxxxView {

    //TODO: Fix all display texts and html ids

    table: TableSortable;
    modal: Modal;
    modalForm: HTMLFormElement = SuperjojoUtilsDom.querySelector("#xxxentityxxx_management_modal_form") as HTMLFormElement;

    async init() {

        this.modal = new Modal('#xxxentityxxx_management_modal');
        //Reset monitoring form if the modal is closed
        this.modal.addEventListener("hide.bs.modal", this.resetModalForm);
        this.modal.addEventListener("hide.bs.modal", xxxEntityxxxModule.controller.refreshxxxEntityxxxList);

        SuperjojoUtilsDom.querySelector('#xxxentityxxx_management_modal_form_role').addEventListener('change', this.onRoleSelect);

        let tableColumns = {
            id: "Id",
            name: "Name",
            mail: "Mail",
            account: "Accountname",
            roleText: "Rolle",
            actionButton: "",
        }
        let searchInput = SuperjojoUtilsDom.querySelectorAsInput("#xxxentityxxx_management_filter_input");
        let searchInputClear = SuperjojoUtilsDom.querySelectorAsInput("#xxxentityxxx_management_filter_clear_button");
        this.table = new TableSortable("#xxxentityxxx_management_table", tableColumns, searchInput, searchInputClear, 10, this.registerListItemButtons);

        SuperjojoUtilsDom.addEventListener("#xxxentityxxx_management_create_xxxentityxxx_button", "click", xxxEntityxxxModule.controller.showxxxEntityxxxModalForCreate);

        SuperjojoUtilsDom.addEventListener("#xxxentityxxx_management_modal_form_password_change_button", "click", () => this.showPasswordField(true));
    }




    async updateListView(xxxentityxxxList: xxxEntityxxx[]) {
        let tableDataList: xxxEntityxxx[] = [];

        for (let xxxentityxxxId in xxxentityxxxList) {
            let xxxentityxxx = xxxentityxxxList[xxxentityxxxId] as xxxEntityxxx;
            let editBtn = `<button type="button" class="btn btn-primary btn-sm xxxentityxxx-management-edit-btn" data-xxxentityxxx-id="${xxxentityxxx.id}">
                                <i class="fas fa-pencil-alt"></i>&nbsp; Bearbeiten
                           </button>`;
            let deleteBtn = `&nbsp;<button class="btn btn-danger btn-sm xxxentityxxx-management-delete-btn" type="button" data-xxxentityxxx-id="${xxxentityxxx.id}">
                                <i class="far fa-trash-alt"></i> Löschen
                             </button>`;
            tableDataList.push(xxxentityxxx);
        }

        this.table.update(tableDataList, "id"); //button events are registered by table's onUpdate function
        SuperjojoUtilsDom.querySelectorAsInput("#xxxentityxxx_management_filter_input").value = "";


    }

    registerListItemButtons() {
        SuperjojoUtilsDom.querySelectorAll(".xxxentityxxx-management-edit-btn").forEach(elem => {
            const xxxentityxxxId = elem.getAttribute("data-xxxentityxxx-id") as string;
            SuperjojoUtilsDom.addEventListener(elem, "click", () => xxxEntityxxxModule.controller.showxxxEntityxxxModalForUpdate(xxxentityxxxId));
        });

        SuperjojoUtilsDom.querySelectorAll(".xxxentityxxx-management-delete-btn").forEach(elem => {
            const xxxentityxxxId = elem.getAttribute("data-xxxentityxxx-id") as string;
            SuperjojoUtilsDom.addEventListener(elem, "click", () => xxxEntityxxxModule.controller.handlexxxEntityxxxDelete(xxxentityxxxId));
        });
    }

    setModalSubmitEvent(callback: Function) {
        SuperjojoUtilsDom.removeEventListener(this.modalForm, "submit");
        SuperjojoUtilsDom.addEventListener(this.modalForm, "submit", (event) => {
            event.preventDefault();
            callback();
        });
    }


    /**
     * Sets form data 
     */
    setModalFormData(xxxentityxxxData: xxxEntityxxx) {
        //TODO: Loop through xxxEntityPropertiesxxx (handle different data/input types...?)
        //Or use event handlers...?
        SuperjojoUtilsDom.querySelectorAsInput("#xxxentityxxx_management_modal_form_name").value = xxxentityxxxData.name;
    }

    getModalFormData(): xxxEntityxxx {
        //TODO: Loop through xxxEntityPropertiesxxx (handle different data/input types...?)
        let xxxentityxxxData = {} as xxxEntityxxx;
        xxxentityxxxData.name = SuperjojoUtilsDom.querySelectorAsInput("#xxxentityxxx_management_modal_form_name").value;
        return xxxentityxxxData;
    }

    resetModalForm = () => {
        //TODO: Loop through xxxEntityPropertiesxxx (handle different data/input types...?)
        SuperjojoUtilsDom.querySelectorAsInput("#xxxentityxxx_management_modal_form_name").value = "";
    }


}