var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const { DateTime } = require("luxon");

var AuthorSchema = new Schema({
  first_name: {
    type: String,
    required: true,
    maxlength: 100,
  },
  family_name: {
    type: String,
    required: true,
    maxlength: 100,
  },
  date_of_birth: {
    type: Date,
  },
  date_of_death: {
    type: Date,
  },
});

// Virtuals
AuthorSchema.virtual("name").get(function () {
  var fullname = "";
  if (this.first_name && this.family_name) {
    fullname = this.first_name + " " + this.family_name;
  }
  if (!this.first_name || !this.family_name) {
    fullname = "";
  }
  return fullname;
});

AuthorSchema.virtual("lifespan").get(function () {
  var lifetime_string = "";
  if (this.date_of_birth) {
    lifetime_string = DateTime.fromJSDate(this.date_of_birth).toLocaleString(
      DateTime.DATE_MED
    );
  }
  lifetime_string += " - ";
  if (this.date_of_death) {
    lifetime_string += DateTime.fromJSDate(this.date_of_death).toLocaleString(
      DateTime.DATE_MED
    );
  }
  return lifetime_string;
});

/*
AuthorSchema.virtual("lifespan").get(function () {
  var lifetime_string = "";
  if (this.date_of_birth) {
    lifetime_string = this.date_of_birth.getYear().toString();
  }
  lifetime_string += " - ";
  if (this.date_of_death) {
    lifetime_string += this.date_of_death.getYear().toString();
  }
  return lifetime_string;
});
*/

AuthorSchema.virtual("url").get(function () {
  return "/catalog/author/" + this._id;
});

module.exports = mongoose.model("Author", AuthorSchema);
