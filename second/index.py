from flask import Flask, send_from_directory, request, jsonify
import math

app = Flask(__name__)

@app.route('/')
def home():
    return send_from_directory('.', 'index.html')

@app.route('/dimensionnement', methods=['POST'])
def dimensionnement():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'Invalid JSON data received'}), 400
    
    try:
        surface = float(data['surface'])
        abonnes = int(data['abonnes'])
        trafic = float(data['trafic'])
        qos = float(data['qos'])
        cout_par_station = float(data['cout_par_station'])
        capacite_par_station = float(data['capacite_par_station'])
        couverture_par_station = float(data['couverture_par_station'])
        canaux_par_station = int(data['canaux_par_station'])
        repartition_frequence = int(data['repartition_frequence'])
    except (ValueError, KeyError):
        return jsonify({'error': 'Invalid data format or missing fields'}), 400

    # Calcul du trafic total
    trafic_total = abonnes * trafic

    # Calcul des stations de base nécessaires basées sur la capacité et la couverture
    stations_base_capacite = math.ceil(trafic_total / capacite_par_station)
    stations_base_couverture = math.ceil(surface / couverture_par_station)

    # Nombre total de stations de base nécessaires
    stations_base = max(stations_base_capacite, stations_base_couverture)

    # Ajustement pour la qualité de service
    stations_base_ajustees = math.ceil(stations_base * (1 + qos / 100))

    # Calcul du coût total
    cout_total = stations_base_ajustees * cout_par_station

    # Répartition des fréquences (nombre de canaux nécessaires par station)
    canaux_necessaires = stations_base_ajustees * canaux_par_station
    frequences_necessaires = math.ceil(canaux_necessaires / repartition_frequence)

    return jsonify({
        'stationsBase': stations_base_ajustees,
        'capaciteTotale': trafic_total,
        'coutTotal': cout_total,
        'canauxNecessaires': canaux_necessaires,
        'frequencesNecessaires': frequences_necessaires
    })

if __name__ == '__main__':
    app.run(debug=True)
