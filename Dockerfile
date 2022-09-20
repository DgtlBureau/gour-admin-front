FROM node:18.0.0 AS build

WORKDIR /gour-admin-front

COPY package*.json ./

RUN npm ci --legacy-peer-deps

COPY . .

RUN npm run build

FROM nginx:alpine
COPY --from=build /gour-admin-front/build /opt/site
COPY nginx.conf /etc/nginx/nginx.conf