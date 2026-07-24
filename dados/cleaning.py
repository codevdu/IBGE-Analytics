import pandas as pd
import numpy as np

from ingestion import fetch_states, fetch_population, fetch_density

# ==========================================
# FUNÇÕES DE LIMPEZA E TRANSFORMAÇÃO: Código feito por Mateus e adaptado por Alice
# ==========================================

def json_to_df(payload):
    """
    Transforma o JSON bruto do indicador do IBGE em um DataFrame limpo.
    """
    resultados = payload[0]["resultados"]
    series = resultados[0]["series"]
    
    rows = []
    faltantes = {"...", "-", "..", "X", "", None}
    
    for item in series:
        name = item["localidade"]["nome"]
        uf_id = int(item["localidade"]["id"])
        
        itens = list(item["serie"].items())
        if not itens:
            continue
            
        ano, valor_bruto = itens[-1]
        
        if valor_bruto in faltantes:
            valor = np.nan
        else:
            try:
                valor = float(str(valor_bruto).replace(",", "."))
            except (TypeError, ValueError):
                valor = np.nan
                
        rows.append({"uf_id": uf_id, "name": name, "year": ano, "value": valor})
        
    df = pd.DataFrame(rows, columns=["uf_id", "name", "year", "value"])
    df["value"] = pd.to_numeric(df["value"], errors="coerce")
    
    # Remove as linhas vazias e reseta o índice
    df = df.dropna(subset=["value"]).reset_index(drop=True)
    return df


def build_region_dict(payload_states):
    """
    Monta dicionário {uf_id: regiao_sigla} a partir do endpoint
    Cria um dicionário de mapeamento rápido e eficiente.
    """
    region_dict = {
        int(estado["id"]): estado["regiao"]["sigla"]
        for estado in payload_states
    }
    return region_dict


def add_region_column(df_indicator, region_dict):
    """
    Criar coluna regiao no DataFrame principal
    Validar que nenhum estado ficou sem região atribuída
    """
    df = df_indicator.copy()
    
    # Usa o dicionário para mapear a região com base no uf_id
    df["region"] = df["uf_id"].map(region_dict)
    
    # Validação de segurança 
    missing_regions = df[df["region"].isna()]
    if not missing_regions.empty:
        raise ValueError(f"Erro: Estados sem região encontrada: {missing_regions['name'].tolist()}")
        
    return df


def build_complete_df(payload_indicator, payload_states):
    """
    Orquestrador atualizado: usa a estratégia de dicionário.
    """
    df_indicator = json_to_df(payload_indicator)
    region_dict = build_region_dict(payload_states)
    
    return add_region_column(df_indicator, region_dict)

# ==========================================
# FUNÇÕES DE LIMPEZA E TRANSFORMAÇÃO: feito por Alice
# ==========================================

def calculate_kpis(df, target_region=None):
    """
    Filtra o DataFrame por região, ordena os valores e calcula os KPIs principais.
    """
    # Filtra DataFrame por região (ou manter todos se Brasil)
    if target_region and target_region.upper() != "BR":
        df_filtered = df[df["region"] == target_region.upper()].copy()
    else:
        df_filtered = df.copy()
        
    # Prevenção contra filtros que retornem tabelas vazias
    if df_filtered.empty:
        raise ValueError(f"Nenhum dado encontrado para a região: {target_region}")
        
    #Ordena do maior para o menor valor
    df_filtered = df_filtered.sort_values(by="value", ascending=False).reset_index(drop=True)
    
    # Calcula o total, maior, menor e media usando Pandas
    kpis = {
        "total": len(df_filtered),
        "maior": {
            "nome": df_filtered.iloc[0]["name"],
            "valor": df_filtered.iloc[0]["value"]
        },
        "menor": {
            "nome": df_filtered.iloc[-1]["name"],
            "valor": df_filtered.iloc[-1]["value"]
        },
        "media": round(df_filtered["value"].mean(), 2)
    }
    
    return df_filtered, kpis

# ==========================================
# SUÍTE DE TESTES (MOCKS)
# ==========================================
if __name__ == "__main__":
    
    # Dados falsos para testar sem precisar da internet
    MOCK_POPULATION = [
        {
            "id": "9324",
            "resultados": [
                {
                    "series": [
                        {"localidade": {"id": "23", "nome": "Ceará"}, "serie": {"2021": "9240580"}},
                        {"localidade": {"id": "35", "nome": "São Paulo"}, "serie": {"2021": "46649132"}},
                        {"localidade": {"id": "16", "nome": "Amapá"}, "serie": {"2021": "..."}},
                        {"localidade": {"id": "17", "nome": "Tocantins"}, "serie": {"2021": "-"}},
                    ]
                }
            ],
        }
    ]

    MOCK_STATES = [
        {"id": "23", "sigla": "CE", "nome": "Ceará", "regiao": {"id": 2, "sigla": "NE", "nome": "Nordeste"}},
        {"id": "35", "sigla": "SP", "nome": "São Paulo", "regiao": {"id": 3, "sigla": "SE", "nome": "Sudeste"}},
        {"id": "16", "sigla": "AP", "nome": "Amapá", "regiao": {"id": 1, "sigla": "N", "nome": "Norte"}},
        {"id": "17", "sigla": "TO", "nome": "Tocantins", "regiao": {"id": 1, "sigla": "N", "nome": "Norte"}},
    ]

    print("--- RODANDO TESTES LOCAIS ---")
    
    # Teste 1: Limpeza descartou os faltantes?
    df_teste = json_to_df(MOCK_POPULATION)
    assert len(df_teste) == 2, "Erro: Faltantes não descartados!"
    print("✅ Faltantes descartados corretamente.")
    
    # Teste 2: Join das regiões funcionou?
    df_completo = build_complete_df(MOCK_POPULATION, MOCK_STATES)
    sp_region = df_completo[df_completo["name"] == "São Paulo"]["region"].iloc[0]
    assert sp_region == "SE", "Erro no cruzamento de regiões!"
    print("✅ Cruzamento de regiões (Merge) bem sucedido.")
    
    print("\n🎉 Todos os testes passaram! Pipeline de limpeza pronto.")

