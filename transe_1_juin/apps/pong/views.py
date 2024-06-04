from django.shortcuts               import render, redirect
from .models                        import Player
from .forms                         import PlayerForm
from django.contrib.auth.decorators import login_required

# Create your views here.
def index(request):
    """La page d'accueil pour PONG."""

    return render(request, 'pong/index.html')

@login_required
def profils(request):
    """Afficher toutes les info du User."""
    
    profils = Player.objects.order_by('date_added')
    #profils = Player.objects.filter(owner=request.user).order_by('date_added')
    context = {'players': profils}
    return render(request, 'pong/profils.html', context) 

@login_required
def profil(request, profil_id):
    """Afficher un seul sujet et toutes ses entrées."""
    
    profil = Player.objects.get(id=profil_id)
    context = {'player': profil}
   
    return render(request, 'pong/profil.html', context)

def new_profil(request):
    """Ajoute un nouveau Player."""

    if request.method != 'POST':
         # Afficher un formulaire d'inscription vide:
        form = PlayerForm()
    else:
        # Traiter le formulaire rempli:
        form = PlayerForm(data=request.POST)
        if form.is_valid:
            form.save()
            return redirect('pong:profils')
        
    # Afficher un formuliare vierge ou invalide:
    context = {'form': form}
    return render(request, 'pong/new_profil.html', context)


@login_required
def pong(request):
    players = Player.objects.all()
    player = Player.objects.get(id=1)

    return render(request, "pong/pong.html",  { 'players':players, 'player':player})

 