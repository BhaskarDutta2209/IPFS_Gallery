# IPFS_Gallery
A basic reactJs web page using IPFS for file upload and blockchain for storing the hash

In this application you can upload any picture using IPFS. The hash is stored through a smart contract. Since this is a pet project I am using ganache. Users can also vote the image of their choice by giving there public address. (It is to be noted that since ganache is used, there is no need of signing transactions and hence no private key is needed)

To use it:
1. Install ganache and node js
2. Clone the repository
3. In terminal type
    ```npm install```
4. Start ganache(ensure it is running on port 7545) and type 
    ```truffle migrate```
5. Type 
    ```npm run start```
