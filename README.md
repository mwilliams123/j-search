# Jeopardy Archive Search
Search engine for Jeopardy! clues. Search our database of over 300,000 clues based on keywords, category, air date, clue value, and more!

Hosted by Google Cloud. Now live at: http://www.jeopardyarchivesearch.com!

## Getting Started
### Running locally
To install dependencies:
```
npm install
```
To start local server:
```
npm start
```
Navigate to http://localhost:2121

### Google Cloud Deployment
First, clone this repository with Google Cloud Shell.

Then run:

```
cd j-search && gcloud app deploy
```

## Tech Stack
* NodeJS
* Google App Engine
* Google Cloud SQL


## Optimizations
Our MySQL database utilizes secondary indexes to optimize search peformance. We have secondary indexes for search criteria such as date and clue values, as well as a fulltext index for natural language searches.
This allows our site to search over 300,000 clues and have an average response time of 54 ms.
## Future Work
* Design & Layout 
  * Increase visual appeal
  * Add responsive web elements
* Auto-populate category suggestions
* Include random game API

