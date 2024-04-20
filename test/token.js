const { expect } = require("chai");
const { ethers } = require("hardhat");
const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");

// describe("Token contract", function () {
//   it("Deployment should assign the tatal supply of tokens to the owner.", async function () {
//     const [owner] = await ethers.getSigners();

//     const hardhatToken = await ethers.deployContract("Token");

//     const ownerBalance = await hardhatToken.balanceOf(owner.address);

//     expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
//   });

//   it("Should transfer tokens between accounts", async function () {
//     const [owner, addr1, addr2] = await ethers.getSigners();
//     const hardhatToken = await ethers.deployContract("Token");

//     // Transfer 50 tokens from owner to addr1
//     await hardhatToken.transfer(addr1.address, 50);
//     expect(await hardhatToken.balanceOf(addr1.address)).to.equal(50);

//     // Transfer 50 tokens from addr1 to addr2
//     await hardhatToken.connect(addr1).transfer(addr2.address, 50);
//     expect(await hardhatToken.balanceOf(addr2.address)).to.equal(50);
//   });
// });

describe("Token contract", function () {
  async function deployTokenFixture() {
    const [owner, addr1, addr2] = await ethers.getSigners();
    const hardhatToken = await ethers.deployContract("Token");
    return { hardhatToken, owner, addr1, addr2 };
  }

  // it("Deployment should assign the tatal supply of tokens to the owner.", async function () {
  //   const [owner] = await ethers.getSigners();

  //   const hardhatToken = await ethers.deployContract("Token");

  //   const ownerBalance = await hardhatToken.balanceOf(owner.address);

  //   expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  // });

  it("Should transfer tokens between accounts", async function () {
    const { hardhatToken, owner, addr1 } = await loadFixture(
      deployTokenFixture
    );

    // Transfer 50 tokens from owner to addr1
    await hardhatToken.transfer(addr1.address, 50);
    expect(await hardhatToken.balanceOf(addr1.address)).to.equal(50);

    //   // Transfer 50 tokens from addr1 to addr2
    //   await hardhatToken.connect(addr1).transfer(addr2.address, 50);
    //   expect(await hardhatToken.balanceOf(addr2.address)).to.equal(50);
  });

  it("Should fail if sender doesn't have enough tokens", async function () {
    const { hardhatToken, owner, addr1 } = await loadFixture(
      deployTokenFixture
    );
    const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);
    await expect(
      hardhatToken.connect(addr1).transfer(owner.address, 1)
    ).to.be.revertedWith("Not enough tokens");

    expect(await hardhatToken.balanceOf(owner.address)).to.equal(
      initialOwnerBalance
    );
  });
});
