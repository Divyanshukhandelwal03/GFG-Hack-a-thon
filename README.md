# GFG-Hack-a-thon
Project Name: HTML Code Validator

Basic Functioning: first the Queries are submitted by a user in the database, and another user enters the HTML code and clicks on the run and test button then our code parses the HTML code submitted by user two with queries stored in the database by user one. and when the HTML code passes one query then it will store 1 corresponding to that query in an array otherwise stores 0 in the same array and finally returns the array.

How we implemented:

Step1->      I implemented basic setup like initializing the express server assigning the server port number 3000, setting up the configurations  for the database(we used MongoDB), and making a separate folder for all the functions related to HTML code parsing;

Step2->      To take queries as input from the user1
             we had two methods, the first one was directly through the postman and the second one by using the fronted part.
             for taking queries from user1 using frontend I made a frontend page(input_screen.ejs) in which there are two div side by side one for the text statement of the queries and second for the query parameters => two query parameters are separated by '$', parent and childnode are separated by '%' and id, classes and tagname are separated by '&' and in front of a class name there will be '.' and in front of id there will be '#' and we will convert this in JSON format once we receive that;
             now for taking queries from user1 using postman paste the link of the get request(http://localhost:3000/api/data/queryCode) and then send the data inside body>raw(JSON format);
            focusing on the format of the data we save inside the database, it will be JSON format

                Object{
                    element:"",
                    class:"",
                    id:"",
                    child:Object(if child are present)
                };

Step3->     To take HTML code as input from user2
            for this also have two methods one through the frontend and another through Postman
            for the frontend part I created a frontend page(form_input.ejs) in which I have made a form to take the HTML code as input from the user.
            now for taking HTML code from user2 using postman inside postman paste the link with get request(http://localhost:3000/api/data/compareCodeQuery/:id) and send the HTML code inside Body>form-data, one main thing here is I passed the id with the link is the id,( which is generated when we submitted the queries) to fetch the queries from the database;

Step4->     Now for comparing our HTML code with queries in the database I first converted the HTML code in the Tree Format so that it will be easy
            for me to access every property like rawTagName, classList, id, childNodes, nodeType. so, I converted this into tree format with the help of the parsed property of "node-html-parser".
            now I ran the loop to access every query parameter and passed that query parameter and the parsed HTML code to the "checking.js" Function which in turn returns 1(if the query parameters are present inside the HTML code) else 0. and finally stores that in an array and outside the loop it will send that array back to the user;

Step5-> Now inside the "checking.js" functions I ran "if else" conditions and then recursion depending on whether the query parameter had childNode or not.  "if else" conditions check if the user has a class parameter or not, id parameter or not, tag name or not, child node or not and if all conditions hold then it will return true otherwise return false;



To make our code look good we transferred all the functional properties related to HTML code and Query parameters in the separate folder htmlParser with the help of the routes parameter.