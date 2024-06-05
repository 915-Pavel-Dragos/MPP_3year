from channels.generic.websocket import AsyncWebsocketConsumer
from rest_framework.utils import json
from django.urls import path
from serializers import CarSerializer


class CarConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        await self.send(text_data=json.dumps({
            'type': 'car_added',
            'car': CarSerializer
        }))


websocket_urlpatterns = [
    path('ws/cars/', CarConsumer.as_asgi()),
]