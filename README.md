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
> The purpose of the backend to the CJ2 site is to shorten links and redirect users to the original url when using the shortened link.

## summary
The Color Wheel API provides color palettes based on user input and the color wheel.
Each endpoint takes a color name and returns a JSON object for their specific color scheme:
	- GetAnalogousPalette: Returns an [analogous palette](https://en.wikipedia.org/wiki/Analogous_colors).
	- GetComplementaryPalette: Returns a [complementary palette](https://en.wikipedia.org/wiki/Complementary_colors).
	- GetSplitComplementaryPalette: Returns [split complementary palette](https://en.wikipedia.org/wiki/Color_scheme#Complementary).
	- GetTetradicPalette: Returns [tetradic palette](https://en.wikipedia.org/wiki/Color_scheme#Tetradic).
	- GetTriadicPalette: Returns [triadic palette](https://en.wikipedia.org/wiki/Color_scheme#Triadic).

The Color Wheel API can also take a palette of color names and tell you if it matches a specific color scheme:
	- CheckAnalogous: Returns true if the three colors match an Analogous palette and false if it doesn't.
	- CheckComplementary: Returns true if the three colors match a Complementary palette and false if it doesn't.
	- CheckSplitComplementary: Returns true if the three colors match an Split Complementary palette and false if it doesn't.
	- CheckTetradic: Returns true if the four colors match an Tetradic palette and false if it doesn't.
	- CheckTriadic: Returns true if the three colors match a Triadic palette and false if it doesn't.

## endpoints
### get\[scheme\]palette example
___
#### request
`https://colorwheelapi20190205024526.azurewebsites.net/api/GetAnalogousPalette/Red `

#### response
![alt text](https://github.com/clothing-color-coordinator/API/blob/master/assets/getAnalogousResponse.PNG "Get Analogous Palette")

### check\[scheme\] example
___
#### request
`https://colorwheelapi20190205024526.azurewebsites.net/api/CheckAnalogous/Yellow,Yellow-Orange,Yellow-Green

#### response
![alt text](https://github.com/clothing-color-coordinator/API/blob/master/assets/checkAnalogousResponse.PNG "Check Analogous")

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


The name of the project
Names of the team members
A description of the project
The overall problem domain and how the project solves those problems
Semantic versioning, beginning with version 1.0.0 and incremented as changes are made
A list of any libraries, frameworks, or packages that your application requires in order to properly function
Instructions that the user may need to follow in order to get your application up and running on their own computer
Clearly defined API endpoints with sample responses
Clearly defined database schemas
