from django.db import models

""""---------------------------------------------------
Definition de la class Band qui herite de models.
-Lancement de python avec :
    → python manage.py shell

- Pour travailler avec le groupp Band:
    > from listings.models import Band
- Pour rajouter un element dans le groups Band:
    > band = Band.objects.create(name='Foo Fighters')
- pour recuperer un objet grace a son id:
    > band = Band.objects.get(id=1)
    > band.name
- Pour voir tous les objet du group Band:
    > Band.objects.all()
- Pour savoir combien d'element il y a dans le groupe:
    > Band.objects.count()
- Pour supprimer le 1re element du group Band:
    > tmp = Band.objects.get(id=1)
    > tmp.delete()
- Pour supprimer tout les elements du group Band:
    > tmp = Band.objects.all()
    > tmp.delete()

--------------------------------------------------------"""

class Band(models.Model):
    name = models.fields.CharField(max_length=100)

class Listing(models.Model):
    title = models.fields.CharField(max_length=100)
    