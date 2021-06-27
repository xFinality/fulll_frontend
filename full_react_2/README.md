# Fulll react test number 2

The point of this project is to run an api request to github to find the user dynamically.

## getAPIResult

This function is requesting asyncronously github for users.
It takes as parameter the input value.
It controls the answers :
  Rate limit exceeded
  Too many results
  No results
  
It returns the API results

## Render
An input is rendered.
While the user is typing in it, it will asks github for users matching the input.
It will display these users below it.
If an error occurs, it will be written below it as well.
