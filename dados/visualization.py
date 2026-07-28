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
    # Converte a coluna de texto para números reais
    df_filtered["value"] = pd.to_numeric(df_filtered["value"])

    # Ordenação decrescente (maior valor primeiro, como na imagem)
    df_sorted = df_filtered.sort_values("value", ascending=False)

    fig = px.bar(
        df_sorted,
        x="name",
        y="value",
        color="value",
        color_continuous_scale="Viridis",
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

    fig.update_traces(marker_line_width=0)

    fig.update_layout(
        template="plotly_dark",
        title=dict(
            text=f"{indicator_name} - {len(df_sorted)} estados",
            x=0.02,
            xanchor="left",
            font=dict(size=18, color="#f8fafc")
        ),
        font=dict(family="Inter, sans-serif", color="#e2e8f0"),
        paper_bgcolor="#0d1117",
        plot_bgcolor="#0d1117",
        bargap=0.2,
        margin=dict(l=50, r=140, t=70, b=90),
        coloraxis_colorbar=dict(
            title=dict(
                text=f"{indicator_name} ({unit})",
                side="top",                 # <- título na horizontal, como na imagem
                font=dict(size=12, color="#e2e8f0")
            ),
            tickfont=dict(color="#cbd5e1"),
            thickness=16,
            len=0.7,
            x=1.03,
            y=0.5,
            xanchor="left",
            outlinewidth=0,
            bordercolor="rgba(255,255,255,0.08)",
        ),
        showlegend=False,
    )
    
