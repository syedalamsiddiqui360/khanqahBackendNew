const person = require("../../database/models/person");
const personType = require("../../database/models/person_type");



exports.post = async (req, res, next) => {


  const data={
    name: req.body.name,

  }

  try {


  } catch (e) {
    res.statusCode = 300;
    res.send("Please Check log DataBase Error");
    console.log(e);
  }
};

exports.get = async (req, res, next) => {
    
    try {
     const {type_id} = req.params
     console.log(type_id)
   const data = await person.findAll({where:{type_id:type_id , deletedAt:null}});
   res.send(data)
    } catch (e) {
      res.statusCode = 300;
      res.send("Please Check log DataBase Error");
      console.log(e);
    }
  };

  exports.getByType = async (req, res, next) => {
   let output=[] 
    try {
     const type_id = req.body.type_id
    //  console.log(type_id)
   const data = await personType.findAll({where:{type_id:type_id , deletedAt:null}});
   console.log(data)
   for(let i=0 ; i<data.length ; i++){
    output = await person.findAll({where:{ id:data[i].person_id , deletedAt:null}});
   }

   res.send(output)
    } catch (e) {
      res.statusCode = 300;
      res.send("Please Check log DataBase Error");
      console.log(e);
    }
  };