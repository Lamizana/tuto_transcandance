from django.shortcuts               import render, redirect
from .models                        import Player
from .forms                         import PlayerForm
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models     import User
 
# Create your views here.
def index(request):
    """La page d'accueil pour PONG."""

    return render(request, 'pong/index.html')


@login_required
def profil(request):
    """Afficher un seul sujet et toutes ses entrées."""
    
    profil = Player.objects.get(owner=request.user)
    players = Player.objects.all()
    context = {'player': profil, 'players': players}
   
    return render(request, 'pong/profil.html', context)


def new_profil(request):
    """Ajoute un nouveau Player."""

    if request.method != 'POST':
        # Afficher un formulaire d'inscription vide:
        form = PlayerForm()
    else:
        # Traiter le formulaire rempli et renvoie a l'accueil:
        form = PlayerForm(data=request.POST)
        if form.is_valid:
            profil = form.save(commit=False)
            profil.owner = request.user
            profil.save()
            return redirect('pong:index')
        
    # Afficher un formuliare vierge ou invalide:
    context = {'form': form}
    return render(request, 'pong/new_profil.html', context)


@login_required
def pong(request):
    """Page du jeux Pong"""
    
    players = Player.objects.all()
    player = Player.objects.get(owner=request.user)

    return render(request, "pong/pong.html",  { 'players':players, 'player':player})

 