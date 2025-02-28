FROM node:18.17
WORKDIR /dem
COPY ./dem/package.json ./dem/yarn.lock ./
RUN yarn install --production=false
COPY ./dem/tsconfig.json  ./
COPY . .
EXPOSE 8000
CMD ["yarn", "dev"]