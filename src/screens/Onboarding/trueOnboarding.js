// README:
// this will be the first file that is loaded when the user access the app
// this file will have a useEffect that immediately makes a GET request for cookies
// IF COOKIE IS FOUND IN DATABASE:
//         - send the user to their homepage screen and store their information in global state for easy access later
// IF COOKIE IS NOT FOUND IN DATABASE:
//         - send the user to the Login screen
//          IF USER HAS ACCOUNT BUT COOKIE HAS EXPIRED (NOT FOUND):
//                      - user can simply login with their credentials
//          IF USER DOESN'T HAVE ACCOUNT AND COOKIE WASN'T FOUND:
//                      - user will click "Register Here" on bottom of screen and create their account
