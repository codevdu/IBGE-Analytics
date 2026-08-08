from fastapi import FastAPI, HTTPException
import json

# Importando os arquivos do ecossistema já pronto (dados/ingestion.py, dados/cleaning.py, dados/visualization.py)
from ingestion import fetch_states, fetch_population, fetch_density
from cleaning import build_complete_df, calculate_kpis
from visualization import generate_dynamic_figure

app = FastAPI(title="IBGE Analytics API")

@app.get("/grafico")
def get_grafico(indicador: str, regiao: str = "Brasil"):
    """
    Endpoint que executa: ingestão -> limpeza -> agregação -> figura
    """
    # Ingestão (via cache das funções)
    payload_estados = fetch_states()
    
    if indicador.lower() == "populacao":
        payload_indicador = fetch_population()
        nome_indicador = "População residente (Censo 2010)"
        unidade = "Pessoas"
    elif indicador.lower() == "densidade":
        payload_indicador = fetch_density()
        nome_indicador = "Densidade demográfica"
        unidade = "Habitantes por km²"
    else:
        raise HTTPException(status_code=400, detail="Indicador inválido. Use 'populacao' ou 'densidade'.")

    if not payload_indicador or not payload_estados:
         raise HTTPException(status_code=500, detail="Erro ao buscar dados do IBGE.")

    # Limpeza
    try:
        df_completo = build_complete_df(payload_indicador, payload_estados)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao limpar/cruzar dados do IBGE: {e}")

    regiao_filtro = "BR" if regiao.lower() == "brasil" else regiao

    # Agregação e KPIs
    try:
        df_filtrado, kpis = calculate_kpis(df_completo, target_region=regiao_filtro)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

    # Figura
    try:
        figura_json_string = generate_dynamic_figure(df_filtrado, nome_indicador, unidade)
        # transforma a string do Plotly de volta em dicionário
        # para o FastAPI não encadear o JSON como uma string gigante textualmente
        figura_dict = json.loads(figura_json_string)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao gerar a figura: {e}")

    # Retorno EXATAMENTE no formato do contrato exigido
    return {
        "figura": figura_dict,
        "kpis": kpis
    }
