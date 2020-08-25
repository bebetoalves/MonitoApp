# Como instalar

 1. Instale o Node na sua maquina. (https://nodejs.org/en/download/)
 
 2. Após a instalação do Node, instale o Adonis-CLI (pule este passo se já estiver instalado).
		

    npm i -g @adonisjs/cli

 3. Clone este repositório e instale as dependências do node:

    npm install

 4. Gere o arquivo de configuração do Adonis:


    cp .env.example .env

 5. Gere uma chave de segurança para o arquivo de configuração:
 
 

    adonis key:generate

 6. Inicie o servidor:

    adonis serve
