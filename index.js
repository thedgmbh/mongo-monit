"use strict";
const Emitter = require('events');

function Monitor(coll, filter, interval){
	let stream = new Emitter();
	let memory = { '_id': null };
	coll.findOne({}, filter)
	.sort({ $natural: -1 })
	.exec(function (err, doc) {
	  if (err) stream.emit('err', err);
	  if (doc){
	  	memory._id = doc._id.toString();
	  }
	});
	setInterval(function(){
		coll.find({ _id: { $gt: memory._id }}, filter)
		.sort({ $natural: -1 })
		.exec(function (err, doc) {
		  if (err) stream.emit('err', err);
		  if (doc.length > 0){
		  		memory._id = doc[0]._id.toString();
		  		stream.emit('data', doc);	
		  }
		});
	}, interval);
	return stream;
}

module.exports = Monitor;