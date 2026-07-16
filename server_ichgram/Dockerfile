FROM node:24-alpine AS production
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
EXPOSE 3333
CMD ["npm", "start"]