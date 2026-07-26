import plotly.express as px
import json

# ==========================================
# PALETA FIXA (mesmos tokens Tailwind usados no site)
# ==========================================
BG_COLOR = "#ffffff"          # fundo branco, igual ao restante do site
GRID_COLOR = "#e2e8f0"        # slate-200 - linhas de grade sutis
TEXT_COLOR = "#0f172a"        # slate-900 - texto escuro (títulos, eixos, legendas)
MUTED_TEXT_COLOR = "#64748b"  # slate-500 - texto secundário (ticks)

# Gradiente seguindo as 4 cores dos cards de KPI do site, na mesma ordem:
# verde (Maior valor) -> azul (Menor valor) -> roxo (Média) -> laranja (Total de estados)
SITE_COLORSCALE = [
    [0.00, "#22c55e"],  # verde
    [0.33, "#3b82f6"],  # azul
    [0.66, "#a855f7"],  # roxo
    [1.00, "#f97316"],  # laranja
]

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
        color="value",          # Adiciona um gradiente de cor baseado no valor
        color_continuous_scale=SITE_COLORSCALE
    )
    
    # Garante que o eixo X mostre todos os nomes sem pular nenhum
    fig.update_xaxes(tickmode="linear")

    # Cores fixas, iguais às do site (fundo escuro, texto claro, grid sutil)
    fig.update_layout(
        paper_bgcolor=BG_COLOR,
        plot_bgcolor=BG_COLOR,
        font=dict(color=TEXT_COLOR),
        title=dict(font=dict(color=TEXT_COLOR, size=18)),
        xaxis=dict(
            gridcolor=GRID_COLOR,
            linecolor=GRID_COLOR,
            tickfont=dict(color=MUTED_TEXT_COLOR),
            title=dict(font=dict(color=MUTED_TEXT_COLOR)),
        ),
        yaxis=dict(
            gridcolor=GRID_COLOR,
            linecolor=GRID_COLOR,
            tickfont=dict(color=MUTED_TEXT_COLOR),
            title=dict(font=dict(color=MUTED_TEXT_COLOR)),
        ),
        coloraxis_colorbar=dict(
            title=dict(font=dict(color=TEXT_COLOR)),
            tickfont=dict(color=MUTED_TEXT_COLOR),
        ),
        legend=dict(font=dict(color=TEXT_COLOR)),
    )
    
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
