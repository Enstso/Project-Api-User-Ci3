# Utiliser l'image de base Python
FROM python:3.8

# Créer le répertoire de travail
WORKDIR /app

# Exposer le port 8000
EXPOSE 8000

# Commande pour démarrer le serveur
CMD ["python", "-m", "http.server", "8000"]


#docker run --rm -it -p 8000:8000 -v $(pwd):/app pythonwebserver