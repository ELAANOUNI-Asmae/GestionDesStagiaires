from flask import Flask, request, send_file
from io import StringIO, BytesIO
import pandas as pd
import os

app = Flask(__name__)

# Pour autoriser les requêtes cross-origin du frontend
# En production, configurez cela de manière plus spécifique
from flask_cors import CORS
CORS(app)

@app.route('/process_csv', methods=['POST'])
def process_csv():
    if 'file' not in request.files:
        return {'error': 'No file part in the request'}, 400
    
    file = request.files['file']
    if file.filename == '':
        return {'error': 'No selected file'}, 400
    
    if file:
        # Lire le contenu du fichier CSV
        # Utiliser StringIO pour lire le fichier comme une chaîne
        csv_data = StringIO(file.read().decode('utf-8'))
        
        try:
            # Charger les données CSV dans un DataFrame pandas
            # pandas est excellent pour manipuler des données tabulaires
            df = pd.read_csv(csv_data)

            # --- Votre LOGIQUE DE STRUCTURATION/MODIFICATION ICI ---
            # Exemple : ajouter une colonne, renommer des colonnes, filtrer des données
            # Pour cet exemple, disons que nous voulons juste nous assurer
            # que les colonnes sont dans un ordre spécifique ou faire une transformation simple.
            # Pour l'objectif initial de "structurer", pandas est idéal.
            
            # Exemple simple : ajouter une colonne fictive ou réorganiser
            if 'Absences' in df.columns and 'Deliverables' in df.columns:
                df['Performance Ratio'] = df['Deliverables'] / (df['Absences'] + 1) # Éviter division par zéro
            
            # Vous pouvez renommer des colonnes, fusionner des données, etc.
            # df = df.rename(columns={'Name': 'Full Name'})
            
            # Sauvegarder le DataFrame modifié dans un nouveau CSV en mémoire
            output_buffer = StringIO()
            # s'assurer que le BOM est inclus pour Excel lors de la création du CSV
            output_buffer.write('\uFEff') # BOM pour UTF-8
            df.to_csv(output_buffer, index=False, encoding='utf-8')
            output_buffer.seek(0) # Revenir au début du buffer

            # Envoyer le fichier CSV modifié au frontend
            # Utiliser BytesIO pour envoyer les données binaires
            return send_file(
                BytesIO(output_buffer.getvalue().encode('utf-8')),
                mimetype='text/csv',
                as_attachment=True,
                download_name='processed_interns_data.csv'
            )

        except Exception as e:
            return {'error': f'Failed to process CSV: {str(e)}'}, 500

if __name__ == '__main__':
    app.run(debug=True) # debug=True pour le développement, à désactiver en production