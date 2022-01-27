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
            "prevhash": self.compute_hash(self.blockchain[:-1])
        }

        self.pending = []
        self.blockchain.append(block)


chain = Chain()

t1 = chain.add_transaction("Vitalik", "Satoshi", 100)

t2 = chain.add_transaction("Satoshi", "Alice", 10)

t3 = chain.add_transaction("Alice", "Charlie", 34)

chain.add_block(1201)

t4 = chain.add_transaction("Bob", "Eve", 23)

t5 = chain.add_transaction("Dennis", "Brian", 3)

t6 = chain.add_transaction("Ken", "Doug", 88)

chain.add_block(1092)

print(chain.blockchain)
