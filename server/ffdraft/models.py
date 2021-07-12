#from django.db import models
from djongo import models


class Distribution(models.Model):
    _id = models.ObjectIdField()
    scoring = models.CharField(
        max_length=30,
        default='PPR'
    )
    teams = models.PositiveIntegerField(
        default=12
    )
    rounds = models.PositiveIntegerField(
        default=16
    )
    distributions = models.JSONField(
        null=False
    )

    def _str_(self):
        return self.name


class Lineup(models.Model):
    _id = models.ObjectIdField()
    scoring = models.CharField(
        max_length=30,
        default='PPR'
    )
    teams = models.PositiveIntegerField(
        default=12
    )
    rounds = models.PositiveIntegerField(
        default=16
    )
    pick = models.PositiveIntegerField(
        default=1
    )
    score = models.FloatField(
        default=0
    )
    players = models.JSONField(
        null=True
    )
    positions = models.JSONField(
        null=True
    )

    def _str_(self):
        return self.name


class Position(models.Model):
    _id = models.ObjectIdField()
    # id = models.AutoField(
    #     primary_key=True,
    #     unique=True
    # )
    name = models.CharField(
        max_length=30,
        default=''
    )
    color = models.PositiveIntegerField(
        default=0
    )

    def _str_(self):
        return self.name
