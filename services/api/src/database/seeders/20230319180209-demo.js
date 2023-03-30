const uuid = require('uuid');

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [{
      id: '8a08eaf1-c7a8-403b-b1ce-1fef8e34d000',
      email: 'john.doe@gmail.com',
      // 12qw!@QW
      password: '$2a$10$P3L5AlTTAfzRjLWFVg9DMuCCiZjyr.514pB5ULQYn.FYCqRw2J00q',
      username: 'JohnDoe',
      account_confirm: true,
      tac: true,
      first_name: 'John',
      last_name: 'Doe',
      twitter: 'twitter.com/johndoe',
      linked_in: 'linkedin.com/johndoe',
      personal_website: 'stackoverflow.com',
      title: 'Just share my knowledge',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur dolor dolorem dolores dolorum eius esse facilis fugit inventore laborum natus necessitatibus nobis omnis, porro quam sint vel, veniam voluptates voluptatum?'
    }, {
      id: '186f0ff4-1444-4637-9be3-8c0abc168ba2',
      email: 'jan.kowalski@wp.pl',
      // 34er#$ER
      password: '$2a$10$RZs8Um4bze/AwzSfg6NVi.BUbrXrc29uyfmP.vXwLIO/rtYSNT.32',
      username: 'MilyKotek',
      account_confirm: true,
      tac: true,
      first_name: 'Jan',
      last_name: 'Kowalski',
      twitter: 'twitter.com/milykotek',
      title: 'The best coder in the world!',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur dolor dolorem dolores dolorum eius esse facilis fugit inventore laborum natus necessitatibus nobis omnis, porro quam sint vel, veniam voluptates voluptatum?'
    }, {
      id: '77c93fdf-8a06-483c-8d89-2f5c71d029ed',
      email: 'geralt@protonmail.com',
      // 56ty%^TY
      password: '$2a$10$IagiSYEnTamJPE8uqhFgTOQZqNt43AzwrPF2Z3l.LKbX4o3eVq7AG',
      username: 'TopWiedzmin1337',
      account_confirm: true,
      tac: true,
      first_name: 'Geralt',
      last_name: 'Rivijski',
      twitter: 't.com/jkowalski',
      personal_website: 'https://www.cdprojektred.com/en',
      title: 'Triss or Jennifer?...',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur dolor dolorem dolores dolorum eius esse facilis fugit inventore laborum natus necessitatibus nobis omnis, porro quam sint vel, veniam voluptates voluptatum?'
    }]);

    await queryInterface.bulkInsert('user_settings', [{
      id: uuid.v4(),
      user_id: '8a08eaf1-c7a8-403b-b1ce-1fef8e34d000',
      public_email: true
    }, {
      id: uuid.v4(),
      user_id: '186f0ff4-1444-4637-9be3-8c0abc168ba2'
    }, {
      id: uuid.v4(),
      user_id: '77c93fdf-8a06-483c-8d89-2f5c71d029ed'
    }]);

    await queryInterface.bulkInsert('posts', [{
      id: uuid.v4(),
      title: 'Cryptocurrencies: Understanding the Basics',
      slug: 'cryptocurrencies-understanding-the-basics',
      content: ['Cryptocurrencies have gained significant attention in recent years, with their popularity increasing rapidly. But what are cryptocurrencies, and how do they work?', 'In simple terms, cryptocurrencies are digital or virtual currencies that use cryptography to secure and verify transactions. Unlike traditional currencies, which are controlled by central authorities such as banks and governments, cryptocurrencies operate on a decentralized network, which means that no single entity has control over them.', 'Bitcoin, the first and most well-known cryptocurrency, was created in 2009 by an anonymous person or group using the pseudonym Satoshi Nakamoto. Since then, thousands of other cryptocurrencies have been created, with different features and use cases.', 'Cryptocurrencies are often bought and sold on online exchanges, and their value is determined by supply and demand in the market. They can also be used to purchase goods and services, and some companies have started accepting them as payment.', 'While cryptocurrencies offer many benefits, such as faster and cheaper transactions, they also come with risks, such as price volatility and the potential for fraud and hacking.', 'In summary, cryptocurrencies are digital or virtual currencies that operate on a decentralized network and use cryptography to secure transactions. They offer many benefits, but also come with risks that should be carefully considered before investing in them.'],
      user_id: '8a08eaf1-c7a8-403b-b1ce-1fef8e34d000',
      search_tags: ['crypto', 'btc']
    }, {
      id: uuid.v4(),
      title: 'Understanding Blockchain: How it Works and its Applications',
      slug: 'understanding-blockchain-how-it-works-and-its-applications',
      content: ['Blockchain is a term that has gained a lot of attention in recent years, especially in relation to cryptocurrencies. But what is blockchain, and how does it work?', 'In simple terms, a blockchain is a decentralized, digital ledger that records transactions across a network of computers. Each block in the chain contains a set of transactions and is secured using cryptography. Once a block is added to the chain, it cannot be altered without also altering all subsequent blocks, making the entire chain tamper-proof and secure.', 'One of the key benefits of blockchain technology is its transparency. Since all transactions are recorded on the blockchain, they can be easily traced and verified, making it difficult for fraud to occur. Blockchain technology can also be used to create smart contracts, which are self-executing contracts with the terms of the agreement directly written into code.', 'While blockchain technology was initially used for cryptocurrencies, its potential applications are much broader. It can be used in industries such as finance, healthcare, and logistics to improve efficiency, transparency, and security.', 'For example, blockchain technology can be used to create a decentralized system for medical records, allowing patients to securely share their medical information with healthcare providers. In the logistics industry, blockchain technology can be used to track the movement of goods, reducing the risk of fraud and improving supply chain management.', 'In conclusion, blockchain is a decentralized, digital ledger that records transactions across a network of computers. Its potential applications are broad and varied, and it offers many benefits, including increased security, transparency, and efficiency. As blockchain technology continues to evolve, it is likely to play an increasingly important role in many industries.'],
      user_id: '8a08eaf1-c7a8-403b-b1ce-1fef8e34d000',
      search_tags: ['blockchains', 'apps']
    }, {
      id: uuid.v4(),
      title: 'Web3 and Decentralized Applications: The Future of the Internet?',
      slug: 'web3-and-decentralized-applications-the-future-of-the-internet',
      content: ['Web3 is a term that refers to the next generation of the internet, which is being built on decentralized technologies such as blockchain. Web3 promises to transform the way we interact with the internet by providing a more decentralized, transparent, and secure experience.', 'One of the key components of Web3 is decentralized applications, or dApps. These are applications that run on a decentralized network, such as blockchain, and are not controlled by any single entity. This makes them more secure and transparent than traditional applications, as there is no central point of control that can be hacked or manipulated.', 'Some examples of dApps include decentralized marketplaces, social media platforms, and gaming applications. These dApps offer users a more transparent and secure experience, as transactions are recorded on the blockchain and cannot be altered or manipulated.', 'Another key feature of Web3 is the use of cryptocurrencies as a means of exchange. Cryptocurrencies such as Bitcoin and Ethereum can be used to buy and sell goods and services on decentralized marketplaces, and they can also be used to power dApps and smart contracts.', 'Web3 and decentralized technologies are still in their early stages, but they hold a lot of promise for the future of the internet. By providing a more decentralized, transparent, and secure experience, Web3 and dApps could help to address some of the key challenges of the current internet, such as data privacy and security. As the technology continues to evolve, it will be interesting to see how it shapes the future of the internet and our digital lives.'],
      user_id: '8a08eaf1-c7a8-403b-b1ce-1fef8e34d000',
      search_tags: ['web3', 'decentralization']
    }, {
      id: uuid.v4(),
      title: 'NFTs and Web3: The Rise of Digital Ownership',
      slug: 'nfts-and-web3-the-rise-of-digital-ownership',
      content: ['NFTs, or non-fungible tokens, have taken the world by storm in recent years, with record-breaking sales and high-profile auctions. But what are NFTs, and how do they fit into the Web3 landscape?', 'In simple terms, NFTs are unique digital assets that are verified on a blockchain network. They can represent a variety of digital assets, such as art, music, and collectibles. Unlike traditional digital files, which can be easily duplicated, NFTs are one-of-a-kind and cannot be replicated, making them a valuable form of digital ownership.', 'One of the key benefits of NFTs is that they provide a way for creators to monetize their digital creations. Artists, musicians, and other content creators can use NFTs to sell their work directly to collectors, without relying on traditional intermediaries such as galleries or record labels.', 'NFTs are also being used to create new forms of digital ownership and experiences. For example, some companies are using NFTs to create virtual real estate and gaming assets that can be bought and sold on decentralized marketplaces.', 'NFTs are an important part of the Web3 landscape because they provide a way for individuals to take control of their digital assets and create new forms of value. As Web3 continues to evolve, it is likely that NFTs will play an increasingly important role in shaping the future of digital ownership and the creative economy.'],
      user_id: '186f0ff4-1444-4637-9be3-8c0abc168ba2',
      search_tags: ['nft', 'web3']
    }, {
      id: uuid.v4(),
      title: 'Web3 and the Future of Finance: Decentralized Finance (DeFi)',
      slug: 'web3-and-the-future-of-finance-decentralized-finance-defi',
      content: ['Web3 and decentralized technologies are disrupting the traditional financial system and creating new opportunities for individuals to access financial services. Decentralized Finance (DeFi) is a key component of the Web3 ecosystem and is transforming the way we think about banking, investing, and borrowing.', 'DeFi refers to a set of financial services that are built on decentralized networks, such as blockchain. These services include peer-to-peer lending, decentralized exchanges, and stablecoins, which are cryptocurrencies that are pegged to the value of traditional assets, such as the US dollar.', 'One of the key benefits of DeFi is that it provides individuals with greater control over their finances. By removing intermediaries and enabling peer-to-peer transactions, DeFi can reduce costs and increase transparency. It also allows individuals to access financial services that were previously only available to large institutions.', 'DeFi is still in its early stages, but it is growing rapidly. According to a recent report, the total value locked in DeFi protocols surpassed $100 billion in August 2021. As the technology continues to mature and more people adopt Web3 technologies, it is likely that DeFi will become an increasingly important part of the global financial system.'],
      user_id: '77c93fdf-8a06-483c-8d89-2f5c71d029ed',
      search_tags: ['web3', 'defi']
    }, {
      id: uuid.v4(),
      title: 'The Promise and Potential of Web3 for Social Impact',
      slug: 'the-promise-and-potential-of-web3-for-social-impact',
      content: ['Web3 technologies are not just transforming finance and digital ownership; they also hold great promise for social impact. By leveraging decentralized technologies, Web3 can help address some of the world\'s most pressing social and environmental challenges.', 'One key area where Web3 is being used for social impact is in the development of decentralized identity systems. These systems use blockchain technology to create secure, decentralized identities that can be used to access services such as healthcare and education. This can be particularly valuable for individuals who do not have access to traditional forms of identification, such as refugees or people living in poverty.', 'Another area where Web3 is being used for social impact is in the development of decentralized energy systems. These systems use blockchain technology to enable peer-to-peer energy transactions, which can help to increase access to clean energy and reduce reliance on centralized energy providers.', 'Web3 technologies also have the potential to transform the philanthropic sector by increasing transparency and accountability. By using blockchain to track donations and ensure that funds are being used as intended, Web3 can help to build trust between donors and recipients.', 'As Web3 continues to evolve, it is likely that we will see more and more applications of the technology for social impact. By leveraging the benefits of decentralization, Web3 has the potential to create a more equitable and sustainable world.'],
      user_id: '77c93fdf-8a06-483c-8d89-2f5c71d029ed',
      search_tags: ['web3', 'social']
    }]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('posts', null, {});
  }
};
