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
"""
 ==========================================
 CACHE EM MEMÓRIA
 ==========================================
 ESTRATÉGIA DE CACHE:
 O cache vive durante o ciclo de vida do processo. 
 Em produção, ele reinicia junto com o servidor Uvicorn.
 Sem rota de refresh neste nível (poderá ser exposto futuramente em uma rota /refresh-cache no FastAPI).
"""
_CACHE = {}
def limpar_cache():
    """
    Limpa o cache atual.
    """
    global _CACHE
    _CACHE.clear()
    print("Cache limpo com sucesso!")


def fetch_indicator(aggregate, variable, period):
    """
    Busca os dados de um indicador para TODOS os estados.
    Utilizamos 'all' no nível N3 (Estados).
    """
    url = (f"https://servicodados.ibge.gov.br/api/v3/agregados/{aggregate}"
           f"/periodos/{period}/variaveis/{variable}?localidades=N3[all]")
    
    if url in _CACHE:
        print(f"[CACHE] Retornando dados salvos para: {aggregate}/{variable}")
        return _CACHE[url]
    
    print(f" [API] Buscando dados na URL: {url}")
    
    try:
        # Adicionado timeout de 30 segundos
        response = requests.get(url, timeout=30)
        
        # Levanta um erro se o status HTTP não for 200 (OK)
        response.raise_for_status() 
        dados = response.json()

        # Salva o resultado no cache antes de retornar
        _CACHE[url] = dados
        return dados
                
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

    if url in _CACHE:
        print(f"[CACHE] Retornando lista de estados salva.")
        return _CACHE[url]
        
    print(f"[API] Buscando lista de estados na URL: {url}")
    
    try:
        response = requests.get(url, timeout=30)
        response.raise_for_status()
        dados = response.json()
        
        _CACHE[url] = dados
        return dados
        
    except requests.exceptions.Timeout:
        print("Erro: O tempo limite (timeout) estourou ao buscar os estados.")
        return None
    except requests.exceptions.RequestException as e:
        print(f"Erro na requisição de estados: {e}")
        return None

# ==========================================
# INGESTÃO COMPLETA
# ==========================================
if __name__ == "__main__":
    print("Iniciando teste de Ingestão com CACHE...\n")
    
    print("--- 1ª CHAMADA (Deve ir na API) ---")
    dados1 = fetch_indicator("6579", "9324", "-1")
    
    print("\n--- 2ª CHAMADA (Deve vir do CACHE, super rápido!) ---")
    dados2 = fetch_indicator("6579", "9324", "-1")

    # --- TESTANDO DENSIDADE  ---
    print("\n--- 3ª CHAMADA: Densidade Demográfica (Deve ir na API) ---")
    dados_den1 = fetch_indicator("1298", "614", "2010")

    print("\n--- 4ª CHAMADA: Densidade Demográfica (Deve vir do CACHE) ---")
    dados_den2 = fetch_indicator("1298", "614", "2010")

    print("\n--- 🕵️ ESPIANDO DENTRO DO CACHE ---")
    print(f"Quantidade de itens salvos na memória: {len(_CACHE)}")
    
    # lista todas as URLs que estão guardadas na gaveta
    print("\n--- 🕵️ CONTEÚDO REAL DO CACHE ---")
    for url_salva, dados_salvos in _CACHE.items():
        print(f"URL: {url_salva}")
        print(f"Tipo do dado guardado: {type(dados_salvos)}")
        print(dados_salvos)

    print("\n--- TESTANDO ESTRATÉGIA DE REFRESH ---")
    limpar_cache()
    dados3 = fetch_indicator("6579", "9324", "-1")