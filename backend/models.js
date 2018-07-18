//Import statements
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

if (!(process.env.MONGODB_URI)) throw new Error('No MONGODB_URI');
mongoose.connect(process.env.MONGODB_URI, function(){
  console.log('CONNECT TO databasedoug')
});

//==================================SCHEMAS======================================

//USER MODEL SCHEMA
var userSchema = new Schema({
  //User's email
  username: {
    type: String,
    required: true
  },
  //User's password
  password: {
    type: String,
    required: true
  },
  //An array of the documents the user has access to
  documents: {
    type: Array,
    default: []
  }
})

//DOCUMENT MODEL SCHEMA
var docSchema = new Schema({
  //creator of the document, saved with an ObjectId
  owner: {
    type: ObjectId,
    required: true,
    ref: "users"
  },
  //All content history of the document, in an array
  content: {
    type: Array,
    default: []
  },
  //An array of ObjectIds that tell us who is a collaborator on the document
  collaborators: {
    type: [{
      type: ObjectId,
      ref: "users"
    }],
    default: []
  },
  //Title of the document
  title: {
    type: String,
    defualt: "untitled"
  },
  //Time the document was created
  createdTime: {
    type: String
  },
  //Time the document was last saved
  lastEditTime: {
    type: Date
  },
  //Prevents MONGODB from deleting all empty objects
},
  {
    minimize: false
  }
)
//==============================================================================

//===============================MODELS=========================================

//USER MODEL
var User = mongoose.model('User', userSchema);

//DOC MODEL
var Document = mongoose.model('Document',docSchema)

//==============================================================================

//Export modules
module.exports={
  User: User,
  Document: Document
}
