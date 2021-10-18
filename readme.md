This project is built using: https://medium.com/coinmonks/part-4-implementing-blockchain-and-cryptocurrency-with-pow-consensus-algorithm-9201eb7e8a41

For testing Node pool use the following commands (3 nodes):

npm run dev
cross-env HTTP_PORT=3002 P2P_PORT=5002 PEERS=ws://localhost:5001 npm run dev
cross-env HTTP_PORT=3003 P2P_PORT=5003 PEERS="ws://localhost:5002,ws://localhost:5001" npm run dev
