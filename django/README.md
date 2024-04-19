- Pour generer un projet qvec django:
	> django-admin startproject projectName
- Pour lancer le server Django avec manage.py:
	> python3 runserver
- Affichage au lancement de Django:
	Django version 5.0.4, using settings 'merchex.settings'
	Starting development server at http://127.0.0.1:8000/ <- adresse.
	Quit the server with CONTROL-C.
- Se connecter au navigateur:
	l'application est hébergé sur notre machine et non en ligne.

------------------------------------------------------------------------------
- Migrations:
	elles représente un moyen de configurer la base de données de notre application.
- Pour créer notre base de données:
	> python3 manage.py migrate
	base de données créer: db.sqlite3

- Création de notre application, ici listings qui liste les marchandises:
	> python3 manage.py startapp listings
