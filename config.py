import json
from enum import Enum


class ConfigKeys:
    PORT = "port"
    LOG_LEVEL = "log_level"
    MODEL = "model"
    DEVICE = "device"


f = open("config.json", "r")
configuration = json.load(f)
config_keys = ConfigKeys()
