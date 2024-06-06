from django.shortcuts               import render, redirect
from .models                        import Player
from .forms                         import PlayerForm
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models     import User
from django.http                    import Http404
 
# Create your views here.
def index(request):
    """La page d'accueil pour PONG."""

    return render(request, 'pong/index.html')


@login_required
def profil(request):
    """Afficher un seul User et toutes ses donn€es."""
    
    profil = Player.objects.get(owner=request.user)
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
        if form.is_valid:
            profil = form.save(commit=False)
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
    
    players = Player.objects.all()
    player = Player.objects.get(owner=request.user)

    return render(request, "pong/pong.html",  { 'players':players, 'player':player})

 