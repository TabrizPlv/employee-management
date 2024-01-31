# version of nodejs
FROM node:18-alpine3.18

#define VM's directory
WORKDIR /usr/app

#copy file to the root of VM
COPY package.json package-lock.json ./

#build command
RUN npm install

#copy all files excluding dockerignore to the root
COPY . .

RUN npm run build

EXPOSE 3000

# CMD ["NODE_ENV=test", "npm", "start"]
CMD ["sh", "-c", "NODE_ENV=production npm start"]