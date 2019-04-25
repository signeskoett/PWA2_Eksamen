import LocalDB, { ObjectID } from 'react-local-mongoose';
 
const rankSchema = {
  _id: {type: ObjectID, required: true},
  name: { type: String, required: true },
  location: { type: String, required: true },
  score: { type: Number, required: true },
};
 
const Rank = new LocalDB(rankSchema, 'rank');
 
export default Rank;