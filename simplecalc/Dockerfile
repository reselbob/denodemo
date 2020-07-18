FROM ubuntu

RUN curl -fsSL https://deno.land/x/install/install.sh | sh

ENV DENO_INSTALL /$HOME/.deno
ENV PATH $DENO_INSTALL/bin:$PATH

COPY app.ts .
COPY calculator.ts .
COPY routes.ts .
EXPOSE 7700
CMD ["deno", "run", "--allow-env","--allow-net", "app.ts"]

