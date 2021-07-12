from django.urls import path
from ffdraft.controllers import lineup


class LineupRouter:
    urls = [
        path('', lineup.get_all_lineups),
        path('<int:lineup_id>/', lineup.get_lineup_by_id)
    ]