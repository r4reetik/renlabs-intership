from hashlib import sha256
import json
import time


class Chain:
    def __init__(self) -> None:
        self.blockchain = []
        self.pending = []
        self.add_block(prevhash="Genesis", proof=1708)

    def add_transaction(self, sender, recipient, amount):
        transaction = {
            "Sender": sender,
            "recipient": recipient,
            "amount": amount
        }

        self.pending.append(transaction)

    def compute_hash(self, block):
        json_block = json.dumps(block, sort_keys=True).encode()
        block_hash = sha256(json_block).hexdigest()

        return block_hash

    def add_block(self, proof, prevhash=None):
        block = {
            "index": len(self.blockchain),
            "timestamp": time.time(),
            "transactions": self.pending,
            "proof": proof,
            "prevhash": prevhash
        }

        self.pending = []
        self.blockchain.append(block)
