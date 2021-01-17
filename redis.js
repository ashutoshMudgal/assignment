//redis setup
let redis_url="redis://127.0.0.1"
let client = require('redis').createClient(redis_url);
let Redis = require('ioredis');
let redis = new Redis(redis_url);
module.exports=redis;