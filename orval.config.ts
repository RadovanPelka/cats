import { defineConfig } from "orval";

export default defineConfig({
  beApi: {
    input:
      "https://raw.githubusercontent.com/thatapicompany/apis/main/theCatAPI.com/thecatapi-oas.yaml",
    output: {
      target: "./src/api/catsApi.ts",
      client: "react-query",
      schemas: "./src/api/schemas",
      override: {
        mutator: {
          path: "./src/api/utils/custom-instance.ts",
          name: "customInstance",
        },
      },
    },
  },
});
