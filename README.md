# Arda-Assignment

## Database structure
While my first thought while selecting a DB was to go ahead with a SQL based database because of it's structured nature and the relations involved in transactions, I went ahead with a NoSQL database. The reasons given below:

1. This is a game and the mode in which the users are earning rewards isn't clearly defined (Can be a continous reward model like coins in subway surfers or task based rewards like "complete 5 games to earn 0.5 dreams"). If it is a continuous model, the account book will be flooded in no time as the amount of tokens earned can be low and this will drastically slow down the response times if we had an SQL based DB.

2. There are NoSQL databases which support ACID compliant transactions (MongoDB) which can be used for our usecase.

3. The product being a game implies there is a possibility of it creating it's revenue streams with in-app purchases, p2p token gifting or lending and a ton of other gamified features. NoSQL would help in this case as it is more customisable than SQL DB.

Therefore, I went ahead and implemented databases in MongoDB.

## Database Design
The following are the Databases/Ledgers and their descriptions:

1. Player database (players.js): This contains the player ID (String), tokens currently in their game account (Number), tokens earned today (Number), USD earned

2. Player token account ledger (playerToken.js): This contains an entry of all the token transactions any player has performed. It has time (datetime object: time of transaction), playerId, tokens (Number, can be both + and -), description (String)

3. Dreamland token account ledger (dreamlandToken.js): Everytime a player wins a token (or potential in game-purchases) an entry is created here. Attributes are the same as playerToken.js

4. Player bank account ledger (playerAccount.js): This contains an entry of all the money transactions any player has performaed. It has time (datetime object: time of transaction), playerId, USD (Number: money earned, can be + or -), tokens (Number, can be both + and -), description (String)

5. Dreamland fees account ledger (dreamlandFees.js): This contains an entry everytime fees is charged to dreamland. I'm assuming that fees is only charged when token is exchanged for money. It contains the same entries as playerAccount.js without tokens attribute and with a fees attribute (Number: fees charged: always positive)

6. Dreamland bank account ledger (dreamlandAccount.js): This contains an entry everytime fees is paid by dreamland. It contains the time, fees, playerId and description.

## Edge cases in APIs
The following edge cases are handled in each of the

1. API that accepts a user won some dream tokens at a particular time:

The first thing is to make sure playerId is a string, time is a datetime object, tokens are positive.

Then I checked to make sure the total tokens earned by any player cannot exceed the maximum permissible limit (in this case, $5)

If the playerId doesn't exist, a new player is created and tokens are added.

2. API that returns the history of tokens a user has won today:

Only looked at type of playerId being a string. If there are no transactions/player doesn't exist, an empty array is returned

3. API that returns history of USD won by user till specific time:

Only looked at type of playerId being a string. If there are no transactions/player doesn't exist, an empty array is returned

4. API that returns stats:

Player ID string check

If the player doesn't exist, returns 404 error

## More APIs to implement

1. I have implemented an API which converts tokens to USD, we can run it in hourly intervals to include the desired functionality.

2. APIs would depend on the type of functionality the game is giving. As I mentioned above, things like in-app purchases, buying tokens with USD, gifting tokens to other players can be implemented

## Infrastructure

I'm not entirely sure how the GDPR works, but I'll give a go at this question. The players DB is the only table which contains player targetted info. That can be localised to comply with GDPR, the other transactional data can be stored in a central cluster by hashing the player IDs and be used for analytical purposes.