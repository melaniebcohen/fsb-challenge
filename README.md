## UW Foster School of Busines Challenge Submission</h1>

## Core Goals
- [x] Use a Node service API to query the GitHub repositories API.
- [x] Do not query GitHub repositories API directly from the client application.
- [x] Do not return unnecessary data to the client application.
- [x] Use Vue, React, or Angular as the client framework.
- [x] Use Bootstrap for UI components. _(Note: I used [React-Bootstrap](https://github.com/react-bootstrap/react-bootstrap))_
- [x] Start with repository 1000.
- [x] Try to fit as many avatars on one screen as possible. (i.e. Without scrolling.)
- [x] The application should run on localhost with the “npm start” command.

## Stretch Goals
- [x] Display a detail view of the repository owner when a user clicks on an avatar.
- [ ] Add a filter to show only certain avatars based on whatever criteria you come up with.
- [ ] Minimize calls to the GitHub API to avoid rate limiting.

## Getting Started
1. To install this application, downloaded the files from this repo by running `git clone` or by forking the repo and then cloning it
2. `cd` to the repository and run `npm i`
4. Use the `npm run start` script  to run the application

## Future Enhancements
- More robust backend testing
- Frontend testing
- Responsive grid layout enhancements
- Make tooltip on hover scrollable/more user friendly

## Front-End App Components
```
<App />
  <Provider />
    <BrowserRouter />
      <HomePage />
        <NavBar />
        <AvatarList />
          <AvatarCard />
            <AvatarModal />
```