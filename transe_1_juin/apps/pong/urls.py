"""Definir des motifs d'URL pour le site pong"""

from django.urls    import path
from .              import views

app_name = 'pong'

urlpatterns = [
    # Page d'accueil:
    path('', views.index, name='index'),

    # Page d'affichage des détails d'un seul User.
    path('profil/', views.profil, name='profil'),

    # Page d'ajout d'un nouveau profil.
    path('new_profil/', views.new_profil, name='new_profil'),

    # Page d'affichage du jeux pong.
    path('pong/', views.pong, name='pong'),
]