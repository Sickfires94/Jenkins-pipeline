FROM node:14

ENV MONGODB_URI=mongodb+srv://username:username@demo-db.mvxco7y.mongodb.net/

RUN mkdir -p /home/app

COPY . /home/app

# set default dir so that next commands executes in /home/app dir
WORKDIR /home/app

# will execute npm install in /home/app because of WORKDIR
RUN npm install

EXPOSE 3000

# no need for /home/app/server.js because of WORKDIR
CMD ["node", "server.js"]

