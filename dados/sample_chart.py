import json

# Importando o nosso ecossistema já pronto!
from ingestion import fetch_states, fetch_population, fetch_density
from cleaning import build_complete_df, calculate_kpis
from visualization import generate_dynamic_figure

def generate_sample_chart(tipo="densidade"):
    """
    Gera um gráfico estático JSON aproveitando a nossa arquitetura limpa.
    """
    print(f"--- Gerando amostra estática para: {tipo} ---")
    
    # Ingestão
    payload_estados = fetch_states()
    
    if tipo == "populacao":
        payload_indicador = fetch_population()
        nome_indicador = "População residente estimada"
        unidade = "Pessoas"
    elif tipo == "densidade":
        payload_indicador = fetch_density()
        nome_indicador = "Densidade demográfica"
        unidade = "Habitantes por km²"
    else:
        print("❌ Tipo inválido. Use 'populacao' ou 'densidade'.")
        return

    if not payload_indicador or not payload_estados:
        print("❌ Erro ao obter dados do IBGE.")
        return

    # Limpeza e KPIs 
    df_completo = build_complete_df(payload_indicador, payload_estados)
    df_filtrado, kpis = calculate_kpis(df_completo, target_region="BR")

    # Geração da Figura Dinâmica
    figura_json_string = generate_dynamic_figure(df_filtrado, nome_indicador, unidade)
    
    # Converte a string devolvida pelo Plotly para um dicionário Python
    figura_dict = json.loads(figura_json_string)

    # Monta e salva 
    resultado = {
        "figura": figura_dict,
        "kpis": kpis
    }

    # Define o nome do arquivo dinamicamente baseado no 'tipo'
    nome_arquivo = f"amostra_{tipo}.json"

    with open(nome_arquivo, "w", encoding="utf-8") as f:
        json.dump(resultado, f, ensure_ascii=False, indent=2)

    print(f"✅ Sucesso! Arquivo '{nome_arquivo}' gerado com os dados de {nome_indicador}!\n")


if __name__ == "__main__":
    # Gera os dois arquivos de uma vez só com um único clique!
    generate_sample_chart(tipo="populacao")
    generate_sample_chart(tipo="densidade")