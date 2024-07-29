const { execSync } = require('child_process');

// Pegar o nome do módulo a partir dos argumentos da linha de comando
const moduleName = process.argv[2];

// Verificar se o nome do módulo foi fornecido
if (!moduleName) {
  console.error('Error: No module name provided.\ntry "npm run generate-proto module_name"');
  process.exit(1);
}

// Definir a variável de ambiente MODULE e chamar o comando npm
const command = `cross-env MODULE=${moduleName} npm run generate-proto-internal`;

try {
  execSync(command, { stdio: 'inherit' });
} catch (error) {
  console.error('Error executing command:', error);
  process.exit(1);
}
