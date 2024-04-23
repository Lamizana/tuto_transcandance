# création des differentes vue:
# Une vue est une fonction qui accepte un objet HttpRequest comme parametre
# et retourne un objet HttpResponse.
# Cette réponse contient le HTML que le navigateur utilise pour afficher la page

from django.http import HttpResponse
from django.shortcuts import render
from listings.models import Band
from listings.models import Listing

# Définit la page D'accueil: templates/listings/accueil
def accueil(request):
    bands = Band.objects.all()
    return render(request, 'listings/accueil.html', {'bands': bands})

# Définit la page about: templates/listings/about 
def about(request):
    return render(request, 'listings/about.html')

# Définit la page listing: templates/listings/listing
def listings(request):
    listings = Listing.objects.all()
    return render(request, 'listings/listing.html', {'listings': listings})

# Définit la page constact: templates/listings/constact  
def contact(request):
    return render(request, 'listings/contact.html')
    return HttpResponse('<h1>Contact us</h1> <p>Vue constact</p>')