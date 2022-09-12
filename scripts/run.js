const main = async () =>
{
    const[owner, randomPerson] = await hre.ethers.getSigners();
    const domainContractFactory = await hre.ethers.getContractFactory('Domains');
    //we pass in "vitap" to the constructor when deploying!
    const domainContract = await domainContractFactory.deploy("vitap");
    await domainContract.deployed();
    console.log("Contract deployed to:", domainContract.address);
    console.log("Contract deployed by:", owner.address);

    const txn = await domainContract.register("prashanth", {value:hre.ethers.utils.parseEther('0.1')});
    await txn.wait();

    const address = await domainContract.getAddress("prashanth");
    console.log("Owner of domain prashanth", address);

    const balance = await hre.ethers.provider.getBalance(domainContract.address);
    console.log("Contract balance:", hre.ethers.utils.formatEther(balance));

    // txn = await domainContract.connect(randomPerson).setRecord("prashanth", "Haha my domain now");
    // await txn.wait();
}

const runMain = async () =>
{
    try
    {
        await main();
        process.exit(0);
    }
    catch(error)
    {
        console.log(error);
        process.exit(1);
    }
};

runMain();