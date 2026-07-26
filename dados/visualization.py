import json
import pandas as pd
import plotly.express as px

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
    )

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

    fig.update_xaxes(
        tickangle=-45,
        tickmode="linear",
        showgrid=False,
        linecolor="#334155",
        tickfont=dict(color="#cbd5e1"),
        zeroline=False,
        title_standoff=12,
    )

    fig.update_yaxes(
        showgrid=True,
        gridcolor="rgba(255,255,255,0.08)",
        zeroline=False,
        linecolor="#334155",
        tickfont=dict(color="#cbd5e1"),
        title_standoff=10,
    )

    print(f"[figura] {indicator_name}: {len(df_sorted)} barra(s) geradas")

    return json.loads(fig.to_json())
