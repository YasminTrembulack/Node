
npm init -y ## Inicializanod as configurações do projeto
npm i typescript @types/node -D ## Installando typescript
npx tsc --init ## Inicializando ts config


TS Config bases
https://github.com/tsconfig/bases
Escolher a versão do node copiar e colar o codigo no tsconfig.json, substituindo tudo que estava lá.

npm i tsx -D ## Para rodar o app
criar pasta src e o arquivo server.ts dentro
npx tsx watch src/server.ts ## Para rodar o programa, como se fosse o npm run dev do react

server.ts é o primeiro arquivo que precisa ser visto no backend, então adiciono um script no package.json para facilitar
"dev": "npx tsx watch src/server.ts"
dessa forma digitando o     npm run dev     ele rodara o projeto.

npm i fastify



npm i prisma -D ## Ajuda em acessar o banco de dados
npx prisma init --datasource-provider SQLite ## Criando database config

npx prisma migrate dev ## compara mudanças e atualiza o arquivo database para a att atual.

npm i zod ## ajuda a validar dados

npm i fastify-type-provider-zod

npx prisma studio