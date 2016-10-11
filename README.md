# Mongo Monitor (Beta)
> This package is in early stage.

We was having a problem regarding montioring database changes and because we where already deployed some of our moduels, and all ather solution is complicated some how, so we wrote this package it's very simple yet do the job. 

## Example
```javascript
const mongoose = require('mongoose');
const Monit = require('mongo-monit');

mongoose.connect('mongodb://localhost/test');

var Cat = mongoose.model('Cat', { name: String });

setInterval(function(){
	var kitty = new Cat({ name: 'Zildjian' });
	kitty.save(function (err) {
	  if (err) {
	    console.log(err);
	  } else {
	    console.log('meow');
	  }
	});
}, 2000);

var monit = new Monit(Cat, '_id', 1000);
monit.on('data', function(data){
	console.log(data);
})
monit.on('err', function(err){
	console.log(err);
})
```

### Options 

```javascript
new Monit(options);
```

| Attribute | Description 		|
|-----------|-------------------|
| Collection | Collectin that you want to monitor |
| Filter | What do you want to get for the collection ex('_id name') |
| Interval | Interval between trigger the monitor | 


#### License
Licensed under MIT

#### Author
M. Mahrous
Feel free to contact me [M. Mahrous](mailto:m.mahrous@thed.io) and improve the code.
