FROM rust:1 as builder
WORKDIR /app
COPY . .
RUN rustup default nightly-2022-10-10
RUN cargo build


# FROM debian:buster-slim as runner
# COPY --from=builder /usr/local/cargo/bin/stop_and_search_app /usr/local/bin/stop_and_search_app
ENV ROCKET_ADDRESS=0.0.0.0
EXPOSE 8000
CMD ["cargo", "run"]