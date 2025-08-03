"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const inquirer_1 = __importDefault(require("inquirer"));
const chalk_1 = __importDefault(require("chalk"));
function promptForEntityName() {
    return __awaiter(this, void 0, void 0, function* () {
        const answers = yield inquirer_1.default.prompt([
            {
                type: 'input',
                name: 'entityName',
                message: 'Enter the name of the entity to generate:',
                validate: (input) => input.trim() !== '' || 'Entity name cannot be empty.'
            }
        ]);
        return answers.entityName;
    });
}
function promptForPropertyNames() {
    return __awaiter(this, void 0, void 0, function* () {
        const propertyNames = [];
        console.log(`Lets set the properties fo your entity now.\nYour entity must have an id to work with SWU.\nProperty set: "id"`);
        while (true) {
            const { propertyName } = yield inquirer_1.default.prompt([
                {
                    type: 'input',
                    name: 'propertyName',
                    message: 'Enter a property name (leave empty to finish):'
                }
            ]);
            if (!propertyName || propertyName.trim() === '') {
                break;
            }
            propertyNames.push(propertyName.trim());
        }
        return propertyNames;
    });
}
function promptForEntityDisplayName() {
    return __awaiter(this, void 0, void 0, function* () {
        const answers = yield inquirer_1.default.prompt([
            {
                type: 'input',
                name: 'entityDisplayName',
                message: 'Enter the display name of the entity:',
                validate: (input) => input.trim() !== '' || 'Display name cannot be empty.'
            }
        ]);
        return answers.entityDisplayName;
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    const entityName = yield promptForEntityName();
    const entityDisplayName = yield promptForEntityDisplayName();
    const propertyNames = yield promptForPropertyNames();
    const entityDir = path.join(process.cwd(), entityName);
    // Ensure the entity directory exists
    if (!fs.existsSync(entityDir)) {
        fs.mkdirSync(entityDir);
        console.log(`Created directory: ${entityName}`);
    }
    else {
        console.log(`Directory ${entityName} already exists, skipping creation.`);
    }
    // Read template files from code_templates/ and replace {{entityName}} with the actual entity name
    const templatesDir = path.join(process.cwd(), 'code_templates');
    const templateFiles = fs.readdirSync(templatesDir);
    const entityFiles = templateFiles.map(fileName => {
        const templatePath = path.join(templatesDir, fileName);
        let content = fs.readFileSync(templatePath, 'utf8');
        let propertiesHtml = '';
        let setValueTs = '';
        let getValueTs = '';
        let interfaceProperties = '';
        let tableProperties = '';
        for (const propertyName of propertyNames) {
            propertiesHtml += `
                <div class="row">
                    <div class="col-md">
                    <div class="mb-3">
                        <label class="form-label">${propertyName}</label>
                        <input class="form-control" type="text" id="swu_${entityName.toLowerCase()}_modal_form_${propertyName}" required>
                    </div>
                    </div>
                </div>
                `;
            getValueTs += `    ${entityName}Data.${propertyName} = SwuDom.querySelectorAsInput("#swu_${entityName.toLowerCase()}_modal_form_${propertyName}").value;\n`;
            setValueTs += `    SwuDom.querySelectorAsInput("#swu_${entityName.toLowerCase()}_modal_form_${propertyName}").value = ${entityName}Data.${propertyName};\n`;
            interfaceProperties += `    ${propertyName}: string;\n`;
            tableProperties += `    ${propertyName}: ${propertyName},\n`;
        }
        content = content.replace(/xxxEntityInterfacePropertiesxxx/g, interfaceProperties);
        content = content.replace(/xxxEntityPropertiesTablexxx : "",/g, tableProperties);
        content = content.replace(/let xxxsetPropertyCodexxx;/g, setValueTs);
        content = content.replace(/let xxxgetPropertyCodexxx;/g, getValueTs);
        content = content.replace(/xxxEntityPropertiesInputsHtmlxxx/g, propertiesHtml);
        content = content.replace(/xxxEntityDisplayNamexxx/g, entityName);
        content = content.replace(/xxxEntityxxx/g, entityName);
        content = content.replace(/xxxentityxxx/g, entityName.toLowerCase());
        return {
            name: fileName,
            content
        };
    });
    entityFiles.forEach(file => {
        const filePath = path.join(entityDir, file.name);
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, file.content, { encoding: 'utf8' });
            console.log(`Created ${entityName}/${file.name}`);
        }
        else {
            console.log(`${entityName}/${file.name} already exists, skipping.`);
        }
    });
    console.log(`⚠️  Make sure to define ${chalk_1.default.bold(process.env.BASE_URL)} because the generated code depend on it.`);
}))();
