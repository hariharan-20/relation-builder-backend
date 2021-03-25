var mongoose = require('mongoose')


var table = mongoose.Schema({   
    name: {
        type:String,
        require:true
    },
    tag: {
        type:String,
        require:true
    },
    relation: {
        type:String,
        require:true
       
        }
})

module.exports = mongoose.model('table',table,'table')