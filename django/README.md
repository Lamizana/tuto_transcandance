- Pour activer notre environement virtuel:
```
> source env/bin/activate
```
- Pour générer un projet avec django:
```
> django-admin startproject projectName
```
- Pour lancer le server Django avec manage.py:
```
> python3  manage.py runserver
```
- Affichage au lancement de Django:
```
Django version 5.0.4, using settings 'merchex.settings'
Starting development server at http://127.0.0.1:8000/ <- adresse.
Quit the server with CONTROL-C.
```
- Se connecter au navigateur:
	l'application est hébergé sur notre machine et non en ligne.

----------------------------------------------------------------------------
- Migrations:
	Une migration est un ensemble d'instruction permettent de passer le shema de
	notre base de donnees d'un etat à un autre.
	elles représente un moyen de configurer la base de données de notre application.
- Pour créer notre base de données:
```
> python3 manage.py migrate
```
base de données créer: db.sqlite3

- Création de notre application, ici listings qui liste les marchandises:
```
> python3 manage.py startapp listings
```


- listing est un repertoire d'application:
	chaque répertoire d'application est spécifique à une application.

- merchex est un répertoire de projet.
	contient l'ensemble du projet: c'est la tour de controle.

- Pour installer l'application listing dans notre projet:
	aller dans merchex/setting.py: rajouter 'listings' à la fin de INSTALLED_APPS.

----------------------------------------------------------------------------
Fichier views.py gere l'ensemble des vues avec le fichier urls.py:

	- Une vue est une fonction qui accepte un objet HttpRequest comme 
	  parametre et retourne un objet HttpResponse.
	- La rajouter dans le fichier merchex/urls.py.

----------------------------------------------------------------------------
LES MODELES: models.py

- Un modele définit les caractéristiques que nous voulons stocker.
- Les caractéristique sont définit par des champs.
- Un modéle permet d'avoir une mémoire persistante.
- Ajouter d'abord le models dans models.py
- Creer le modele:
```
> python3 manage.py makemigrations
'''
```

- le mettre à jour:
	python manage.py migrate

---------------------------------------------------------------------------
LES TEMPLATES / GABARITS: Affiche et recueille les données .

Voir README.md dans listings/templates/listings/Readme.md