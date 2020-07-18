FROM ubuntu

RUN apt-get update && apt-get install curl zip unzip -y

ENV HOME /home/deno

RUN adduser --uid 1000 --home $HOME --shell /bin/bash --user-group deno

RUN chown -R deno /deno-entrypoint
RUN chown -R deno /scripts
RUN chmod a+rwx $HOME

USER 1000:1000

RUN curl -fsSL https://deno.land/x/install/install.sh | sh

ENV DENO_INSTALL /$HOME/.deno
ENV PATH $DENO_INSTALL/bin:$PATH

WORKDIR /app

COPY app.ts /app
COPY calculator.ts /app
COPY routes.ts /app
EXPOSE 7700
CMD ["deno", "run", "--allow-env","--allow-net", "/app/app.ts"]

