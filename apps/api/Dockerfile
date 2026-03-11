FROM node:20-alpine AS base
# Install necessary dependencies including openssl for Prisma
RUN apk add --no-cache libc6-compat openssl
RUN corepack enable pnpm

FROM base AS builder
WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune api --docker

FROM base AS installer
WORKDIR /app
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --frozen-lockfile

COPY --from=builder /app/out/full/ .
# Generate Prisma Client specifically
RUN cd apps/api && npx prisma generate
RUN pnpm turbo run build --filter=api...

FROM base AS runner
WORKDIR /app
COPY --from=installer /app .
WORKDIR /app/apps/api
EXPOSE 3001 5555
CMD ["sh", "-c", "npx prisma generate && npx prisma db push && (npx prisma studio --port 5555 &) && npm run start:prod"]
