var express = require('express');  
var path = require("path");   
var bodyParser = require('body-parser');  
var mongo = require("mongoose");  
  
var db = mongo.connect("mongodb://localhost:27017/StockHistory", function(err, response){  
   if(err){ console.log( err); }  
   else{ console.log('Connected to ' + db, ' + ', response); }  
});  
  
   
var app = express()  
app.use(bodyParser());  
app.use(bodyParser.json({limit:'5mb'}));   
app.use(bodyParser.urlencoded({extended:true}));  
   
  
app.use(function (req, res, next) {        
     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');    
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');    
     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');      
     res.setHeader('Access-Control-Allow-Credentials', true);       
     next();  
 });  
  
 var Schema = mongo.Schema;  
  
 //define the structure of saved data
var UsersSchema = new Schema({
    //have to match the property names of the data passed in      
 CompanyName: { type: String },       
 NumberOfSharesBought: { type: String },
 DatePurchased: { type: String },
 DateSold: { type: String },
 NumberOfSharesSold: { type: String },
 PurchasePrice: {type: String },
 SoldPrice: {type: String},
 LossGainPrice: {type: String}
},{ versionKey: false });  
   
  
var model = mongo.model('users', UsersSchema, 'users');  
  //create the date we want to save as the model defined above 
app.post("/api/SavePurchase",function(req,res){
    //create a mod object using the body object passed in   
 var mod = new model(req.body);  
 if(req.body.mode =="Save")  
 {  
     //save the data
    mod.save(function(err,data){  
      if(err){  
         res.send(err);                
      }  
      else{        
          res.send({data:"Record has been Inserted..!!"});  
      }  
 });  
}  
else   
{  
 model.findByIdAndUpdate(req.body.id, { itemName: req.body.name, 
    quantity: req.body.quantity, price: req.body.price, 
    purchaseDate: req.body.purchaseDate, companyName: req.body.companyName},  
   function(err,data) {  
   if (err) {  
   res.send(err);         
   }  
   else{        
          res.send({data:"Record has been Updated..!!"});  
     }  
 });  
  
  
}  
 })  
  
 app.post("/api/deletePurchase",function(req,res){      
    model.remove({ _id: req.body.id }, function(err) {    
     if(err){    
         res.send(err);    
     }    
     else{      
            // res.send({data:"Record has been Deleted..!!"});
            //update the view
            model.find({}, function(err, data){
                if(err){
                    res.send(err);
                } else {
                    res.send(data);  
                }
                 
            });       
        }    
 });    
   })  
  
  
  
 app.get("/api/getPurchase",function(req,res){  
    model.find({},function(err,data){  
              if(err){  
                  res.send(err);  
              }  
              else{                
                  res.send(data);  
                  }  
          });  
  })  
  
  
app.listen(8080, function () {  
    
 console.log('Example app listening on port 8080!')  
})  