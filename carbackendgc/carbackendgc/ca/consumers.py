import json
from channels.generic.websocket import AsyncWebsocketConsumer


class CarConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        await self.channel_layer.group_add("cars", self.channel_name)

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard("cars", self.channel_name)

    async def car_added(self, event):
        new_car = event['car']
        await self.send(text_data=json.dumps(new_car))