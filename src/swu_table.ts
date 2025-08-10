import { ColumnDefinition, Tabulator } from "tabulator-tables";
import 'tabulator-tables/dist/css/tabulator_bootstrap5.min.css';

export class SwuTable {

    static defaultPagination = 10;
    table: Tabulator;

    constructor(selector: string, columns: ColumnDefinition[]) {
        this.table = new Tabulator(selector, {
            layout: "fitColumns",
            addRowPos: "top",
            pagination: true,
            paginationSize: SwuTable.defaultPagination,
            resizableRows: true,
            initialSort: [
                { column: "name", dir: "asc" },
            ],
            columns: columns,
        });
    }

    update(data: {}[]) {
        this.table.replaceData(data);
    }

}