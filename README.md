![alt text](https://github.com/cj2-site/cj2_backend/blob/master/assets/chucknorrismeme.jpg "chuck norris")

# cj2 link shortener - backend
> **the** premier site for link shortening and chuck norris jokes!

## table of contents
* [purpose](#purpose)
* [summary](#summary)
* [endpoints](#endpoints)
* [methods](#methods)
* [schema](#schema)
* [notes](#notes)
* [versions](#versions)
* [authors](#authors)
* [license](#license)



## purpose:
> I hate when I need to share a link to a specific part of a website and that link is really long. The backend to the CJ2 site solves this problem by shortening links and redirecting users to the original url when using the shortened link. 

## summary
1. Navigate to the front end at www.cj2.site.
2. Paste your link into the input field.
3. Press the button.
4. A new field will appear with the shortened link. Press the button to copy it to your clipboard.
5. Paste the link into the browser's url window.
6. Press enter.
7. Enjoy the site!

## endpoints
### get: ~/long-url
> This route handles the conversion of a url into a shortened url. It sends a URL object to the front end that includes the short url as a property.
___
#### example request
![alt text](https://github.com/cj2-site/cj2_backend/blob/master/assets/long-urlrequest.png "An example request")

#### example response
![alt text](https://github.com/cj2-site/cj2_backend/blob/master/assets/long-urlresponse.png "An example response")


### get: ~/redirect
> This route handles the linking of a short link to the original url.
___
#### example request
![alt text](https://github.com/cj2-site/cj2_backend/blob/master/assets/redirectrequest.png "An example request")

#### example response
![alt text](https://github.com/cj2-site/cj2_backend/blob/master/assets/redirectresponse.png "An example response")


### put: ~/update
> This route handles the removal of links from the database. Each time a user deletes their instance of the link, the times_created property will decrement. Once times_created reaches 0 (all users have deleted the link) then the link will be removed from the database.
___
#### example request
![alt text](https://github.com/cj2-site/cj2_backend/blob/master/assets/decrementrequest.png "An example request")

#### example response
![alt text](https://github.com/cj2-site/cj2_backend/blob/master/assets/decrementresponse1.png "An example response")
![alt text](https://github.com/cj2-site/cj2_backend/blob/master/assets/decrementresponse2.png "An example response")

## methods
Each controller has a two Get methods. One method handles the Get\[scheme\]Palette route and takes a single color, verifies the inbound color exists in the database, creates a palette if the color is in the specified palette table, and returns an error if either the palette or color is null. If not, it creates a Color object for each color in the palette, puts it in a list, and then returns the list of Color objects via the ASP.NET Core OK method.
The other Get method handles the Check\[scheme\] route. It takes in 3-4 colors, verifies they are in the database, and returns an error if they are not. If they are in the database, the colors are thrown into a palette and then compared against the scheme specified in the route. If it exists, the colors match the scheme and a true response is sent back. If it doesn't, the colors don't match within the scheme and a false response is sent. 


## schema
![alt text](https://github.com/clothing-color-coordinator/API/blob/master/assets/MidtermTables.PNG "Database Schema")

## notes
- Colors sent to an endpoint must be sent via a capitalize string, i.e. Red
- Colors that are made up of two color names must have a both names capitalized and a dash between them, i.e. Yellow-Green

## versions:
> Version 1.0  February 01, 2019

> Version 1.4 February 05, 2019

## authors
> **Carlos Castillo** - *Initial work* - [castillocarlosr](https://github.com/castillocarlosr])

> **Charles Clemens** - *Initial work* - [CClemensJr](https://github.com/CClemensJr)

## license
> This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.




# CJ2 LINK SHORTENER: BACKEND
> The premier site for link shortening and Chuck Norris jokes!

## SUMMARY
> The backend of the CJ2 site receives a url from the front end, shortens it, then returns it to the front end. It also handles the short url functionality by redirecting to the original url


-The name of the project
Names of the team members
-A description of the project
-The overall problem domain and how the project solves those problems
Semantic versioning, beginning with version 1.0.0 and incremented as changes are made
A list of any libraries, frameworks, or packages that your application requires in order to properly function
-Instructions that the user may need to follow in order to get your application up and running on their own computer
-Clearly defined API endpoints with sample responses
Clearly defined database schemas
