## Adding projects / posts

- Go to folder _posts
- Create new file name `YYYY-MM-DD-PROJECTNAME.md`

## Running on local server
- Website is built on jekyll, run `$ jekyll serve`
- Open `http://localhost:4000/`

## Production build
- Jekyll’s environment is set to `development` by default.
- Google Analytics should only be included in the production build.
- Run `$ JEKYLL_ENV=production jekyll build` to do so.
- Note: After `$ git push` GitHub Pages build automatically for `production` environment.
