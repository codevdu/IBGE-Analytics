import pandas as pd
import plotly.express as px

def generate_sample_chart():
    # Montar um DataFrame simples (usando os nossos 4 estados da amostra)
    data = {
        "Estado": ["Ceará", "Pernambuco", "Piauí", "São Paulo"],
        "Populacao": [9240000, 9539000, 3271000, 46024000] # Valores aproximados
    }
    df = pd.DataFrame(data)
    
    print("DataFrame Simples criado com sucesso:\n")
    print(df)
    print("-" * 40)

    # Montar fig = px.bar(...)
    fig = px.bar(
        df, 
        x="Estado", 
        y="Populacao", 
        title="População por Estado (Amostra Fixa)",
        color="Estado"
    )

    # Exportar fig.to_json()
    # Pega toda a parte visual do gráfico e transforma em texto JSON
    grafico_json = fig.to_json()

    # Salva esse JSON em um arquivo físico
    nome_arquivo = "amostra_grafico.json"
    with open(nome_arquivo, "w", encoding="utf-8") as f:
        f.write(grafico_json)

    print(f"\nSucesso! O arquivo '{nome_arquivo}' foi gerado na sua pasta.")

if __name__ == "__main__":
    generate_sample_chart()