import pandas as pd
import plotly.express as px

# ==========================================
# PALETA FIXA (mesmos tokens Tailwind usados no site)
# ==========================================
BG_COLOR = "#f8fafc"          # fundo (slate-50), igual ao restante do site
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
    # Converte a coluna de texto para números reais (proteção extra)
    df_filtered = df_filtered.copy()
    df_filtered["value"] = pd.to_numeric(df_filtered["value"])

    # Ordenação decrescente (maior valor primeiro)
    df_sorted = df_filtered.sort_values("value", ascending=False)

    # Rótulo curto (sigla da UF) para caber melhor no eixo X, com fallback
    # pro nome completo caso a coluna 'sigla' não exista (ex: testes locais).
    eixo_x = "sigla" if "sigla" in df_sorted.columns else "name"

    fig = px.bar(
        df_sorted,
        x=eixo_x,
        y="value",
        color="value",  # gradiente de cor baseado no valor
        color_continuous_scale=SITE_COLORSCALE,
        hover_name="name",  # nome completo aparece ao tocar/passar o mouse
    )

    fig.update_traces(marker_line_width=0)

    # Rótulos do eixo X: ângulo fixo + automargin, pra não sobrepor
    # e pra o Plotly reservar espaço automaticamente (essencial no mobile)
    fig.update_xaxes(
        tickmode="linear",
        automargin=True,
    )
    fig.update_yaxes(automargin=True)

    fig.update_layout(
        paper_bgcolor=BG_COLOR,
        plot_bgcolor=BG_COLOR,
        font=dict(color=TEXT_COLOR),
        bargap=0.2,
        # Sem margens fixas em pixels: automargin cuida disso e evita
        # que o gráfico "vaze" pra fora da tela em telas estreitas.
        margin=dict(l=10, r=10, t=10, b=10),
        xaxis=dict(
            gridcolor=GRID_COLOR,
            linecolor=GRID_COLOR,
            tickfont=dict(color=MUTED_TEXT_COLOR),
            title=None,
        ),
        yaxis=dict(
            gridcolor=GRID_COLOR,
            linecolor=GRID_COLOR,
            tickfont=dict(color=MUTED_TEXT_COLOR),
            title=None,
        ),
        # Colorbar removida: numa tela estreita ela ocupa um espaço fixo
        # que empurra o gráfico pra fora da área visível (era a causa
        # do corte no celular). A cor já é redundante com a altura da barra.
        coloraxis_showscale=False,
        showlegend=False,
    )

    # Exporta via fig.to_json()
    fig_json = fig.to_json()

    return fig_json


if __name__ == "__main__":
    print("--- TESTANDO GERAÇÃO DA FIGURA ---")
    df_mock = pd.DataFrame({
        "name": ["São Paulo", "Rio de Janeiro", "Ceará", "Roraima"],
        "value": [46000000, 17000000, 9000000, 600000],
    })
    resultado = generate_dynamic_figure(df_mock, "População residente (Censo 2010)", "Pessoas")
    assert resultado.startswith("{")
    print("✅ Sucesso! Gráfico gerado e convertido para JSON com formato válido do Plotly.")
    print(f"Tamanho do payload JSON gerado: {len(resultado)} caracteres.")
