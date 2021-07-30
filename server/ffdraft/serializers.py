from rest_framework import serializers
from .models import Distribution
from .models import Lineup
from .models import Position


class JSONSerializerField(serializers.Field):
    """ Serializer for JSONField -- required to make field writable"""
    def to_internal_value(self, data):
        return data

    def to_representation(self, value):
        return value


class DistributionSerializer(serializers.ModelSerializer):
    data = JSONSerializerField()

    class Meta:
        model = Distribution
        fields = ('_id', 'scoring', 'teams', 'data')


class LineupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lineup
        fields = ('_id', 'scoring', 'teams', 'rounds', 'starters', 'pick', 'score', 'players')


class PositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Position
        fields = ('_id', 'name', 'color')
