FROM registry.docker-cn.com/library/node:8.11
RUN npm cache clean --force

RUN npm install -g cnpm  --registry=https://registry.npm.taobao.org
RUN cnpm install -g pm2

COPY . /app  
WORKDIR /app

RUN cnpm install

CMD ["npm", "run", "deploy"]