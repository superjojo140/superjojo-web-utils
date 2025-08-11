import { ColumnDefinition, TabulatorFull as Tabulator } from "tabulator-tables";
import 'tabulator-tables/dist/css/tabulator_bootstrap5.min.css';

export class SwuTable {

    static defaultPagination = 10;
    table: Tabulator;

    constructor(selector: string, columns: Record<string,any>[]) {
        this.table = new Tabulator(selector, {
            layout: "fitColumns",
            pagination: true,
            paginationSize: SwuTable.defaultPagination,
            resizableRows: true,
            columns: columns as ColumnDefinition[],
        });
    }

    update(data: {}[]) {
        this.table.replaceData(data);
    }

}
