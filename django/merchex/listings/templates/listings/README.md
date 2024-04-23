# LES TEMPLATES / GABARITS: 
## Affiche et recueille les données .
### Creation d' un fichier HTML: 

    - listings/template/listings/accueil,html:

Le but va etre de séparer le HTML valable pour l'ensemble du site
du HTML spécifique à la page.

### Creation d'un gabarit de base pour eviter les répétitions:
    
    -listings/template/listings/base.html

La balise ```{% block %}``` est un espace réservé dans lequelle on peut y placer
du contenue, elle se termine par ```{% endblock %}```
Notre block ici s'appelle **content**.

Notre gabarit de base est l'endroit idéal pour charger un fichier CSS
en utilisant la balise de gabarits ```static```.

----------------------------------------------------------------
### Mise en place du gabarit dans chaque fichier.html:
Pour chaque fichier.html qui se servira de la base, mettre au debut:
```python
{% extends 'listings/base.html' %}
{% block content %}
<ul>
<h1>Hello Django !</h1>
...
</ul>

{% endblock %}
```
Les instructions ```{%...%}``` sont des ***balises de gabarits***.

----------------------------------------------------------------
### Mettre a jour view.py:
```python
from django.shortcuts import render

def accueil(request):
    bands = Band.objects.all()
    return render(request, 'listings/accueil.html',{'bands': bands})
```
> render prend plusieurs parametres.

```'listings/accueil.html'``` est le chemin du fichier.html a récupérer.

Nous appelons le troisième argument un « dictionnaire de contexte ».
```'bands':bands``` permet de recupérer tous les objects de Bands.

----------------------------------------------------------------
### Utilisation des filtre de gabarits:
Permet d'appliquer un certains formatage.
```html
<li>{{ band.name|upper }}</li>
``` 
> Met le nom en majuscule.
```html
<li>{{ band.name|length }}</li>
```
> Donne la longueur du nom.

----------------------------------------------------------------
### Récapitulatif de l'architecture MVT:
Voici les trois principaux composants de l'architecture MVT:
- M: les modeles.
- V: les vues.
- T les templates.


