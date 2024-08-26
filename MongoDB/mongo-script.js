var db = connect("mongodb://localhost:27017/words");
var file = cat("/words.users.json");
var docs = JSON.parse(file);
db.your_collection.insert(docs);
