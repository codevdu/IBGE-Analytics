import requests
import json

#Codigo antigo do cartão de ingestão, que puxa apenas uma amostra fixa de 4 estados.
"""
def fetch_sample_indicator(aggregate, variable, period):
    #Faz a requisição real ao IBGE, mas puxando apenas uma amostra fixa.
    #N3 indica que queremos no nível de Estado.
    
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
    
    #Traz a lista de todos os estados para cruzar as regiões depois.
    
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
"""

def fetch_indicator(aggregate, variable, period):
    """
    Busca os dados de um indicador para TODOS os estados.
    Utilizamos 'all' no nível N3 (Estados).
    """
    url = (f"https://servicodados.ibge.gov.br/api/v3/agregados/{aggregate}"
           f"/periodos/{period}/variaveis/{variable}?localidades=N3[all]")
    
    print(f"Buscando dados na URL: {url}")
    
    try:
        # Adicionado timeout de 30 segundos
        response = requests.get(url, timeout=30)
        
        # Levanta um erro se o status HTTP não for 200 (OK)
        response.raise_for_status() 
        
        return response.json()
        
    except requests.exceptions.Timeout:
        print("Erro: O tempo limite da requisição (timeout) estourou.")
        return None
    except requests.exceptions.RequestException as e:
        print(f"Erro de conexão ou requisição: {e}")
        return None

def fetch_states():
    """
    Traz a lista de todos os estados com região de cada UF.
    """
    url = "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome"
    print(f"Buscando lista de estados na URL: {url}")
    
    try:
        response = requests.get(url, timeout=30)
        response.raise_for_status()
        return response.json()
        
    except requests.exceptions.Timeout:
        print("Erro: O tempo limite (timeout) estourou ao buscar os estados.")
        return None
    except requests.exceptions.RequestException as e:
        print(f"Erro na requisição de estados: {e}")
        return None

# ==========================================
# TESTE DO CARTÃO (NÍVEL 2 - INGESTÃO COMPLETA)
# ==========================================
if __name__ == "__main__":
    print("Iniciando teste de ingestão COMPLETA e tratamento de erros...\n")
    
    # estando População (Agregado 6579, Variável 9324, Último ano)
    print("--- Testando População ---")
    dados_populacao = fetch_indicator("6579", "9324", "-1")
    if dados_populacao:
        print("✅ Sucesso! Dados de população dos 27 estados retornados.\n")
        
    # Testando Densidade (Agregado 1298, Variável 614, Ano de 2010)
    print("--- Testando Densidade Demográfica ---")
    dados_densidade = fetch_indicator("1298", "614", "2000")
    if dados_densidade:
        print("✅ Sucesso! Dados de densidade retornados.\n")
        
    # Testando Estados / Regiões
    print("--- Testando Estados ---")
    dados_estados = fetch_states()
    if dados_estados:
        # imprime apenas o primeiro estado da lista
        print("✅ Sucesso! Lista de estados retornada. Exemplo do 1º estado:")
        print(json.dumps(dados_estados[0], indent=2, ensure_ascii=False))