
# Build the React app
FROM node:16-alpine3.16 as node_builder
ARG GOOGLE_CLIENT_ID
WORKDIR /app
COPY ./web .
RUN yarn install
ENV REACT_APP_API=/api
ENV GENERATE_SOURCEMAP=false
ENV REACT_APP_GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID
RUN yarn build

# Build the Go API
FROM golang:1.18 as go_builder
WORKDIR /app
COPY ./api .
RUN go mod tidy
RUN CGO_ENABLED=0 GOOS=linux go build -v -o ./server

FROM alpine:3.14
WORKDIR /app
COPY --from=node_builder /app/build ./web/build
WORKDIR /app/api
COPY --from=go_builder /app/server .
ENV ENV=production
CMD ["./server"]
