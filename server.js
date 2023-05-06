const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

// Getting user the data
app.get("/", (request, response) => {
    response.render("index", {resultToRender:""});
});

app.post("/bmi", (request, response) => {

    // Calculating BMI
    let height = Number(request.body.height)/100;
    let weight = Number(request.body.weight);
    let bmi = (weight/(height*height)).toFixed(2);
    let userResult = "";

    // Choosing the result
    if(bmi < 19){
        userResult = "Underweight";
    }
    else if(bmi >= 19 && bmi <= 24.9){
        userResult = "Normal weight";
    }
    else if(bmi >= 25 && bmi <= 29.9){
        userResult = "Overweight";
    }
    else if(bmi > 29.9){
        userResult = "You are FAT!";
    }
    else{
        userResult = "Error  .·´¯`(>▂<)´¯`·.";
    }

    // Packing results into one
    let result = {
        userBMI: bmi, 
        result: userResult
    };

    // Packing the result into the index file
    response.render("index", {resultToRender: result});

});

// Connection
const port = 3000;

app.listen(port, ()=> {
    console.log(`Server is running on port ${port}.`);
});