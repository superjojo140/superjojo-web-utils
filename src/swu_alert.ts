import { SwuDom } from "./swu_dom.js";
import { SwuHttpResponse } from "./swu_fetch.js";
import swal from 'sweetalert';

export class SwuAlert {


    static swalToBootstrapClass = {
        "success": "success",
        "info": "info",
        "warning": "warning",
        "error": "danger",
    }
    static TOAST_LIVETIME = 5000 //in milliseconds
    static TOAST_ID = 0;

    static async init() {
        //Add toast container to site's html
        SwuDom.querySelector("body").insertAdjacentHTML("beforeend", `<div id="swu_alert_toast_container" style="position: fixed; bottom: 5px; left: 10px; z-index: 10000;"></div>`);
    }

    static async alertResp(resp: SwuHttpResponse, title?: string) {
        let options = {} as SwuAlertOptions;

        options.text = resp.message;
        options.type = resp.status as SweetAlertIcon;
        options.mode = resp.mode;
        options.title = title || resp.title;

        await SwuAlert.alert(options);
    }

    static async alertSimple(text: string) {
        await SwuAlert.alert({ text: text });
    }

    static async alertError(error: any) {
        console.error(error);
        await SwuAlert.alert({
            text: error.message,
            title: "Es ist ein Fehler aufgetreten",
            type: "error"
        });
    }

    static alert(options: SwuAlertOptions): Promise<boolean> {
        return new Promise(function (resolve, reject) {


            options.mode = options.mode || ((options.type == "error" || options.type == "warning") ? "alert" : "toast"); //if mode is unset => use alert for errors and warnings and toasts for others

            let swalOptions: SweetAlertOptions = {
                text: options.text || "",
                title: options.title || "Info",
                type: options.type || "info",
                html: true,
            }

            if (options.mode == "alert") {
                swal(swalOptions, resolve);
            }

            else if (options.mode == "toast") {
                let toastOptions = swalOptions as SwuToastOptions;
                toastOptions.bootstrapClass = SwuAlert.swalToBootstrapClass[swalOptions.type];
                SwuAlert.showToast(toastOptions);
            }
        });
    }

    /**
     * @example let confirmResp = await SwuAlert.deleteConfirm("Element löschen", "Soll dieses Element wirklich gelöscht werden?");
     */
    static deleteConfirm(title: string, text: string, confirmButtonText = "Löschen"): Promise<boolean> {
        return new Promise(function (resolve, reject) {
            swal({
                title: title,
                text: text,
                html: true,
                type: "error",
                showCancelButton: true,
                cancelButtonText: "Abbrechen",
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Löschen",
            }, resolve);
        });
    }


    static showToast(options: SwuToastOptions) {
        let toastId = `alert_toast_${SwuAlert.TOAST_ID++}`;
        let html = `<div class="alert alert-${options.bootstrapClass} alert-dismissible" role="alert" id="${toastId}" style="display:none;">
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <strong>${options.title}</strong>
                        ${options.text}
                    </div>`;

        SwuDom.querySelector("#swuToastsContainer").insertAdjacentHTML("beforeend", html);
        SwuDom.slideDown(`#${toastId}`);
        setTimeout(() => SwuDom.querySelector(`#${toastId}`).remove(), SwuAlert.TOAST_LIVETIME);
    }

}

export interface SwuAlertOptions {
    text: string;
    type?: SweetAlertIcon;
    title?: string;
    mode?: "alert" | "toast";
}

export interface SweetAlertOptions {
    title: string;
    text: string;
    type: SweetAlertIcon;
    html: boolean;
}

export interface SwuToastOptions extends SweetAlertOptions {
    bootstrapClass: "success" | "info" | "warning" | "danger" | string;
}

export type SweetAlertIcon = "success" | "warning" | "error" | "info";

await SwuAlert.init();