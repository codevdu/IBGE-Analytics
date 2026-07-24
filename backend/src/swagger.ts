export const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "IBGE Analytics API",
    version: "1.0.0",
    description: "Documentação da API de integração com dados do IBGE para o painel de análise."
  },
  servers: [
    {
      url: "http://localhost:3333",
      description: "Servidor Local"
    },
    {
      url: `${process.env.BACKEND_URL}`,
      description: "Servidor Na Nuvem"
    }
  ],
  paths: {
    "/api/states": {
      get: {
        summary: "Listar estados brasileiros",
        description: "Busca a lista de estados do IBGE com seus IDs, siglas, nomes e região, ordenados por nome.",
        responses: {
          "200": {
            description: "Sucesso na listagem de estados",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/StateDto"
                  }
                }
              }
            }
          },
          "500": {
            description: "Erro interno do servidor",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/dashboard": {
      get: {
        summary: "Obter dados do dashboard",
        description: "Retorna o JSON com os dados do gráfico Plotly e as KPIs associadas para renderização do painel.",
        parameters: [
          {
            name: "indicador",
            in: "query",
            required: true,
            description: "Identificador do indicador a ser buscado (ex: populacao)",
            schema: {
              type: "string"
            }
          },
          {
            name: "regiao",
            in: "query",
            required: true,
            description: "Região do país ou 'Brasil' para dados consolidados",
            schema: {
              type: "string",
              enum: ["Brasil", "N", "NE", "SE", "S", "CO"]
            }
          }
        ],
        responses: {
          "200": {
            description: "Sucesso na obtenção dos dados",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/DashboardResponse"
                }
              }
            }
          },
          "400": {
            description: "Parâmetros indicador ou regiao ausentes",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse"
                }
              }
            }
          },
          "404": {
            description: "Nenhum dado encontrado para a combinação selecionada",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/NotFoundResponse"
                }
              }
            }
          },
          "500": {
            description: "Erro ao conectar com o serviço Python ou outra falha",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/PythonServiceErrorResponse"
                }
              }
            }
          }
        }
      }
    }
  },
  components: {
    schemas: {
      StateDto: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            example: 11
          },
          initials: {
            type: "string",
            example: "RO"
          },
          name: {
            type: "string",
            example: "Rondônia"
          },
          region: {
            type: "string",
            example: "N"
          }
        },
        required: ["id", "initials", "name", "region"]
      },
      ErrorResponse: {
        type: "object",
        properties: {
          message: {
            type: "string",
            example: "Erro ao buscar estados: erro de rede"
          }
        },
        required: ["message"]
      },
      NotFoundResponse: {
        type: "object",
        properties: {
          message: {
            type: "string",
            example: "Nenhum dado encontrado para a combinação selecionada."
          },
          emptyData: {
            type: "boolean",
            example: true
          }
        },
        required: ["message", "emptyData"]
      },
      PythonServiceErrorResponse: {
        type: "object",
        properties: {
          message: {
            type: "string",
            example: "Erro ao conectar com o serviço Python."
          },
          detail: {
            type: "string",
            example: "connect ECONNREFUSED 127.0.0.1:8000"
          }
        },
        required: ["message"]
      },
      DashboardResponse: {
        type: "object",
        properties: {
          figura: {
            type: "object",
            description: "Dados do gráfico estruturado no formato JSON Plotly",
            properties: {
              data: {
                type: "array",
                items: {
                  type: "object"
                }
              },
              layout: {
                type: "object"
              }
            },
            required: ["data", "layout"]
          },
          kpis: {
            type: "object",
            properties: {
              total: {
                type: "integer",
                example: 27
              },
              maior: {
                type: "object",
                properties: {
                  nome: {
                    type: "string",
                    example: "São Paulo"
                  },
                  valor: {
                    type: "number",
                    example: 46081801
                  }
                },
                required: ["nome", "valor"]
              },
              menor: {
                type: "object",
                properties: {
                  nome: {
                    type: "string",
                    example: "Roraima"
                  },
                  valor: {
                    type: "number",
                    example: 738772
                  }
                },
                required: ["nome", "valor"]
              },
              media: {
                type: "number",
                example: 7904482.85
              }
            },
            required: ["total", "maior", "menor", "media"]
          }
        },
        required: ["figura", "kpis"]
      }
    }
  }
}
