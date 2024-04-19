from django.db import models

# Definition de la class Band qui herite de models:
# Pour rajouter un element dans le groups:
# → python manage.py shell
# >>> band = Band.objects.create(name='Foo Fighters')
class Band(models.Model):
    name = models.fields.CharField(max_length=100)

class Listing(models.Model):
    title = models.fields.CharField(max_length=100)