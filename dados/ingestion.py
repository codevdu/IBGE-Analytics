import requests
import json

def fetch_sample_indicator(aggregate, variable, period):
    """
    Faz a requisição real ao IBGE, mas puxando apenas uma amostra fixa.
    N3 indica que queremos no nível de Estado.
    """
    # Amostra fixa de 4 estados: Ceará (23), Pernambuco (26), Piauí (22) e São Paulo (35)
    sample_ids = "23,26,22,35" # Para puxar todos os estados, usar "all"
    
    # Montando a URL injetando os IDs da amostra
    url = (f"https://servicodados.ibge.gov.br/api/v3/agregados/{aggregate}"
           f"/periodos/{period}/variaveis/{variable}?localidades=N3[{sample_ids}]")
    
    print(f"Fazendo requisição para: {url}")
    response = requests.get(url, timeout=30)
    
    # Retorna o JSON cru
    return response.json()

def fetch_states():
    """
    Traz a lista de todos os estados para cruzar as regiões depois.
    """
    url = "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome"
    response = requests.get(url, timeout=30)
    return response.json()

# ==========================================
# TESTE DO CARTÃO
# ==========================================
if __name__ == "__main__":
    print("Iniciando teste de ingestão de amostra...\n")
    
    # Agregado 6579, Variável 9324, Período -1 (População - Último ano)
    sample_data = fetch_sample_indicator("6579", "9324", "-1")
    
    print("\nResultado da requisição:")
    print(json.dumps(sample_data, indent=2, ensure_ascii=False))