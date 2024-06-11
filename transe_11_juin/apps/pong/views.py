from django.shortcuts               import render, redirect
from django.contrib.auth.decorators import login_required
from django.core.exceptions         import ObjectDoesNotExist
from .models                        import Player
from .forms                         import PlayerForm

 
def _get_profil(request):
    """Verife que le profil du User existe."""

    try:
        return Player.objects.get(owner=request.user)
    except ObjectDoesNotExist:
        return None
    

# Create your views here.
def index(request):
    """La page d'accueil pour PONG."""

    return render(request, 'pong/index.html')

 
@login_required
def profil(request):
    """Afficher un seul User et toutes ses donn€es."""

    profil = _get_profil(request)
    if profil == None:
        return redirect('pong:new_profil')

    # profil = Player.objects.get(owner=request.user)
    players = Player.objects.all()
    context = {'profil': profil, 'players': players}
    return render(request, 'pong/profil.html', context)


def new_profil(request):
    """Ajoute un nouvel utilisateur et son profil."""

    if request.method != 'POST':
        # Afficher un formulaire d'inscription vide:
        form = PlayerForm()
    else:
        # Traiter le formulaire rempli et renvoie a l'accueil:
        form = PlayerForm(data=request.POST)
        players = Player.objects.all()
        if form.is_valid:
            profil = form.save(commit=False)
            # Verifie si le nickname est deja pris:
            for player in players:
                if player.nickname == profil.nickname:
                    return redirect('pong:new_profil')
            profil.owner = request.user
            profil.save()
            return redirect('pong:index')
        
    # Afficher un formuliare vierge ou invalide:
    context = {'form': form}
    return render(request, 'pong/new_profil.html', context)


@login_required
def del_user(request):
    """Supprime un utilisateur et supprime ses donn€es."""
    
    user = request.user
    user.delete()
    return redirect("pong:index")


@login_required
def pong(request):
    """Page du jeux Pong."""
    
    player = _get_profil(request)
    if player == None:
        return redirect('pong:new_profil')
    
    players = Player.objects.all()
    # player = Player.objects.get(owner=request.user)
    return render(request, "pong/pong.html",  { 'players':players, 'player':player})

 