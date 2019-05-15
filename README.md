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

## functions
> getShortUrl(): The handler responsible for taking in a url and sending back an object.

> handleRedirect(): The handler responsible for redirecting shortened links to the original url.

> decrementShortUrl(): The handler responsible for deleting "instances" of a link from the database.


## schema
![alt text](https://github.com/cj2-site/cj2_backend/blob/master/assets/schema.png "Database Schema")

## notes


## versions:
> Version 1.0  February 01, 2019

> Version 1.4 February 05, 2019

## authors
> **Stephen Chu** - *Front End* - [stephenchu530](https://github.com/stephenchu530])

> **John Winters** - *Front End* - [thatsjustjohn](https://github.com/thatsjustjohn])

> **Jorie Fernandez** - *Back End* - [joriefernandez](https://github.com/joriefernandez])

> **Charles Clemens** - *Back End* - [CClemensJr](https://github.com/CClemensJr)

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
