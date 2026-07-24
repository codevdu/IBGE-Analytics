import plotly.express as px
import json

# ==========================================
# GERAÇÃO DE GRÁFICOS (PLOTLY)
# ==========================================

def generate_dynamic_figure(df_filtered, indicator_name, unit):
    """
    Gera um gráfico de barras dinâmico usando o DataFrame filtrado 
    e exporta a figura no formato JSON.
    """
    
    # Título dinâmico com nome do indicador e contagem de estados
    state_count = len(df_filtered)
    dynamic_title = f"{indicator_name} - {state_count} estados"
    
    # px.bar construído a partir do DataFrame agregado
    # Ele não tem número fixo de barras (se adapta ao filtro)
    # Rótulos dos eixos claros
    fig = px.bar(
        df_filtered,
        x="name",
        y="value",
        title=dynamic_title,
        labels={
            "name": "Estado",
            "value": f"{indicator_name} ({unit})"
        },
        template="plotly_dark", # Tema escuro
        color="value",          # Adiciona um gradiente de cor baseado no valor
        color_continuous_scale="Viridis" 
    )
    
    # Garante que o eixo X mostre todos os nomes sem pular nenhum
    fig.update_xaxes(tickmode="linear")
    
    # Exporta via fig.to_json()
    fig_json = fig.to_json()
    
    return fig_json


# ==========================================
# TESTE ISOLADO DE GERAÇÃO DE FIGURA
# ==========================================
if __name__ == "__main__":
    import pandas as pd
    
    # Mock simples já ordenado (simulando a saída do calculate_kpis)
    mock_df = pd.DataFrame([
        {"name": "São Paulo", "value": 46649132.0},
        {"name": "Ceará", "value": 9240580.0},
        {"name": "Tocantins", "value": 1600000.0},
        {"name": "Amapá", "value": 850000.0}
    ])
    
    print("--- TESTANDO GERAÇÃO DA FIGURA ---")
    
    json_output = generate_dynamic_figure(
        df_filtered=mock_df, 
        indicator_name="População residente estimada", 
        unit="Pessoas"
    )
    
    # Verifica se a string retornada é um JSON válido e tem as configurações do Plotly
    if isinstance(json_output, str) and "data" in json_output and "layout" in json_output:
        print("✅ Sucesso! Gráfico gerado e convertido para JSON com formato válido do Plotly.")
        print(f"Tamanho do payload JSON gerado: {len(json_output)} caracteres.")
    else:
        print("❌ Erro na conversão do gráfico.")