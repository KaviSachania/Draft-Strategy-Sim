from django.urls import path
from ffdraft.controllers import position


class PositionRouter:
    urls = [
        path('', position.get_all_positions),
        path('<int:position_id>/', position.get_position_by_id)
    ]