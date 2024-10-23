starkli declare --account ~/.starkli-wallets/deployer/account.json --keystore ~/.starkli-wallets/deployer/keystore.json target/dev/contracts_YourCollectible.contract_class.json --rpc=https://starknet-sepolia.infura.io/v3/4af9175ce8f54e5da66b8ec683219c98 --compiler-version=2.8.2

starkli deploy --account ~/.starkli-wallets/deployer/account.json 0x02e48a672be6b17fa5c6979db683b38ab1262c797d732ed2d00220a6898b119c 0x04d9e99204dbfe644fc5ed7529d983ed809b7a356bf0c84daade57bcbb9c0c77 --network=sepolia --keystore ~/.starkli-wallets/deployer/keystore.json
