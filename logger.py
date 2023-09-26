from config import configuration, config_keys

import logging

logging.basicConfig()

logger = logging.getLogger()

logger.setLevel(configuration[config_keys.LOG_LEVEL])
