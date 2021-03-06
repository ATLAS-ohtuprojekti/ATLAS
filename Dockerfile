FROM node:14-slim
ENV NODE_ENV=production
WORKDIR /opt/app
RUN apt-get update && \
    apt-get install -qq build-essential libcairo2-dev libpango1.0-dev libjpeg-dev librsvg2-dev

RUN apt-get update && \
    apt-get install -y libaio1 unzip wget
RUN wget https://download.oracle.com/otn_software/linux/instantclient/instantclient-basiclite-linuxx64.zip && \
    unzip instantclient-basiclite-linuxx64.zip && \
    rm -f instantclient-basiclite-linuxx64.zip && \
    cd instantclient* && \
    rm -f *jdbc* *occi* *mysql* *jar uidrvci genezi adrci && \
    echo /opt/app/instantclient* > /etc/ld.so.conf.d/oracle-instantclient.conf && \
    ldconfig

COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production --silent
COPY . .
EXPOSE 3000
USER node
CMD ["node", "/opt/app/src/main/start.js"]
