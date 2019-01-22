var express = require("express");
var app = express();


app.get("/personality-test",function(req,res){

    var PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');
    var personality_insights = new PersonalityInsightsV3({
        iam_apikey: 'FfhAfiZqgW4aUhn-ftKdLIFy70GDn0lo6k7PyQkUkfrO',
        version_date: '2017-10-13'
    });

    var params = {
    content: `In Moulmein, in Lower Burma, I was hated by large numbers of people — the only time in my life that I have been important enough for this to happen to me. I was sub-divisional police officer of the town, and in an aimless, petty kind of way anti-European feeling was very bitter...`,
    content_type: 'text/plain',
    consumption_preferences: true,
    raw_scores: true
    };

    personality_insights.profile(params, function(error, response) {
        if (error)
            console.log('Error:', error);
        else
            console.log(JSON.stringify(response, null, 2));
            // Send the HTTP header 
            // HTTP Status: 200 : OK
            // Content Type: text/plain
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            //let imgs = JSON.parse(results);
            // Send the response body as "Hello World"
            res.end('Hello World\n' + result);
        }
    );

})

app.get("/image-test", function (req, res) {

    var VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');

    var visualRecognition = new VisualRecognitionV3({
        version: '2018-03-19',
        iam_apikey: 'Ae8wfpNwYI-OU88zzvem1L7iH0LzfUxdK1SElGV5VZQa'
    });


    var params = {
        url: "https://www.t-mobile.com/content/dam/t-mobile/en-p/cell-phones/apple/apple-iphone-x/silver/Apple-iPhoneX-Silver-1-3x.jpg"
    };

    visualRecognition.classify(params, function (err, response) {
        if (err)
            console.log(err);
        else {
            let result = JSON.stringify(response, null, 2);
            console.log(response.images.constructor.name);
            console.log(response.images[0].classifiers[0].classes[0]);
            // Send the HTTP header 
            // HTTP Status: 200 : OK
            // Content Type: text/plain
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            //let imgs = JSON.parse(results);
            // Send the response body as "Hello World"
            res.end('Hello World\n' + response.images.constructor.name + "\n" + result);
        }
    });

})


//var listener = app.listen(process.env.PORT,process.env.IP,function(){
var listener = app.listen(4000, process.env.IP, function () {
    console.log("server has started");
    console.log('Listening on port ' + listener.address().port);
});
