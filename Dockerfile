# Just your usual static Astro app being served by node
# The docs say you should be using something like Nginx to serve static files.
# With a minimal node image, we can ship smaller Docker containers than with Nginx, with performance loss.
# Node shouldn't be used in production to serve static files, in this scenario our container is behind Cloudflare, where they do most of the heavy lifting for us.

# Image where Node 18 (LTS) alpine + git + ssh is installed, perfect for a basic dev environment.
FROM timbru31/node-alpine-git:hydrogen AS deps
WORKDIR /home/nodejs/app

ENV PNPM_HOME=/home/nodejs/.local/share/pnpm
ENV PATH=$PATH:$PNPM_HOME

RUN mkdir -p /home/nodejs/app/node_modules


RUN apk add --no-cache bash
# see https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine
RUN apk add --no-cache libc6-compat

SHELL ["bash", "-c"]
WORKDIR /home/nodejs/app


# Install PNPM for dependencies, by no means is this a normal install 

RUN wget -qO /bin/pnpm "https://github.com/pnpm/pnpm/releases/latest/download/pnpm-linuxstatic-x64" && chmod +x /bin/pnpm
RUN mkdir -p /home/nodejs/.pnpm-store 
RUN mkdir -p /home/nodejs/.pnpm-global
RUN pnpm config set store-dir /home/nodejs/.pnpm-store

COPY . .
RUN CYPRESS_INSTALL_BINARY=0 HUSKY=0 pnpm install

RUN pnpm build

# Just a reminder, pnpm and all the other stuff from the previous stage no longer exists at this step -- providing a seamless final image for the end user.
FROM nginx:stable-alpine-slim AS runner

COPY  --from=deps /home/nodejs/app/dist /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 3000

ENV PORT 3000

RUN nginx -t

CMD ["nginx"]
