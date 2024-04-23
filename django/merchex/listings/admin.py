from django.contrib import admin

"""
- Pour creer un admin pour Django:
    > python manage.py createsuperuser (user: alex, mdp:alex)

"""

# Register your models here.
from listings.models import Band
from listings.models import Listing

# Enregistre le modèle Band sur le site d'administration:
# ce qui nous permet de le gérer à partir de là.
admin.site.register(Band)
admin.site.register(Listing)