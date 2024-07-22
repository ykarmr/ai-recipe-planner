export const recipeSchema = {
  type: "array",
  items: {
    properties: {
      name: {
        type: "string",
        description: "料理名",
      },
      time: {
        type: "string",
        description: "料理時間",
      },
      steps: {
        type: "array",
        description: "料理の手順",
        items: {
          type: "object",
          properties: {
            time: {
              type: "string",
              description: "この工程にかかる時間",
            },
            detail: {
              type: "string",
              description: "この工程の内容を詳細に単位なども含めて書く",
            },
          },
          required: ["time", "detail"],
        },
      },
      ingredients: {
        type: "array",
        description: "料理の食材の一覧",
        items: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "食材名",
            },
            price: {
              type: "string",
              description: "食材の値段",
            },
            quantity: {
              type: "string",
              description: "食材の量",
            },
          },
          required: ["name", "price", "quantity"],
        },
      },
      price: {
        type: "string",
        description: "この料理を作るのにかかる値段",
      },
    },
    required: ["name", "time", "steps", "ingredients"],
  },
};
