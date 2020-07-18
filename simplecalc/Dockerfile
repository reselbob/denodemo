FROM aredwood/deno:latest
COPY app.ts .
COPY calculator.ts .
COPY routes.ts .
EXPOSE 7700
CMD ["deno", "run", "--allow-env","  --allow-net", "app.ts"]

