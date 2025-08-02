import * as fs from 'fs';
import * as path from 'path';
import inquirer from 'inquirer';


async function promptForEntityName() {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'entityName',
            message: 'Enter the name of the entity to generate:',
            validate: (input: string) => input.trim() !== '' || 'Entity name cannot be empty.'
        }
    ]);
    return answers.entityName;
}

(async () => {
    const entityName = await promptForEntityName();
    const entityDir = path.join(process.cwd(), entityName);

    // Ensure the entity directory exists
    if (!fs.existsSync(entityDir)) {
        fs.mkdirSync(entityDir);
        console.log(`Created directory: ${entityName}`);
    } else {
        console.log(`Directory ${entityName} already exists, skipping creation.`);
    }

    // Read template files from code_templates/ and replace {{entityName}} with the actual entity name
    const templatesDir = path.join(process.cwd(), 'code_templates');
    const templateFiles = fs.readdirSync(templatesDir).filter(file => file.endsWith('.ts'));

    const entityFiles = templateFiles.map(fileName => {
        const templatePath = path.join(templatesDir, fileName);
        let content = fs.readFileSync(templatePath, 'utf8');
        content = content.replace(/{{entityName}}/g, entityName);
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
        } else {
            console.log(`${entityName}/${file.name} already exists, skipping.`);
        }
    });
})();