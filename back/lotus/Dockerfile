FROM filecoin/lotus:v1.20.4

COPY ./config.toml ~/.lotus/config.toml

ENV FULLNODE_API_INFO=wss://wss.hyperspace.node.glif.io/apigw/lotus

EXPOSE $LOTUS_PORT

ENTRYPOINT [ "" ]

# CMD ["cat", "~/.lotus/config.toml"]
CMD ["lotus",  "daemon", "--lite"]