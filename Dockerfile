FROM golang:1.18

WORKDIR /app

COPY go.* ./
RUN go mod tidy

COPY . ./

RUN go build -v -o server
CMD ["./server"]