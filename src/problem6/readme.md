## Problem 6 ##
### Documentation ###
1. Authoriosation: JWT
2. Using redis sorted set for increasing/saving user score
3. Redis sorted set will have properties such as: leaderboard::{{userId}}
4. Increase user's score after every success action: zadd KEY 1 userId
5. Loading the score board: zrevrank KEY userId