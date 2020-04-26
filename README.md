# SETA Quanto Manca API

##### Cos'è

**API non ufficiale** del servizio "Quanto Manca" del servizio di trasporto di Modena, Piacenza e Reggio Emilia, **SETA**.

Attualmente quest'API funziona solamente con il bacino modenese.

##### Come usarla

Fai una **GET** request all'indirizzo:
**HTTP**: http://setaapi.bitrey.it/?fermata=CODICE_FERMATA
**HTTPS**: https://setaapi.bitrey.it/?fermata=CODICE_FERMATA

Rimpiazza CODICE_FERMATA con il codice della fermata.

Puoi trovare un elenco di tutti i codici delle fermate nel file "fermate.json", in formato `"CODICE_FERMATA": "NOME_FERMATA"`

Se non viene fornita alcuna query, la API restituirà i dati sulla fermata di San Cesario (MO2076).
Questo potrebbe cambiare nel futuro, quindi aggiungi sempre la query della fermata.

I dati verrano restituiti in formato JSON, in un array di oggetti.

Esempio:
```json
{
			"LINEA": "13",
			"DIREZIONE": "S. ANNA",
			"MINUTIALL'ARRIVO": "*",
			"ORARIO DAPROGRAMMA": "11:52",
			"ORARIOREALE": "*",
			"DOVE SITROVA IL BUS": ""
}
```
A volte, come in questo caso, i dati in tempo reale non sono disponibili.
Attualmente vengono rimpiazzati con un asterisco (*).

Nota che quest'API è un semplice web scraping dal sito di SETA Quanto Manca.
Se il sito viene cambiato, potrebbero cambiare anche i dati restituiti.
Nel caso peggiore si potrebbe rompere l'API.

Proverò comunque a tenerla sempre aggiornata, e a scrivere qui gli eventuali cambiamenti.
