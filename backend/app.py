from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os
import time
import requests  

app = Flask(__name__)
CORS(app)

CARDS_FILE = 'cards.json'
DATA_FILE = 'adozioni.json'

# --- FUNZIONI DI SUPPORTO ---
def carica_cards():
    if os.path.exists(CARDS_FILE):
        with open(CARDS_FILE, 'r', encoding='utf-8') as f:
            cards = json.load(f)
            for card in cards:
                if 'comments' not in card: card['comments'] = []
            return cards
    return []

def salva_cards(cards):
    with open(CARDS_FILE, 'w', encoding='utf-8') as f:
        json.dump(cards, f, indent=4, ensure_ascii=False)

def carica_da_file():
    if os.path.exists(DATA_FILE):
        try:
            with open(DATA_FILE, 'r', encoding='utf-8') as f: return json.load(f)
        except: return []
    return []

def salva_su_file(dati):
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        json.dump(dati, f, indent=4, ensure_ascii=False)

# --- ROTTE STANDARD ---
@app.route('/api/checkStatus', methods=['GET'])
def check_status():
    return jsonify({"stato": "OK"}), 200

@app.route('/api/cards', methods=['GET'])
def get_cards():
    return jsonify(carica_cards()), 200

@app.route('/api/cards', methods=['POST'])
def save_cards_api():
    salva_cards(request.json)
    return jsonify({"message": "OK"}), 201

# --- INTELLIGENZA ARTIFICIALE (OLLAMA) ---
@app.route('/api/ai/populate-existing', methods=['POST'])
def populate_existing_comments():
    cards = carica_cards()
    count = 0
    print("--- INIZIO GENERAZIONE COMMENTI ---")
    for card in cards:
        prompt = f"Scrivi un commento divertente e brevissimo (max 10 parole) per uno Shiba Inu chiamato {card.get('title')}."
        try:
            response = requests.post('http://localhost:11434/api/chat', 
                json={"model": "llama3", "messages": [{"role": "user", "content": prompt}], "stream": False}, 
                timeout=30)
            
            if response.status_code == 200:
                testo = response.json().get('message', {}).get('content', '').strip().replace('"', '')
                card['comments'].append(testo)
                count += 1 
                print(f"OK -> {card.get('title')}")
        except Exception as e:
            print(f"Errore su {card.get('title')}: {e}")
            
    salva_cards(cards)
    return jsonify({"message": f"Generate {count} nuove recensioni IA"}), 200

@app.route('/api/ai/site-review', methods=['GET'])
def site_review():
    try:
        cards = carica_cards()
        adozioni = carica_da_file()
        likes_totali = sum(c.get('likes', 0) for c in cards)
        
        prompt = f"Analizza: {len(cards)} card, {len(adozioni)} adozioni, {likes_totali} like. Scrivi una recensione professionale di max 40 parole."
        
        print("Generazione recensione sito in corso...")
        response = requests.post('http://localhost:11434/api/chat', 
            json={"model": "llama3", "messages": [{"role": "user", "content": prompt}], "stream": False}, 
            timeout=60)
        
        if response.status_code == 200:
            testo = response.json().get('message', {}).get('content', '').strip()
            report = {
                "data_generazione": time.strftime("%Y-%m-%d %H:%M:%S"), 
                "statistiche": {"cards": len(cards), "adozioni": len(adozioni), "likes": likes_totali}, 
                "recensione_ia": testo
            }
            with open('recensione_sito.json', 'w', encoding='utf-8') as f:
                json.dump(report, f, indent=4, ensure_ascii=False)
            return jsonify(report), 200
        return jsonify({"error": "Ollama Error"}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# --- ANALISI IMMAGINE ---
@app.route('/api/analyzeImage', methods=['POST'])
def analyze_image():
    try:
        data = request.json
        print("Ricevuta immagine per analisi...")
        time.sleep(1) 
        return jsonify({
            "status": "success",
            "analysis_id": int(time.time()),
            "message": "Shiba analizzato con successo!"
        }), 200
    except Exception as e:
        print(f"Errore durante l'analisi: {e}")
        return jsonify({"error": str(e)}), 500

# --- ROTTE ADOZIONI ---
@app.route('/api/adozioni', methods=['POST'])
def salva_adozione():
    dati = carica_da_file()
    dati.append(request.json)
    salva_su_file(dati)
    return jsonify({"message": "OK"}), 201

@app.route('/api/adozioni', methods=['GET'])
def prendi_adozioni():
    return jsonify(carica_da_file()), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)