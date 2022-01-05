# DegustaMe

## Instalación

1. Dirigirse a la carpeta `/back` e instalar las dependencias necesarias:
```
cd back
python -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
```
2. Dirigirse a la carpeta `/front` e instalar las dependencias necesarias:
```
cd front
npm install
```

## Ejecución

1. Arrancar el servidor de Flask:
```
cd back
source .venv/bin/activate
export FLASK_APP=main.py
export FLASK_ENV=development
flask run
```

2. Arrancar el servidor de desarrollo:
```
cd front
npm start
```