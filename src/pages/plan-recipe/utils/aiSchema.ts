export const recipeSchema = {
  type: "array",
  items: {
    properties: {
      name: {
        type: "string",
        description: "料理名",
      },
      total_time: {
        type: "string",
        description: "料理にかかる総時間（分単位で）",
      },
      steps: {
        type: "array",
        description: "料理の手順のグループ",
        items: {
          type: "object",
          properties: {
            group: {
              type: "string",
              description: "手順のグループ名（例：準備、調理、仕上げ）",
            },
            details: {
              type: "array",
              description: "グループ内の詳細な手順",
              items: {
                type: "object",
                properties: {
                  time: {
                    type: "string",
                    description: "この工程にかかる時間（分単位で）",
                  },
                  detail: {
                    type: "string",
                    description:
                      "この工程の詳細（具体的な手順、使用する調理器具や技法、温度、火加減、具体的な注意点などを含む）",
                  },
                  temperature: {
                    type: "string",
                    description: "調理時の温度（必要な場合）",
                  },
                  important_points: {
                    type: "string",
                    description: "具体的な注意点やコツ",
                  },
                },
                required: ["time", "detail"],
              },
            },
          },
          required: ["group", "details"],
        },
      },
      ingredients: {
        type: "array",
        description: "料理の食材一覧",
        items: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "食材名",
            },
            price: {
              type: "string",
              description: "食材の値段（円単位で）",
            },
            quantity: {
              type: "string",
              description: "食材の量（具体的な計量単位で）",
            },
          },
          required: ["name", "price", "quantity"],
        },
      },
      total_price: {
        type: "string",
        description: "この料理を作るのにかかる総費用（円単位で）",
      },
    },
    required: ["name", "total_time", "steps", "ingredients", "total_price"],
  },
};
