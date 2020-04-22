const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

let db;

async function get(collection, param1, param2, sorted = false) {
  if (sorted)
    return db.collection(collection).find(param1, param2).sort(sorted).toArray();
  else
    return db.collection(collection).find(param1, param2).toArray();
}

async function search(collection, param, project, sort) {
  return db.collection(collection).find(param).project(project).sort(sort).toArray();
}

async function getOne(collection, param, param2 = {}) {
  return db.collection(collection).findOne(param, param2);
}

async function insert(collection, data) {
  await db.collection(collection).insertOne(data);
  return data._id;
}

async function findAndModify(collection, param, data) {
  return db.collection(collection).findOneAndUpdate(param, data, { upsert: true, returnNewDocument: true });
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
    const reviewExists = await this.getReview(review.imageId, review.userId);
    if (reviewExists)
      return { error: 'user already reviewed' };
    review.createdTimestamp = new Date();
    await insert('reviews', review);
    return findAndModify('images', { id: review.imageId }, { $inc: { numReviews: 1 } });
  },
  async newRating(rating) {
    const ratingExists = await this.getRating(rating.imageId, rating.userId);
    if (ratingExists)
      return { error: 'user already rated' };
    rating.createdTimestamp = new Date();
    await insert('ratings', rating);
    return findAndModify('images', { id: rating.imageId }, { $inc: { totalRatings: 1, totalStars: rating.stars } });
  },
  async updateReview(review) {
    const reviewExists = await this.getReview(review.imageId, review.userId);
    if (!reviewExists)
      return { error: 'no such review' };
    review.updatedTimestamp = new Date();
    const { imageId, userId } = review;
    return findAndModify('reviews', { imageId, userId }, { $set: review });
  },
  async updateRating(rating) {
    const previousRating = await this.getRating(rating.imageId, rating.userId);
    if (!previousRating)
      return { error: 'no such rating' };

    let previousStars = parseInt(previousRating.stars);
    let currentStars = parseInt(rating.stars);
    let difference = currentStars - previousStars;
    rating.updatedTimestamp = new Date();

    const { imageId, userId } = rating;
    await findAndModify('ratings', { imageId, userId }, { $set: rating });
    return findAndModify('images', { id: imageId }, { $inc: { totalStars: difference } });
  },
  getReviews(imageId) {
    return get('reviews', { imageId });
  },
  getReview(imageId, userId) {
    return getOne('reviews', { imageId, userId })
  },
  getRating(imageId, userId) {
    return getOne('ratings', { imageId, userId })
  },
  getUser(id) {
    return getOne('users', { id })
  },
  getImage(id) {
    return getOne('images', { id });
  },
  getImages(sortParam, categoryParam, q, after) {
    let options;
    let sort;
    switch (sortParam) {
      case 'newest':
        sort = { sort:{ created: -1 }}
        break;
      case 'highestRated':
        sort = {sort:{ totalStars: -1 }}
        break;
      default:
        sort = false;
        break;
    }

    let searchQuery;
    if (q) {
      options = { score: { $meta: "textScore" } }
      searchQuery = { $text: { $search: q } }
      if (!sort)
        sort = { score: { $meta: "textScore" } }
    }

    let category;
    if (categoryParam)
      category = { category: categoryParam };

    let params = {
      ...searchQuery,
      ...category
    }
    console.log('DB PARAMS: ',params,options,sort)
    if (searchQuery)
      return search('images', params, options, sort)
    return get('images', params, sort)
  },
  updateImage(id, updates) {
    return findAndModify('images', { id }, { $set: updates });
  },
  updateUser(id, updates) {
    return findAndModify('users', { id }, { $set: updates });
  },
}
