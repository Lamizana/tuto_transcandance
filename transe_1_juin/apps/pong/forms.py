from django import forms

from .models import Player

class PlayerForm(forms.ModelForm):
    class Meta:
        model = Player
        fields = ['nickname', 'language']
        labels = {'nickname': 'Pseudo', 'language': 'language'}