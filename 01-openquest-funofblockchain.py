import hashlib


from hashlib import sha256
import json
import time


class Chain:
    def __init__(self) -> None:
        self.blockchain = []
        self.pending = []
        self.add_block(prevhash="Genesis", proof=1708)
