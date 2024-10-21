starkli declare --account ~/.starkli-wallets/deployer/account.json --keystore ~/.starkli-wallets/deployer/keystore.json  target/dev/
contracts_YourCollectible.contract_class.json --network=sepolia --compiler-version=2.8.2
# Enter keystore password: 
# Not declaring class as it's already declared. Class hash:
# 0x02e48a672be6b17fa5c6979db683b38ab1262c797d732ed2d00220a6898b119c

# pra declarar ou faz isso ou 

# starkli declare --account ~/.starkli-wallets/deployer/account.json  --network=sepolia --compiler-version=2.8.2 target/dev/contracts_Y
# ourCollectible.contract_class.json --keystore ~/.starkli-wallets/deployer/keystore.json

starkli deploy --account ~/.starkli-wallets/deployer/account.json  0x02e48a672be6b17fa5c6979db683b38ab1262c797d732ed2d00220a6898b119c 0x04d9e99204dbfe644fc5ed7529d983ed809b7a356bf0c84daade57bcbb9c0c77 --network=sepolia --keystore ~/.starkli-wallets/deployer/keystore.json

# pedrorosalba@pedrorosalba-TECRA-Z50-C:~/mediolano-stark/packages/snfoundry/contracts$ starkli deploy --account ~/.starkli-wallets/deployer/account.json  0x02e48a672be6b17fa5c6979db683b38ab1262c797d732ed2d00220a6898b119c 0x04d9e99204dbfe644fc5ed7529d983ed809b7a356bf0c84daade57bcbb9c0c77 --network=sepolia --keystore ~/.starkli-wallets/deployer/keystore.json
# Enter keystore password: 
# Deploying class 0x02e48a672be6b17fa5c6979db683b38ab1262c797d732ed2d00220a6898b119c with salt 0x01cf408c8ce0ca32ae91ff0fac29ac21a7e38f7b244ce0cbbcc425e0955a05e0...
# The contract will be deployed at address 0x01f6be6f07cca79b1e0388c2199fa37e491222fc1039a805fc966b7e02494d59
# Contract deployment transaction: 0x03d5cbf868284ed50c0271feb7e625dcf20e52a96c8c5d19c1532d5cd272ca86
# Contract deployed:
# 0x01f6be6f07cca79b1e0388c2199fa37e491222fc1039a805fc966b7e02494d59