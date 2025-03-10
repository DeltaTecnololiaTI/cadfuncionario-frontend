# Estágio de build: compila o projeto Angular
FROM node:18 as build
WORKDIR /app

# Copia os arquivos de dependência
COPY package.json package-lock.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código
COPY . .

# Compila o projeto Angular
RUN npm run build -- --configuration production

# Estágio final: serve a aplicação com Nginx
FROM nginx:alpine

# Copia os arquivos compilados do estágio de build
COPY --from=build /app/dist/cad-funcionario /usr/share/nginx/html

# Expõe a porta 80
EXPOSE 80

# Inicia o Nginx
CMD ["nginx", "-g", "daemon off;"]
