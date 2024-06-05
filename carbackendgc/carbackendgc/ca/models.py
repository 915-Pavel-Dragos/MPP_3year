from django.db import models


class Car(models.Model):
    name = models.CharField(max_length=100)
    horsepower = models.IntegerField()
    color = models.CharField(max_length=100)
    year = models.IntegerField()
    country = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Incident(models.Model):
    description = models.CharField(max_length=500)
    location = models.CharField(max_length=100)
    date = models.DateTimeField()
    car = models.ForeignKey(Car, on_delete=models.CASCADE)

    def __str__(self):
        return self.description

    class Meta:
        ordering = ['date']
