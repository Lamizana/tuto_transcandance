
from django.http import HttpResponse
from django.shortcuts import render

# création des differentes vue:
# Une vue est une fonction qui accepte un objet HttpRequest comme parametre
# et retourne un objet HttpResponse.
# Cette réponse contient le HTML que le navigateur utilise pour afficher la page.

def accueil(request):
    return HttpResponse('<h1>Hello Django!</h1>')

def about(request):
    return HttpResponse('<h1>A-propos</h1> <p>Trop bien.</p>')

def listings(request):
    return HttpResponse('<h1>Listing</h1> <p>Vue application</p>')

def contact(request):
    return HttpResponse('<h1>Contact us</h1> <p>Vue constact</p>')