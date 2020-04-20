const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

let db;

async function get(collection, param, sorted = false) {
  if (sorted)
    return db.collection(collection).find(param).sort(sorted).toArray();
  else
    return db.collection(collection).find(param).toArray();
}

async function getOne(collection, param, param2 = {}) {
  return db.collection(collection).findOne(param, param2);
}

async function insert(collection, data) {
  await db.collection(collection).insertOne(data);
  return data._id;
}

async function findAndModify(collection,param, data) {
  await db.collection(collection).findOneAndUpdate(param,data,{upsert:true});
  return data._id;
}

async function insertMany(collection, data) {
  return db.collection(collection).insertMany(data);
}

async function update(collection, params, data) {
  return db.collection(collection).findOneAndUpdate(params, data, { returnOriginal: false });
}

async function remove(collection, params) {
  return db.collection(collection).deleteOne(params);
}

async function removeMany(collection, params) {
  return db.collection(collection).deleteMany(params);
}

module.exports = {
  async initMongo(MONGO_URL) {
    const mongo = await MongoClient.connect(MONGO_URL, { useUnifiedTopology: true });
    db = mongo.db('JinaHub');
    console.log('Connected to Mongo');
    return;
	},
	async newReview(review) {
		//TODO: ensure done once per user
    review.createdTimestamp = new Date();
    const rating = {
      rating: review.rating,
      timestamp: review.createdTimestamp,
      productId: review.productId,
      user: review.user
    };
    await this.newRating(rating);
    return insert('reviews', review);
  },
  newImage(data){
    return insert('images')
  },
  getImage(id){
    return get('images',{id});
  },
  updateImage(id,updates){
    return findAndModify('images',{id},{$set:updates});
  },
	newRating(rating) {
		//TODO: ensure done once per user
    rating.createdTimestamp = new Date();
    return insert('ratings', rating);
	},
	getSearchResults(query) {
    return get('images', { $text: { $search: query } });
	},
	getTopRatedImages() {
    return get('images', null, { ratingAvg: -1 });
  },
}