# ==========================================
# TESTE DE INTEGRAÇÃO (PONTA A PONTA) feito por Alice
# ==========================================
if __name__ == "__main__":
    from ingestion import fetch_states, fetch_population
    
    print("--- INICIANDO TESTE PONTA A PONTA COM DADOS REAIS ---")
    print("1. Buscando dados ao vivo na API do IBGE...")
    
    payload_pop = fetch_population()
    payload_states = fetch_states()
    
    if not payload_pop or not payload_states:
        print("❌ Erro: Falha ao comunicar com a API do IBGE.")
    else:
        print("2. Limpando, cruzando regiões e calculando KPIs...")
        
        # Monta o DataFrame completo com os dados reais
        df_completo = build_complete_df(payload_pop, payload_states)
        
        # --- VALIDAÇÃO 1: BRASIL INTEIRO ---
        df_br, kpis_br = calculate_kpis(df_completo, target_region="BR")
        
        print("\n📊 [CENÁRIO 1: BRASIL (POPULAÇÃO)]")
        print(f"Total de Estados válidos: {kpis_br['total']} (Esperado: 27)")
        print(f"Maior: {kpis_br['maior']['nome']} com {kpis_br['maior']['valor']} habitantes")
        print(f"Menor: {kpis_br['menor']['nome']} com {kpis_br['menor']['valor']} habitantes")
        print(f"Média Nacional: {kpis_br['media']}")
        
        # --- VALIDAÇÃO 2: REGIÃO NORDESTE ---
        df_ne, kpis_ne = calculate_kpis(df_completo, target_region="NE")
        
        print("\n🌴 [CENÁRIO 2: REGIÃO NORDESTE (POPULAÇÃO)]")
        print(f"Total de Estados válidos: {kpis_ne['total']} (Esperado: 9)")
        print(f"Maior: {kpis_ne['maior']['nome']} com {kpis_ne['maior']['valor']} habitantes")
        print(f"Menor: {kpis_ne['menor']['nome']} com {kpis_ne['menor']['valor']} habitantes")
        print(f"Média Regional: {kpis_ne['media']}")
        
        print("\n✅ Sucesso! Validação manual ponta a ponta pronta para conferência.")

# ==========================================
# SUÍTE DE TESTES E VALIDAÇÃO MANUAL DE KPIs
# ==========================================
if __name__ == "__main__":
    
    MOCK_POPULATION = [
        {"id": "9324", "resultados": [{"series": [
            {"localidade": {"id": "23", "nome": "Ceará"}, "serie": {"2021": "9240580"}},
            {"localidade": {"id": "35", "nome": "São Paulo"}, "serie": {"2021": "46649132"}},
            {"localidade": {"id": "16", "nome": "Amapá"}, "serie": {"2021": "850000"}},
            {"localidade": {"id": "17", "nome": "Tocantins"}, "serie": {"2021": "1600000"}},
        ]}]}
    ]

    MOCK_STATES = [
        {"id": "23", "sigla": "CE", "nome": "Ceará", "regiao": {"id": 2, "sigla": "NE", "nome": "Nordeste"}},
        {"id": "35", "sigla": "SP", "nome": "São Paulo", "regiao": {"id": 3, "sigla": "SE", "nome": "Sudeste"}},
        {"id": "16", "sigla": "AP", "nome": "Amapá", "regiao": {"id": 1, "sigla": "N", "nome": "Norte"}},
        {"id": "17", "sigla": "TO", "nome": "Tocantins", "regiao": {"id": 1, "sigla": "N", "nome": "Norte"}},
    ]

    print("--- INICIANDO CONFERÊNCIA CRUZADA ---")
    
    # 1. Prepara a base
    df_completo = build_complete_df(MOCK_POPULATION, MOCK_STATES)
    
    # 2. Testa cenário 1: Todo o Brasil (BR)
    df_br, kpis_br = calculate_kpis(df_completo, target_region="BR")
    print("\n[CENÁRIO BRASIL]")
    print(f"Total de Estados: {kpis_br['total']} (Esperado: 4)")
    print(f"Maior: {kpis_br['maior']['nome']} com {kpis_br['maior']['valor']} (Esperado: São Paulo)")
    print(f"Menor: {kpis_br['menor']['nome']} com {kpis_br['menor']['valor']} (Esperado: Amapá)")
    
    # 3. Testa cenário 2: Filtro Regional (Norte)
    df_norte, kpis_norte = calculate_kpis(df_completo, target_region="N")
    print("\n[CENÁRIO REGIÃO NORTE]")
    print(f"Total de Estados: {kpis_norte['total']} (Esperado: 2)")
    print(f"Maior: {kpis_norte['maior']['nome']} com {kpis_norte['maior']['valor']} (Esperado: Tocantins)")
    print(f"Média da Região Norte: {kpis_norte['media']} (Esperado: 1225000.0)")