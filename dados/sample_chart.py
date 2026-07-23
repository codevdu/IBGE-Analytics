import json
import pandas as pd
import plotly.express as px

from ingestion import fetch_indicator


def generate_sample_chart():
    """
    Gera um gráfico utilizando os dados reais do IBGE
    e exporta um JSON no padrão esperado pelo Fullstack.
    """

    # Mesmo indicador usado no teste da ingestão
    dados = fetch_indicator("6579", "9324", "-1")

    if dados is None:
        print("Erro ao obter dados do IBGE.")
        return

    # ================================
    # Converte o JSON do IBGE para DataFrame
    # ================================
    series = dados[0]["resultados"][0]["series"]

    registros = []

    for estado in series:
        nome = estado["localidade"]["nome"]

        # Pega o único valor existente da série
        valor = list(estado["serie"].values())[0]

        if valor == "...":
            continue

        registros.append({
            "Estado": nome,
            "Valor": float(valor.replace(",", "."))
        })

    df = pd.DataFrame(registros)

    print(df.head())

    # ================================
    # Gráfico Plotly
    # ================================
    fig = px.bar(
        df,
        x="Estado",
        y="Valor",
        title="Indicador por Estado"
    )

    # ================================
    # KPIs
    # ================================
    maior = df.loc[df["Valor"].idxmax()]
    menor = df.loc[df["Valor"].idxmin()]

    resultado = {
        "figura": json.loads(fig.to_json()),
        "kpis": {
            "total": len(df),
            "maior": {
                "nome": maior["Estado"],
                "valor": maior["Valor"]
            },
            "menor": {
                "nome": menor["Estado"],
                "valor": menor["Valor"]
            },
            "media": round(df["Valor"].mean(), 2)
        }
    }

    with open("amostra_grafico.json", "w", encoding="utf-8") as f:
        json.dump(resultado, f, ensure_ascii=False, indent=2)

    print("Arquivo 'amostra_grafico.json' gerado com sucesso!")


if __name__ == "__main__":
    generate_sample_chart()