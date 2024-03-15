# GFG-Hack-a-thon
Project Name: HTML Code Validator
Basic Functioning: At first the Queries are submitted by a admin in the database, and then user enters the HTML code and clicks on the run and test button then our code parses the HTML code submitted by user, and check it with queries stored in the database by admin and when the HTML code passes one query then it will store 1 corresponding to that query in an array otherwise stores 0 in the same array and finally returns the array.

Steps for implementation:

Step1->      I implemented basic setup like initializing the express server assigning the server port number 3000, setting up the configurations  for the database(we used MongoDB), and making a separate folder for all the functions related to HTML code parsing;

Step2->      To take queries as input from the admin
             we had two methods, the first one was directly through the postman and the second one by using the fronted part.
             for taking queries from admin using frontend I made a frontend page(input_screen.ejs) in which there are two div side by side one for the text statement of the queries(stored in database with the name "userView") and second for the query parameters => two query parameters are separated by '$', parent and childnode are separated by '%' and id, classes and tagname are separated by '&' and in front of a class name there will be '.' and in front of id there will be '#' and we will convert this in JSON format once we receive that and store it inside the datbase with the name "data";
             now for taking queries from admin using postman paste the link of the get request(http://localhost:3000/api/data/queryCode) and then send the data inside body>raw(JSON format);
            focusing on the format of the data we save inside the database, it will be JSON format

                Object{
                    element:"",
                    class:"",
                    id:"",
                    child:Object(if child are present)
                };
when the admin submits the queries than database will generate a unique id of those queries which we will use while submitting the HTML code for validation.

Step3->     To take HTML code as input from user
            for this also have two methods one through the frontend and another through Postman
            for the frontend part I created a frontend page(form_input.ejs)( which will be accessed only if user passes the correct id generated while submitting the queries) in which I have made a form to take the HTML code as input from the user and also side by side it will display the queries to be validated and finally there will be a run and test button and after clicking that button it will display the result corresponding to every query parameter whether it is true or not.
            now for taking HTML code from user using postman inside postman paste the link with get request(http://localhost:3000/api/data/compareCodeQuery/:id) and send the HTML code inside Body>form-data, one main thing here is I passed the id with the link is the id,( which is generated when we submitted the queries) to fetch the queries from the database;

Step4->     Now for comparing the HTML code with queries in the database I first converted the HTML code in the Tree Format so that it will be easy
            for me to access every property like rawTagName, classList, id, childNodes, nodeType. so, I converted this into tree format with the help of the parse property of "node-html-parser".
            now I ran the loop to access every query parameter and passed that query parameter and the parsed HTML code to the "checking.js" Function which in turn returns 1(if the query parameters are present inside the HTML code) else 0. and finally stores that in an array and outside the loop it will send that array back to the user;

Step5-> Now inside the "checking.js" functions I ran "if else" conditions and then recursion depending on whether the query parameter had childNode or not.  "if else" conditions check if the user has a class parameter or not, id parameter or not, tag name or not, child node or not and if all conditions hold then it will return true otherwise return false;



To make our code look good we transferred all the functional properties related to HTML code and Query parameters in the separate folder htmlParser with the help of the routes parameter.