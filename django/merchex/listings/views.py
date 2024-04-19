
from django.http import HttpResponse
from django.shortcuts import render
from listings.models import Band
from listings.models import Listing

# création des differentes vue:
# Une vue est une fonction qui accepte un objet HttpRequest comme parametre
# et retourne un objet HttpResponse.
# Cette réponse contient le HTML que le navigateur utilise pour afficher la page.

def accueil(request):
    bands = Band.objects.all()
    return HttpResponse(f"""
        <h1>Hello Django!</h1>
        <p>Notre Crew:</p>
        <ol>
            <li>{bands[0].name}</li>
            <li>{bands[1].name}</li>
            <li>{bands[2].name}</li>
            <li>{bands[3].name}</li>
        </ol>
        """)

def about(request):
    return HttpResponse('<h1>A-propos</h1> <p>Trop bien.</p>')

def listings(request):
    bands = Band.objects.all()
    listings = Listing.objects.all()
    return HttpResponse(f"""
        <h1>Listing</h1> 
        <p>Descriptif:</p>
        <ul>
            <li>{bands[0].name} : {listings[0].title}</li>
            <li>{bands[1].name} : {listings[1].title}</li>
            <li>{bands[2].name} : {listings[2].title}</li>
            <li>{bands[3].name} : {listings[3].title}</li>
        </ul>
        """)
    

def contact(request):
    return HttpResponse('<h1>Contact us</h1> <p>Vue constact</p>')